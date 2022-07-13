/* eslint-disable prefer-promise-reject-errors */
import { body, check } from 'express-validator';
import UserModel from './user.model';

export const validateSignup = [
  check('email')
    .isEmail()
    .custom((value) => UserModel.findOne({ where: { email: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
        return null;
      })
      .catch(() => Promise.reject('Something went wrong try again later'))),
  body('name').not().isEmpty().withMessage('Name is required'),
  body('password').isLength({ min: 6 }),
];

export const validateSignin = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];
