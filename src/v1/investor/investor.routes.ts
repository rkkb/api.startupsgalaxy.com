import { auth } from '@config/auth';
import { validate } from '@config/validate';
import { validateGetById } from '@util/util.validation';
import express from 'express';
import {
  handleCreateInvestor,
  handleGetInvestors,
  handleGetSingleInvestor,
} from './investor.controller';

const routes = express.Router();

routes.get('/all', handleGetInvestors);
routes.post('/create', auth, handleCreateInvestor);
routes.get('/:id', validate(validateGetById), handleGetSingleInvestor);

module.exports = routes;
