import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

//custom middleware
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Data validation schema by using zod
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validateRequest;
