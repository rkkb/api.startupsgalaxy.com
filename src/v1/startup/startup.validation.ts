import { body } from 'express-validator';

export const validateCreateStartup = [
  body('createdBy').not().isEmpty(),
  body('companyName').not().isEmpty(),
  body('headline').not().isEmpty(),
  body('details').not().isEmpty(),
  body('expirationDate').not().isEmpty(),
  body('category').not().isEmpty(),
  body('termsConditions').not().isEmpty(),
];
