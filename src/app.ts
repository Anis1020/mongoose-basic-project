import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRouter } from './app/modules/student/student.routers';
const app = express();

//parser
app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/student', StudentRouter);

app.get('/', (req: Request, res: Response) => {
  var a = 1;
  res.send('Hello World!');
});

export default app;
