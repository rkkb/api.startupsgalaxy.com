import { Request, Response } from 'express';
import { createDeal } from './deal.resources';

export async function handleCreateDeal(req: Request, res: Response) {
  try {
    await createDeal(req.body);
    return res.status(201).json({
      message: 'Deal created successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
