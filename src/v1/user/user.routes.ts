import { auth } from '@config/auth';
import { validate } from '@config/validate';
import express from 'express';
import {
  handleForgotPassword,
  handleGetAddedProfiles,
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
routes.get('/added-profiles', auth, handleGetAddedProfiles);

module.exports = routes;
