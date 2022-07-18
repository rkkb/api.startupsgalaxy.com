import StartupModel from './startup.model';

export async function createStartup(payload: {
  createdBy: number;
  companyName: string;
  headline: string;
  details: string;
  expirationDate: string;
  termsConditions: string;
  category: number;
}) {
  return StartupModel.create(payload);
}
