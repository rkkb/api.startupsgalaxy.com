import { validate } from '@config/validate';
import express from 'express';
import { handleCreateStartup } from './startup.controller';
import { validateCreateStartup } from './startup.validation';

const routes = express.Router();

routes.post(
  '/create',
  validate(validateCreateStartup),
  handleCreateStartup,
);

module.exports = routes;
