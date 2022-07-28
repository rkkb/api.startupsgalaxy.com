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
  return DealCategoryModel.findAll({ raw: true });
}

export async function getDeals(query: IDBQuery) {
  return DealModel.findAll({ ...query, raw: true });
}
