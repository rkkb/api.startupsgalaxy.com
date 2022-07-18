import { validate } from '@config/validate';
import express from 'express';
import { handleCreateDeal } from './deal.controller';
import { validateCreateDeal } from './deal.validation';

const routes = express.Router();

routes.post('/create', validate(validateCreateDeal), handleCreateDeal);

module.exports = routes;
