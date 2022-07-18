import express from 'express';
import SubscriberModel from '@util/subscriber.model';

const routes = express.Router();

routes.post('/notify-me', async (req, res) => {
  try {
    if (!req.body?.email) {
      return res.status(404).json({ message: 'Email is required' });
    }

    await SubscriberModel.create({ email: req.body.email });
    return res.status(201).json({ message: 'Success' });
  } catch (_ex: any) {
    if (_ex?.name === 'SequelizeUniqueConstraintError') {
      return res.status(202).json({ message: 'Already subscribed' });
    }
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
});

// eslint-disable-next-line import/no-import-module-exports
module.exports = routes;
