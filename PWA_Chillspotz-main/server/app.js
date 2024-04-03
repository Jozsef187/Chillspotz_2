import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import debug from 'debug';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import spotsRouter from './routes/spotsRouter.js';

dotenv.config();
debug.enable(process.env.DEBUG); // enable DEBUG from .env

const startup = debug('startup');
const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(dirname, '/public')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.json());

app.use('/spots', spotsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

// don´t start server when in test mode
const PORT = 3000;
app.listen(PORT, () => startup('Server is running on port 3000'));

export default app;
