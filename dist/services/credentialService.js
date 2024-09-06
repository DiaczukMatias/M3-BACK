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
exports.checkCredentials = exports.createCredential = void 0;
const data_source_1 = require("../config/data-source");
const createCredential = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentialData;
    const credential = yield data_source_1.CredentialModel.create({
        username,
        password,
    });
    const result = yield data_source_1.CredentialModel.save(credential);
    return result;
});
exports.createCredential = createCredential;
const checkCredentials = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentialData;
    const credential = yield data_source_1.CredentialModel.findOne({
        where: { username },
        relations: ["user"],
    });
    if (credential && credential.password === password) {
        return credential.user.id;
    }
    else {
        return 0;
    }
});
exports.checkCredentials = checkCredentials;
