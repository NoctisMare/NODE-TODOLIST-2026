import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    handler: (req, res) =>
      res.status(429).json({
        message: "Too many requests. Please try again later.",
      }),
  }),
);
app.get("/health", (req, res) =>
  res.status(200).json({
    message: "Welcome To Todo List Server.",
    type: "Express Server",
    uptime: process.uptime(),
  }),
);
app.use((req, res) =>
  res.status(404).json({
    message: "404 NOT FOUND.",
  }),
);
app.use((err, req, res, next) => {
  console.error(err.message || err);
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
