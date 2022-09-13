import CountryModel from '@util/country.model';
import FounderCountModel from '@util/founderCount.model';
import { IDBQuery } from '@util/helper';
import IndustryModel from '@util/industry.model';
import StageModel from '@util/stage.model';
import TagModel from '@util/tag.model';
import TeamSizeModel from '@util/teamSize.model';
import StartupModel from './startup.model';
import StartupTagModel from './startup.tags.model';

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

export async function getStartup(payload: { id: number }) {
  return StartupModel.findOne({
    where: { id: payload.id },
    include: [
      {
        model: IndustryModel,
        attributes: ['id', 'name'],
      },
      {
        model: FounderCountModel,
        attributes: ['id', 'name'],
      },
      {
        model: TeamSizeModel,
        attributes: ['id', 'name'],
      },
      {
        model: StageModel,
        attributes: ['id', 'name'],
      },
      {
        model: StartupTagModel,
        attributes: ['id'],
        include: [{ model: TagModel, attributes: ['id', 'name'] }],
      }, {
        model: CountryModel,
        attributes: ['id', 'name'],
      },
    ],
  });
}

export async function createStartupTags(
  payload: {
    startupId: number;
    tagId: number;
  }[],
) {
  return StartupTagModel.bulkCreate(payload);
}
