"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.AppointmentModel = exports.UserModel = exports.AppDataSource = void 0;
const User_1 = require("./../entities/User");
const typeorm_1 = require("typeorm");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "proyecto_modulo",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Credential_1.Credential, Appointment_1.Appointment],
    subscribers: [],
    migrations: [],
    // dropSchema: true,
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appointment_1.Appointment);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
