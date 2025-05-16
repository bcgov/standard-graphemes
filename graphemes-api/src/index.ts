import dotenv from "dotenv";
dotenv.config();
import express from "express";
import rateLimit from "express-rate-limit";

import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Limit a single IP address to `max` requests/`windowMs` per API server pod.
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10), // Default 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  handler: (req, res, next, options) => {
    console.log("Rate limit hit for %s accessing %s", req.ip, req.originalUrl);
    res.status(options.statusCode).send(options.message);
  },
});

// Middleware
app.use(express.json());
app.use(limiter);

// Routes
app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
