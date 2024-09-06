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
exports.login = exports.usersRegister = exports.getUsersById = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialService_1 = require("../services/credentialService");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, usersService_1.getAllUsersService)();
        return allUsers.length
            ? res.status(200).json(allUsers)
            : res.status(404).json({ error: "no hay usuarios registrados" });
    }
    catch (error) {
        return res.status(400).json({ message: "Error al obtener los usuarios." });
    }
});
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, usersService_1.getUserById)(Number(id));
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario." });
    }
});
exports.getUsersById = getUsersById;
const usersRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        if (!userData.name ||
            !userData.email ||
            !userData.birthdate ||
            !userData.nDni ||
            !userData.username ||
            !userData.password) {
            return res
                .status(400)
                .json({ message: "Todos los campos son requeridos." });
        }
        if (typeof userData.name !== "string" ||
            typeof userData.email !== "string" ||
            typeof userData.username !== "string" ||
            typeof userData.password !== "string") {
            return res.status(400).json({
                message: "Los campos name, email, username y password deben ser cadenas de texto.",
            });
        }
        const newUser = yield (0, usersService_1.createUserService)(userData);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario." });
    }
});
exports.usersRegister = usersRegister;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userId = yield (0, credentialService_1.checkCredentials)({ username, password });
        if (userId) {
            const user = yield (0, usersService_1.getUserById)(userId);
            return res.status(200).json({ login: true, user });
        }
        else {
            return res.status(400).json({ error: "Datos incorrectos" });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.login = login;
