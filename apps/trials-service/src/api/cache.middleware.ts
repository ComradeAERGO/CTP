// cache.middleware.ts
import { Request, Response, NextFunction } from "express";
import redis from "../config/redis.config";

export const cacheMiddleware = (keyPrefix: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = keyPrefix + req.originalUrl;

    try {
      if (!redis.isOpen) {
        await redis.connect();
      }

      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        res.json(JSON.parse(cachedData));
      } else {
        const respond = res.json.bind(res);
        res.json = (data: any) => {
          redis.setEx(cacheKey, 3600, JSON.stringify(data));
          return respond(data);
        };
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};
