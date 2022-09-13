import { Request } from 'express';
import sequelize from 'sequelize';

export type IDBQuery = {
  [key: string]: string | number | string[][] | { [key: string]: any };
};

export function queryGenerator(req: Request) {
  const limit = req.query?.limit ? Number(req.query?.limit) : 10;
  const offset = req.query?.page
    ? (Number(req.query?.page) - 1) * Number(limit)
    : 0;

  return {
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  };
}

export const validStartupKeys = [
  'industryType',
  'stageType',
  'country',
  'name',
];
export const validInvestorKeys = ['industryType', 'country', 'name'];
export const validDealKeys = ['category', 'name'];

export function filterSearchQuery(
  req: Request,
  type: 'startups' | 'investors' | 'deals',
) {
  const query: any = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (type === 'startups' && validStartupKeys.includes(key)) {
      if (key === 'name') {
        query.name = sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${value}%`,
        );
      } else query[key] = value;
    }

    if (type === 'investors' && validInvestorKeys.includes(key)) {
      if (key === 'name') {
        query.name = sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${value}%`,
        );
      } else query[key] = value;
    }

    if (type === 'deals' && validDealKeys.includes(key)) {
      if (key === 'name') {
        query.name = sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${value}%`,
        );
      } else query[key] = value;
    }
  }
  return query;
}
