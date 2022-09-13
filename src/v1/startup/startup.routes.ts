import { auth } from '@config/auth';
import { validate } from '@config/validate';
import { validateGetById } from '@util/util.validation';
import express from 'express';
import multer from 'multer';
import {
  handleCreateStartup,
  handleGetSingleStartups,
  handleGetStartups,
} from './startup.controller';
import { validateCreateStartup } from './startup.validation';

const upload = multer();

const routes = express.Router();

routes.post(
  '/create',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 4 },
  ]),
  auth,
  validate(validateCreateStartup),
  handleCreateStartup,
);

routes.get('/all', handleGetStartups);
routes.get('/:id', validate(validateGetById), handleGetSingleStartups);

module.exports = routes;
