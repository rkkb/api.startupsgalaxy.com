import express from 'express';
import {
  handleFounderCounts,
  handleIndustries,
  handleNotifyme,
  handleStages,
  handleTags,
  handleTeamSizes,
} from './util.controller';

const routes = express.Router();

routes.post('/notify-me', handleNotifyme);
routes.post('/notify-me', handleNotifyme);
routes.get('/industries', handleIndustries);
routes.get('/founder-counts', handleFounderCounts);
routes.get('/team-sizes', handleTeamSizes);
routes.get('/stages', handleStages);
routes.get('/tags', handleTags);

// eslint-disable-next-line import/no-import-module-exports
module.exports = routes;
