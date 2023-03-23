import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get(
  "/health",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
