"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.getUserById = exports.getAllUsersService = void 0;
const data_source_1 = require("../config/data-source");
const credentialService_1 = require("./credentialService");
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({
        relations: { appointments: true },
    });
    return users;
});
exports.getAllUsersService = getAllUsersService;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOne({
        where: { id },
        relations: ["appointments"],
    });
    return user;
});
exports.getUserById = getUserById;
const createUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = userData;
    const newCredentials = yield (0, credentialService_1.createCredential)({
        username,
        password,
    });
    const user = yield data_source_1.UserModel.create({
        name,
        email,
        birthdate,
        nDni,
        credential: newCredentials,
    });
    const result = yield data_source_1.UserModel.save(user);
    return result;
});
exports.createUserService = createUserService;
