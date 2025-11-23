import express, { NextFunction, Request, Response } from 'express';
import { cryptRouter, fileRouter, keygenRouter } from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] }));
app.use('/files', fileRouter);
app.use('/crypts', cryptRouter);
app.use('/keygen', keygenRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ msg: err.toString() });
});

app.listen(3000);
