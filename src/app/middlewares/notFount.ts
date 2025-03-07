import { NextFunction, Request, Response } from 'express';
const notFount = (req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: 'Route not found',
    error: '',
  });
};
export default notFount;
