import express, { Express } from 'express';
import dotenv from 'dotenv';

import startUp from '@startup/index';
import routes from '@startup/routes';

dotenv.config();

const PORT = process.env.PORT || 9987;

const app: Express = express();
const server = require('http').Server(app);

startUp(app);

app.get('/', async (_req, res) => {
  res.json({ status: true, message: 'Our node.js app works api.startsupgalaxy.com' });
});

server.listen(process.env.PORT, async () => {
  // routes
  await routes(app);

  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
