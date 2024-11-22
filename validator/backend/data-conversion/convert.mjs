import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input CSV file
const inputFilePath = path.join(
  __dirname,
  "input",
  "all_characters_confusables.csv"
);

// Output JSON file
const outputFilePath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "all_characters_confusables.json"
);

// Array to hold the parsed data
const results = [];

// Read the CSV file and parse it
fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on("data", (data) => {
    // Rename keys to camelCase
    const confusable = {
      ...data,
      confusableChar: data["confusable_char"]
        ? data["confusable_char"].split(",").filter((c) => c !== "")
        : [],
      confusableUnicode: data["confusable_unicode"]
        ? data["confusable_unicode"].split(",").filter((c) => c !== "")
        : [],
    };

    // Remove old keys
    delete confusable["confusable_char"];
    delete confusable["confusable_unicode"];

    results.push(confusable);
  })
  .on("end", () => {
    // Write the parsed data to a JSON file
    fs.writeFile(outputFilePath, JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file successfully created:", outputFilePath);
      }
    });
  });
