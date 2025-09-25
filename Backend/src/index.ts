import express from 'express';
import { cryptRouter, fileRouter } from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://127.0.0.1:5173', 'http://localhost:5173'] }));
app.use('/files', fileRouter);
app.use('/crypts', cryptRouter);

app.listen(3000);
