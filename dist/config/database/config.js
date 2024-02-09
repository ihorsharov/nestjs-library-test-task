"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelizeConfig = {
    database: (_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : '',
    user: (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : 'root',
    password: (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : 'root',
    host: (_d = process.env.DB_HOST) !== null && _d !== void 0 ? _d : 'localhost',
    dialect: (_e = process.env.DB_DIALECT) !== null && _e !== void 0 ? _e : 'postgres',
    pool: {
        max: process.env.DB_POOL_MAX ? +process.env.DB_POOL_MAX : 5,
        min: process.env.DB_POOL_MIN ? +process.env.DB_POOL_MIN : 0,
        acquire: process.env.DB_POOL_ACQUIRE ? +process.env.DB_POOL_ACQUIRE : 30000,
        idle: process.env.DB_POOL_IDLE ? +process.env.DB_POOL_IDLE : 10000
    }
};
exports.default = sequelizeConfig;
