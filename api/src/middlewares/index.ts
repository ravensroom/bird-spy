import { Request, Response, NextFunction } from 'express';

const dummyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Middleware logic
  next();
};

export default dummyMiddleware;
