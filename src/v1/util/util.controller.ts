import { Request, Response } from 'express';
import {
  createNotify,
  getAllFounderCounts,
  getAllIndustries,
  getAllStages,
  getAllTags,
  getAllTeamSizes,
} from './util.resources';

export async function handleNotifyme(req: Request, res: Response) {
  try {
    if (!req.body?.email) {
      return res.status(404).json({ message: 'Email is required' });
    }

    await createNotify(req.body.email);
    return res.status(201).json({ message: 'Success' });
  } catch (_ex: any) {
    if (_ex?.name === 'SequelizeUniqueConstraintError') {
      return res.status(202).json({ message: 'Already subscribed' });
    }
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleIndustries(_req: Request, res: Response) {
  try {
    const data = await getAllIndustries();
    return res.status(200).json({ data, message: 'Fetched all industries' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleFounderCounts(_req: Request, res: Response) {
  try {
    const data = await getAllFounderCounts();
    return res
      .status(200)
      .json({ data, message: 'Fetched all founder counts' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleTeamSizes(_req: Request, res: Response) {
  try {
    const data = await getAllTeamSizes();
    return res.status(200).json({ data, message: 'Fetched all Team sizes' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleStages(_req: Request, res: Response) {
  try {
    const data = await getAllStages();
    return res.status(200).json({ data, message: 'Fetched all stages' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleTags(_req: Request, res: Response) {
  try {
    const data = await getAllTags();
    return res.status(200).json({ data, message: 'Fetched all tags' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}
