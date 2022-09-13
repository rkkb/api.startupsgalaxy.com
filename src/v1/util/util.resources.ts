import CountryModel from './country.model';
import FounderCountModel from './founderCount.model';
import IndustryModel from './industry.model';
import StageModel from './stage.model';
import SubscriberModel from './subscriber.model';
import TagModel from './tag.model';
import TeamSizeModel from './teamSize.model';

export async function createNotify(email: string) {
  return SubscriberModel.create({ email });
}

export async function getAllIndustries() {
  return IndustryModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getAllFounderCounts() {
  return FounderCountModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getAllTeamSizes() {
  return TeamSizeModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getAllStages() {
  return StageModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getAllTags() {
  return TagModel.findAll({ raw: true, attributes: ['id', 'name'] });
}

export async function getAllCountries() {
  return CountryModel.findAll({
    raw: true,
    attributes: ['id', 'name', 'code'],
  });
}
