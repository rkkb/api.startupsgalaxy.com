import { queryGenerator } from '@util/helper';
import { Request, Response } from 'express';
import {
  createInvestor,
  getInvestor,
  getInvestors,
} from './investor.resources';

export async function handleGetInvestors(req: Request, res: Response) {
  try {
    const data = await getInvestors(queryGenerator(req));
    return res.status(200).json({
      data,
      meta: {
        currentPage: req.query?.page ? Number(req.query?.page) : 1,
        hasMore: req.query?.limit
          ? Number(req.query?.limit) <= data.length
          : undefined,
      },
      message: 'Investors fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleCreateInvestor(req: Request, res: Response) {
  try {
    await createInvestor({ ...req.body, createdBy: req.body.userInfo.id });
    return res.status(201).json({
      message: 'Investor created successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetSingleInvestor(req: Request, res: Response) {
  try {
    const data: any = await getInvestor({ id: Number(req.params.id) });
    if (!data?.id) return res.status(404).json({ message: 'No record found' });

    const similer: any = await getInvestors({
      where: { industryType: data?.industryType },
      ...queryGenerator(req),
    });

    return res.status(200).json({
      data,
      similer,
      message: 'Investor fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
