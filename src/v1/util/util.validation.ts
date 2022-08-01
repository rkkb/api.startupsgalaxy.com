import { param } from 'express-validator';

export const validateGetById = [param('id').not().isEmpty().isNumeric()];
