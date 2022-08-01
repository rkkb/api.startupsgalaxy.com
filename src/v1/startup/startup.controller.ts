import { queryGenerator } from '@util/helper';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import { createStartup, getStartup, getStartups } from './startup.resources';

let dirname = __dirname;
// eslint-disable-next-line prefer-destructuring
dirname = dirname.split('src')[0];
export async function handleCreateStartup(req: Request, res: Response) {
  try {
    const { file, body } = req;

    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const fileName = `logo-${body.userInfo.id}-${uniquePrefix}-${file?.originalname}`;
    await fs.writeFile(
      `${dirname}public/images/${fileName}`,
      file?.buffer as any,
    );
    // console.log('lokehs data', data)
    await createStartup({
      ...req.body,
      createdBy: req.body.userInfo.id,
      logo: fileName,
    });

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
      message: 'Startups fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetSingleStartups(req: Request, res: Response) {
  try {
    const data: any = await getStartup({ id: Number(req.params.id) });
    if (data?.id) {
      return res.status(200).json({
        data,
        message: 'Startup fetched successfull',
      });
    }
    return res.status(404).json({ message: 'No record found' });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
