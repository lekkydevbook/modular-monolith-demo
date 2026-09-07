import { Request, Response, NextFunction, RequestHandler } from 'express';

export const catchAsync = (handler: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
