"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PASSWORD = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
