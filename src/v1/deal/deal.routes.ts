import { auth } from '@config/auth';
import { validate } from '@config/validate';
import { validateGetById } from '@util/util.validation';
import express from 'express';
import {
  handleCreateDeal,
  handleGetCategories,
  handleGetDeals,
  handleGetSingleDeal,
} from './deal.controller';
import { validateCreateDeal } from './deal.validation';

const routes = express.Router();

routes.get('/categories', handleGetCategories);
routes.post('/create', auth, validate(validateCreateDeal), handleCreateDeal);
routes.get('/all', handleGetDeals);
routes.get('/:id', validate(validateGetById), handleGetSingleDeal);

module.exports = routes;
