import { auth } from '@config/auth';
import { validate } from '@config/validate';
import express from 'express';
import { handleCreateStartup, handleGetStartups } from './startup.controller';
import { validateCreateStartup } from './startup.validation';

const routes = express.Router();

routes.post(
  '/create',
  auth,
  validate(validateCreateStartup),
  handleCreateStartup,
);

routes.get('/all', handleGetStartups);

module.exports = routes;
