import { NextFunction, Request, Response } from "express";

export class BadRequestError extends Error {}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof BadRequestError ? 400 : 500;
  res.status(statusCode).json({ message: err.message });
};
