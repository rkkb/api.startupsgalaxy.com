import { Request } from 'express';

export type IDBQuery = {
  [key: string]: string | number | string[][];
};
export function queryGenerator(req: Request) {
  const limit = req.query?.limit ? Number(req.query?.limit) : 20;
  const offset = req.query?.page
    ? (Number(req.query?.page) - 1) * Number(limit)
    : 0;

  return {
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  };
}
