import { queryGenerator } from '@util/helper';
import { Request, Response } from 'express';
import {
  createDeal, getCategories, getDeal, getDeals,
} from './deal.resources';

export async function handleCreateDeal(req: Request, res: Response) {
  try {
    await createDeal({ ...req.body, createdBy: req.body.userInfo?.id });
    return res.status(201).json({
      message: 'Deal created successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetCategories(_req: Request, res: Response) {
  try {
    const categories = await getCategories();
    return res.status(200).json({
      data: categories,
      message: 'Deal categories fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetDeals(req: Request, res: Response) {
  try {
    const data = await getDeals(queryGenerator(req));
    return res.status(200).json({
      data,
      meta: {
        currentPage: req.query?.page ? Number(req.query?.page) : 1,
        hasMore: req.query?.limit
          ? Number(req.query?.limit) <= data.length
          : undefined,
      },
      message: 'Deals fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetSingleDeal(req: Request, res: Response) {
  try {
    const data: any = await getDeal({ id: Number(req.params.id) });
    if (!data?.id) return res.status(404).json({ message: 'No record found' });

    const similer: any = await getDeals({
      where: { category: data?.category },
      ...queryGenerator(req),
    });
    return res.status(200).json({
      data,
      similer,
      message: 'Deal fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
