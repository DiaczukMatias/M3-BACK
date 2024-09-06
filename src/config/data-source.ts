import { User } from "./../entities/User";
import { DataSource } from "typeorm";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_PASSWORD as string,
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
