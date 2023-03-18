import express, { Request, Response } from "express";

const router = express.Router();

router.get("/health", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
