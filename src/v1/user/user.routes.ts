import { auth } from '@config/auth';
import { validate } from '@config/validate';
import express from 'express';
import multer from 'multer';

import {
  handleChangePassword,
  handleForgotPassword,
  handleGetAddedProfiles,
  handleLike,
  handleLikeCount,
  handleNewPassword,
  handleRedirectToDashboard,
  handleTotalStats,
  handleUserSignIn,
  handleUserSignUp,
  handleUserUpdate,
  handleUserUpdateProfileImg,
  handleView,
  handleViewCount,
  handleViewCountForInterval,
} from './user.controller';
import {
  validateChangePassword,
  validateEmail,
  validateNewPassword,
  validateSignin,
  validateSignup,
  validateUpdateUserImg,
} from './user.validation';

const upload = multer();

const routes = express.Router();

routes.post('/sign-up', validate(validateSignup), handleUserSignUp);
routes.post('/sign-in', validate(validateSignin), handleUserSignIn);
routes.post('/forgot-password', validate(validateEmail), handleForgotPassword);
routes.post('/new-password', validate(validateNewPassword), handleNewPassword);
routes.post(
  '/change-password',
  auth,
  validate(validateChangePassword),
  handleChangePassword,
);
routes.get('/added-profiles', auth, handleGetAddedProfiles);
routes.get('/redirect-to-dashboard', auth, handleRedirectToDashboard);
routes.patch(
  '/update',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  auth,
  handleUserUpdate,
);
routes.patch(
  '/update/img',
  upload.fields([{ name: 'logo', maxCount: 1 }]),
  auth,
  validate(validateUpdateUserImg),
  handleUserUpdateProfileImg,
);

routes.post('/view', auth, handleView);
routes.get('/view-count', auth, handleViewCount);
routes.get('/view-count-for-interval', auth, handleViewCountForInterval);
routes.post('/like', auth, handleLike);
routes.get('/like-count', auth, handleLikeCount);
routes.get('/total-stats', auth, handleTotalStats);

module.exports = routes;
