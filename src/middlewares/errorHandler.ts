import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500;
  
  // 1. Structured Logging for production diagnostics
  console.error(`[Global Error Boundary] Caught exception:`, {
    message: err.message || 'Unknown internal error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method,
  });

  // 2. Prevent sensitive system leaks in production environment 
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(statusCode).json({
    error: 'InternalServerError',
    message: isDevelopment ? err.message : 'An unexpected error occurred on our server.',
    ...(isDevelopment && { stack: err.stack })
  });
};
