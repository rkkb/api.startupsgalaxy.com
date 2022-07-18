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

export async function updatePassword(payload: {
  password: string;
  id: number;
}) {
  return UserModel.update(
    { password: payload.password },
    { where: { id: payload.id } },
  );
}
