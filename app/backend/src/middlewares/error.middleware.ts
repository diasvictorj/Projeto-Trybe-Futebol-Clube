import { NextFunction, Request, Response } from 'express';

const errorMiddle = (err: unknown, _req: Request, res: Response, _next: NextFunction): Response => {
  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorMiddle;
