import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import https from 'https';

import ciaoService from './middleware/ciaoService.js';
import testRoute from './routes/test.js';
import spotsRouter from './routes/spotsRouter.js';

dotenv.config();
ciaoService.startService(); // start mDNS service

// HTTPS SERVER
const HTTPS_PORT = 443;

// reading certificates for https
const certs = ['./keys/server.key', './keys/server.crt'];
const certOptions = {
  key: fs.readFileSync(path.resolve(certs[0])),
  cert: fs.readFileSync(path.resolve(certs[1])),
};

const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(express.static(path.join(dirname, '/public')));

app.use(express.json());

app.use('/test', testRoute);
app.use('/spots', spotsRouter);

// Https Server
const RESTServer = https.createServer(certOptions, app).listen(HTTPS_PORT);

RESTServer.on('listening', () => {
  const addr = RESTServer.address();
  console.log(`Listening on port ${addr.port}`);
});

// error routine
RESTServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `Port ${process.env.PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
