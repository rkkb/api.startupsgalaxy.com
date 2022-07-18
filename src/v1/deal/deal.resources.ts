import DealModel from './deal.model';

export async function createDeal(payload: {
  createdBy: number;
  companyName: string;
  headline: string;
  details: string;
  expirationDate: string;
  termsConditions: string;
  category: number;
}) {
  return DealModel.create(payload);
}
