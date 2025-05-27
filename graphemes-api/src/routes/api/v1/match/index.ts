import { Router } from "express";

import compareValues from "../../../../utils/compareValues.js";

const matchRouter = Router();

matchRouter.post("/", async (req, res) => {
  // Check the request body for values to be compared (`value1` and `value2`).
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      error: "Bad Request",
      message: "Request body is required",
      statusCode: 400,
    });
    return;
  }

  if (!req.body.value1 || !req.body.value2) {
    res.status(400).json({
      error: "Bad Request",
      message: "Request body requires values",
      statusCode: 400,
    });
    return;
  }

  const { value1, value2, threshold } = req.body;

  // Check for numeric threshold value and default to 0.9 if one isn't present.
  const numericThreshold = parseFloat(threshold);
  const comparison = compareValues(
    value1,
    value2,
    !isNaN(numericThreshold) ? numericThreshold : 0.9
  );

  res.status(200).json({
    value1: comparison.comparisonValue1,
    value2: comparison.comparisonValue2,
    threshold: comparison.threshold,
    ratio: comparison.ratio,
    isMatch: comparison.isMatch,
  });
});

export default matchRouter;
