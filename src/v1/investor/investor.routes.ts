import { auth } from '@config/auth';
import express from 'express';
import {
  handleCreateInvestor,
  handleGetInvestors,
} from './investor.controller';

const routes = express.Router();

routes.get('/all', handleGetInvestors);
routes.post('/create', auth, handleCreateInvestor);

module.exports = routes;
