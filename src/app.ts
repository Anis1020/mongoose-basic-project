import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFount from './app/middlewares/notFount';
import router from './app/routes';
const app = express();

//parser
app.use(express.json());
app.use(cors());

//application route
app.use('/api', router);

//test route
app.get('/', (req: Request, res: Response) => {
  var a = 1;
  res.send('Hello World!');
});

//global error handler
app.use(globalErrorHandler);

//Not found route
app.use(notFount);

export default app;
