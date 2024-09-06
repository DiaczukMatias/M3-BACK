import { CredentialModel } from "../config/data-source";
import { credentialDTO } from "../dto/createUserDTO";
import { Credential } from "../entities/Credential";

export const createCredential = async (
  credentialData: credentialDTO
): Promise<Credential> => {
  const { username, password } = credentialData;
  const credential: Credential = await CredentialModel.create({
    username,
    password,
  });
  const result = await CredentialModel.save(credential);
  return result;
};

export const checkCredentials = async (
  credentialData: credentialDTO
): Promise<number> => {
  const { username, password } = credentialData;
  const credential: Credential | null = await CredentialModel.findOne({
    where: { username },
    relations: ["user"],
  });

  if (credential && credential.password === password) {
    return credential.user.id;
  } else {
    return 0;
  }
};
