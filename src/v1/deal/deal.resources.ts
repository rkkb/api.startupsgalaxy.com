import DealCategoryModel from '@util/dealCategory.model';
import { IDBQuery } from '@util/helper';
import DealModel from './deal.model';

export async function createDeal(payload: {
  createdBy: number;
  name: string;
  headline: string;
  details: string;
  expirationDate: string;
  termsConditions: string;
  category: number;
}) {
  return DealModel.create(payload);
}

export async function getCategories() {
  return DealCategoryModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getDeals(query: IDBQuery) {
  return DealModel.findAll({ ...query });
}

export async function getDeal(payload: { id: number }) {
  return DealModel.findOne({
    where: { id: payload.id },
    include: [
      {
        model: DealCategoryModel,
      },
    ],
    raw: true,
  });
}
