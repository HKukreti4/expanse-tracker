import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (func: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err: Error) => next(err));
  };
export default asyncHandler;
