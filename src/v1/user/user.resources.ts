import DealModel from '../deal/deal.model';
import InvestorModel from '../investor/investor.model';
import StartupModel from '../startup/startup.model';
import LikeModel from './like.model';
import UserModel from './user.model';
import ViewModel from './views.model';

const { Op } = require('sequelize');

export async function createUser(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return UserModel.create(payload);
}

export async function findUser(payload: { email: string }) {
  return UserModel.findOne({ where: { email: payload.email }, raw: true });
}

export async function findUserById(payload: { id: number }) {
  return UserModel.findOne({ where: { id: payload.id }, raw: true });
}

export async function updatePassword(payload: {
  password: string;
  id: number;
}) {
  return UserModel.update(
    { password: payload.password },
    { where: { id: payload.id } },
  );
}

export type IUpadteUserPayload = {
  about?: string;
  countryId?: string;
  logo?: string;
  mobile?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
};
export async function updateUser(
  payload: IUpadteUserPayload,
  where: { id?: number; email?: string },
) {
  console.log('lokesh udate', payload, where);
  return UserModel.update(payload, { where });
}

export async function addView(payload: {
  viewBy?: number;
  startupId?: number;
  investorId?: number;
  dealId?: number;
}) {
  return ViewModel.create(payload);
}

export async function getViewsCount(query: { userId: number }) {
  return ViewModel.count({
    where: {
      [Op.or]: [
        {
          startupId: {
            [Op.not]: null,
          },
        },
        {
          investorId: {
            [Op.not]: null,
          },
        },
        {
          dealId: {
            [Op.not]: null,
          },
        },
      ],
    },
    include: [
      {
        model: StartupModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
      {
        model: InvestorModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
      {
        model: DealModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
    ],
  });
}

export async function getViewsCountForInterval(query: { userId: number }) {
  return ViewModel.count({
    include: [
      {
        model: StartupModel,
        attributes: ['createdBy'],
        required: false,
      },
      {
        model: InvestorModel,
        attributes: ['createdBy'],
        required: false,
      },
      {
        model: DealModel,
        attributes: ['createdBy'],
        required: false,
      },
    ],
    where: {
      [Op.or]: [
        {
          '$startup.createdBy$': {
            [Op.eq]: query.userId,
          },
        },
        {
          '$investor.createdBy$': {
            [Op.eq]: query.userId,
          },
        },
        {
          '$deal.createdBy$': {
            [Op.eq]: query.userId,
          },
        },
      ],
    },
    attributes: ['createdAt'],
    group: ['createdAt'],
  });
}

export async function addLike(payload: {
  viewBy?: number;
  startupId?: number;
  investorId?: number;
  dealId?: number;
}) {
  return LikeModel.create(payload);
}

export async function getLike(query: { where: { [key: string]: any } }) {
  return LikeModel.findOne(query);
}

export async function getLikesCount(query: { userId: number }) {
  return LikeModel.count({
    where: {
      [Op.or]: [
        {
          startupId: {
            [Op.not]: null,
          },
        },
        {
          investorId: {
            [Op.not]: null,
          },
        },
        {
          dealId: {
            [Op.not]: null,
          },
        },
      ],
    },
    include: [
      {
        model: StartupModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
      {
        model: InvestorModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
      {
        model: DealModel,
        attributes: ['id'],
        where: { createdBy: query.userId },
        required: false,
      },
    ],
  });
}

export async function getStartsupCount(query: { userId: number }) {
  return StartupModel.count({
    where: { createdBy: query.userId },
  });
}

export async function getInvestorsCount(query: { userId: number }) {
  return InvestorModel.count({
    where: { createdBy: query.userId },
  });
}

export async function getDealsCount(query: { userId: number }) {
  return DealModel.count({
    where: { createdBy: query.userId },
  });
}
