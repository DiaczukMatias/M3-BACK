import { UserModel } from "../config/data-source";
import { UserDTO } from "../dto/UserDTO";

import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { createCredential } from "./credentialService";

const getAllUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: { appointments: true },
  });
  return users;
};
const getUserById = async (id: number): Promise<User | null> => {
  const user = await UserModel.findOne({
    where: { id },
    relations: ["appointments"],
  });
  return user;
};

const createUserService = async (userData: UserDTO): Promise<User> => {
  const { name, email, birthdate, nDni, username, password } = userData;
  const newCredentials: Credential = await createCredential({
    username,
    password,
  });
  const user = await UserModel.create({
    name,
    email,
    birthdate,
    nDni,
    credential: newCredentials,
  });

  const result = await UserModel.save(user);
  return result;
};

export { getAllUsersService, getUserById, createUserService };
