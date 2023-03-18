import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import clinicalTrialRoutes from "./routes/clinicalTrial.controller";
import healthRoutes from "./routes/health.controller";
import redis from "../config/redis.config";

const app = express();
const port = 3100;

// Middleware for parsing requests' body
app.use(bodyParser.json());

// Middleware for error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Redis client error handling
redis.on("error", (err) => console.error("Redis Client Error", err));

// Routes
app.use("/api", clinicalTrialRoutes);
app.use("/api", healthRoutes);

// Listen to incoming connections
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
