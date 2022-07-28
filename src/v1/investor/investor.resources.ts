import { IDBQuery } from '@util/helper';
import InvestorModel from './investor.model';

export async function getInvestors(query: IDBQuery) {
  return InvestorModel.findAll({ ...query, raw: true });
}

export async function createInvestor(payload: {
  createdBy: number;
  companyName: string;
  headline: string;
  details: string;
  expirationDate: string;
  termsConditions: string;
}) {
  return InvestorModel.create(payload);
}
