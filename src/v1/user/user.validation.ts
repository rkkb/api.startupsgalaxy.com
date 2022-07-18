/* eslint-disable prefer-promise-reject-errors */
import { body, check } from 'express-validator';
import UserModel from './user.model';

export const validateEmail = [
  check('email')
    .isEmail()
    .custom((value, { req }) => UserModel.findOne({ where: { email: value } }).then((user) => {
      if (!user) {
        return Promise.reject("E-mail does't exist");
      }
      req.body.userInfo = user.toJSON();
      return true;
    })),
];

export const validatePassword = [body('password').isLength({ min: 6 })];

export const validateSignup = [
  check('email')
    .isEmail()
    .custom((value) => UserModel.findOne({ where: { email: value } }).then((user) => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
      return true;
    })),
  body('name').not().isEmpty().withMessage('Name is required'),
  ...validatePassword,
];

export const validateSignin = [...validateEmail, ...validatePassword];

export const validateNewPassword = [
  ...validatePassword,
  body('token').not().isEmpty().withMessage('Token is required'),
];
