import { Request, Response } from 'express';
import { createStartup } from './startup.resources';

export async function handleCreateStartup(req: Request, res: Response) {
  try {
    await createStartup(req.body);
    return res.status(201).json({
      message: 'Startup created successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
