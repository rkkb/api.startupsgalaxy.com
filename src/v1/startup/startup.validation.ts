import { body } from 'express-validator';

export const validateCreateStartup = [
  body('createdBy').not().isEmpty(),
  body('name').not().isEmpty(),
  body('headline').not().isEmpty(),
  body('details').not().isEmpty(),
  body('foundedYear').not().isEmpty(),
  body('logo').not().isEmpty(),
  body('websiteLink').not().isEmpty(),
  body('mobile').not().isEmpty(),
  body('category').not().isEmpty(),
  body('industryType').not().isEmpty(),
  body('founderType').not().isEmpty(),
  body('teamSizeType').not().isEmpty(),
  body('stageType').not().isEmpty(),
  body('country').not().isEmpty(),

];
