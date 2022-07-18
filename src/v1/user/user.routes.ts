import { validate } from '@config/validate';
import express from 'express';
import {
  handleForgotPassword,
  handleNewPassword,
  handleUserSignIn,
  handleUserSignUp,
} from './user.controller';
import {
  validateEmail,
  validateNewPassword,
  validateSignin,
  validateSignup,
} from './user.validation';

const routes = express.Router();

routes.post('/sign-up', validate(validateSignup), handleUserSignUp);
routes.post('/sign-in', validate(validateSignin), handleUserSignIn);
routes.post('/forgot-password', validate(validateEmail), handleForgotPassword);
routes.post('/new-password', validate(validateNewPassword), handleNewPassword);

module.exports = routes;