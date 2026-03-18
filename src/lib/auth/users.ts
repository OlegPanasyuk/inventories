import "server-only";

import { User } from "@/lib/models/User";
import "@/lib/db_connector";

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

export async function findUserByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export async function findUserDtoById(id: number) {
  const user = await User.findByPk(id);
  return user ? toUserDto(user) : null;
}

export async function createUser(params: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}) {
  const user = await User.create(params);
  return toUserDto(user);
}