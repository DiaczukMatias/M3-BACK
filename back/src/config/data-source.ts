import { User } from "./../entities/User";
import { DataSource } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "maximoteamo1234",
  database: "proyecto_modulo",
  synchronize: true,
  logging: false,
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
  // dropSchema: true,
});

export const UserModel = AppDataSource.getRepository(User);

export const AppointmentModel = AppDataSource.getRepository(Appointment);

export const CredentialModel = AppDataSource.getRepository(Credential);
