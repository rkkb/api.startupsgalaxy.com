import { body } from 'express-validator';

export const validateCreateDeal = [
  body('userInfo.id').not().isEmpty(),
  body('name').not().isEmpty(),
  body('headline').not().isEmpty(),
  body('details').not().isEmpty(),
  body('expirationDate').not().isEmpty(),
  body('category').not().isEmpty(),
  body('termsConditions').not().isEmpty(),
];
