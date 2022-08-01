import { body, check } from 'express-validator';

export const validateCreateStartup = [
  body('userInfo.id').not().isEmpty(),
  body('name').not().isEmpty(),
  body('headline').not().isEmpty(),
  body('details').not().isEmpty(),
  body('foundedYear').not().isEmpty(),
  check('logo').custom((_value, { req }) => {
    if (req.file) return true;
    throw new Error('Logo file is required');
  }),
  body('websiteLink').not().isEmpty(),
  body('industryType').not().isEmpty(),
  body('founderType').not().isEmpty(),
  body('teamSizeType').not().isEmpty(),
  body('stageType').not().isEmpty(),
  body('country').not().isEmpty(),
];
