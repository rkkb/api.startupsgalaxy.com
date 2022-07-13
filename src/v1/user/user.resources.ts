import UserModel from './user.model';

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
