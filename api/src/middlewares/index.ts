import { Request, Response, NextFunction } from 'express';

const enableCORS = (req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
  const origin = req.headers.origin;
  if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export { enableCORS, handleErrors };
