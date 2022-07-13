import { Express } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SqlConnection } from '@config/mySql';

export default function startUp(app: Express) {
  app.use(helmet());

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  SqlConnection();
}
