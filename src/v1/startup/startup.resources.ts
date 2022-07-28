import { IDBQuery } from '@util/helper';
import StartupModel from './startup.model';

export async function createStartup(payload: {
  createdBy: number;
  companyName: string;
  headline: string;
  details: string;
  expirationDate: string;
  termsConditions: string;
}) {
  return StartupModel.create(payload);
}

export async function getStartups(query: IDBQuery) {
  return StartupModel.findAll({ ...query, raw: true });
}
