import { IDBQuery } from '@util/helper';
import IndustryModel from '@util/industry.model';
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

export async function getInvestor(payload: { id: number }) {
  return InvestorModel.findOne({
    where: { id: payload.id },
    include: [{ model: IndustryModel }],
    raw: true,
  });
}
