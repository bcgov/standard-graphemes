import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { createWorker } from "tesseract.js";
import { z } from "zod";

import untypedConfusables from "../data/all_characters_confusables.json" with { type: "json" };

export const api = new OpenAPIHono();

const Confusable = z.object({
  label: z.string(),
  id: z.string(),
  confusableChar: z.array(z.string()),
  confusableUnicode: z.array(z.string()),
});

// Use Zod schema definition for TypeScript type declaration
// prettier-ignore
type Confusable = z.infer<typeof Confusable>;

const confusables: Confusable[] = untypedConfusables;

// GET route to /api/v1/confusable
const getAllConfusables = createRoute({
  method: "get",
  path: "/confusable",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(Confusable),
        },
      },
      description: "A list of all confusables",
    },
    404: {
      description: "Confusables list not found",
    },
  },
});

api.openapi(getAllConfusables, (c) => {
  return c.json(confusables, 200);
});

// GET route to /api/v1/confusable/label/:label
const getOneConfusableByLabel = createRoute({
  method: "get",
  path: "/confusable/label/{label}",
  request: {
    params: z.object({
      label: z.string().describe("The label of the confusable object"),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: Confusable,
        },
      },
      description: "The confusable object with the target label",
    },
    404: {
      description: "Confusable object not found",
    },
  },
});

api.openapi(getOneConfusableByLabel, (c) => {
  const label = c.req.param("label");
  const confusable = confusables.find(
    (confusable) => confusable.label === label
  );

  if (confusable) {
    return c.json(confusable, 200);
  } else {
    return c.json({ error: "Confusable object not found" }, 404);
  }
});

// GET route to /api/v1/confusable/char/:char
const getConfusablesByCharacter = createRoute({
  method: "get",
  path: "/confusable/char/{confusableChar}",
  request: {
    params: z.object({
      confusableChar: z
        .string()
        .describe("A character that can potentially be confused with another"),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.array(Confusable),
        },
      },
      description: "Confusable matches for the given character",
    },
    404: {
      description: "No confusable matches for the given character",
    },
  },
});

api.openapi(getConfusablesByCharacter, (c) => {
  const targetChar = c.req.param("confusableChar");

  // Return 404 early if the targetChar is empty
  if (typeof targetChar !== "string" || targetChar.length === 0) {
    return c.json(
      { error: "No confusable matches for the given character" },
      404
    );
  }

  const matches: Confusable[] = [];

  for (let i = 0; i < confusables.length; i++) {
    const confusable = confusables[i];

    // Match for confusableChar
    if (confusable.confusableChar.includes(targetChar)) {
      matches.push(confusable);
    }
  }

  if (matches.length > 0) {
    return c.json(matches, 200);
  } else {
    return c.json(
      { error: "No confusable matches for the given character" },
      404
    );
  }
});

// GET route to /api/v1/confusable/search/{search}
const getSuggestedStringsFromSearchString = createRoute({
  method: "get",
  path: "/confusable/search/{search}",
  request: {
    params: z.object({
      search: z.string().describe("A string to be searched for confusables"),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            search: z.string(),
            suggestions: z.array(
              z.object({
                confusable: Confusable,
                replaced: z.string(),
              })
            ),
          }),
        },
      },
      description:
        "Object containing the original search string plus an array of suggestions containing the confusable that was matched and suggested replacement strings",
    },
    404: {
      description: "No confusable matches for the given string",
    },
  },
});

api.openapi(getSuggestedStringsFromSearchString, (c) => {
  const search = c.req.param("search");

  // Return 404 early if the search is empty
  if (typeof search !== "string" || search.length === 0) {
    return c.json({ error: "No confusable matches for the given string" }, 404);
  }

  interface SearchStringResponse {
    /** The original search string */
    search: string;
    suggestions: {
      confusable: Confusable;
      replaced: string;
    }[];
  }

  const response: SearchStringResponse = {
    search,
    suggestions: [],
  };

  // Check each confusable
  for (let i = 0; i < confusables.length; i++) {
    const confusable = confusables[i];

    // Check each confusableChar in the confusable
    for (let j = 0; j < confusable.confusableChar.length; j++) {
      const char = confusable.confusableChar[j];

      // Check the search string for the `label` field of the confusable
      if (search.includes(char)) {
        response.suggestions.push({
          confusable,
          replaced: search.replaceAll(char, confusable.label),
        });
      }
    }
  }

  if (response.suggestions.length > 0) {
    return c.json(response, 200);
  } else {
    return c.json({ error: "No confusable matches for the given string" }, 404);
  }
});

const OcrData = z.object({
  /** The text returned by the OCR engine */
  text: z.string(),
});

const getTextFromUserImage = createRoute({
  method: "post",
  path: "/confusable/ocr",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: OcrData,
        },
      },
      description: "OCR text data from user image",
    },
    400: {
      description: "No image file provided",
    },
    500: {
      description: "Failed to process OCR",
    },
  },
});

api.openapi(getTextFromUserImage, async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return c.json({ error: "No image file provided" }, 400);
  }

  // Convert the file to an ArrayBuffer and then to a Buffer for Tesseract
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Run OCR with Tesseract.js
    const worker = await createWorker(["eng", "iku"]);
    const {
      data: { text },
    } = await worker.recognize(buffer);

    // Respond with the extracted text
    return c.json({ text }, 200);
  } catch (error) {
    console.error("OCR error:", error);
    return c.json({ error: "Failed to process OCR" }, 500);
  }
});

// OpenAPI JSON definition served from /api/v1/docs
api.doc("/docs", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Confusable API",
  },
  servers: [
    {
      // This needs to match the path in the `app.route()` call in src/index.ts
      // where the routes being defined this file are mounted.
      url: "/api/v1",
      description: "Base URL for the API",
    },
  ],
});

// SwaggerUI frontend for OpenAPI docs
api.get("/ui", swaggerUI({ url: "/api/v1/docs" }));
