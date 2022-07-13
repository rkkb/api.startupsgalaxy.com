import { validate } from '@config/validate';
import express from 'express';
import { handleUserSignIn, handleUserSignUp } from './user.controller';
import { validateSignin, validateSignup } from './user.validation';

const routes = express.Router();

routes.post('/sign-up', validate(validateSignup), handleUserSignUp);
routes.post('/sign-in', validate(validateSignin), handleUserSignIn);

module.exports = routes;
