import { queryGenerator } from '@util/helper';
import { Request, Response } from 'express';
import { createStartup, getStartups } from './startup.resources';

export async function handleCreateStartup(req: Request, res: Response) {
  try {
    await createStartup({ ...req.body, createdBy: req.body.userInfo.id });
    return res.status(201).json({
      message: 'Startup created successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetStartups(req: Request, res: Response) {
  try {
    const data = await getStartups(queryGenerator(req));
    return res.status(200).json({
      data,
      meta: {
        currentPage: req.query?.page ? Number(req.query?.page) : 1,
        hasMore: req.query?.limit
          ? Number(req.query?.limit) <= data.length
          : undefined,
      },
      message: 'Startup fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
