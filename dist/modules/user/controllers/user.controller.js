"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getAllUsers = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt = __importStar(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../../config/database"));
const exception_filter_1 = require("../../../utils/exception-filter");
const dtos_1 = require("../dtos");
const role_model_1 = __importDefault(require("../models/role.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const registerDto = req.body;
    const isUserWithUsername = yield user_model_1.default.findOne({ where: { username: registerDto.username } });
    if (isUserWithUsername) {
        return (0, exception_filter_1.exceptionFilter)(res, http_status_codes_1.StatusCodes.BAD_REQUEST, `The user with username ${registerDto.username} alreadty exists`);
    }
    const transaction = yield database_1.default.transaction();
    try {
        const userRole = yield role_model_1.default.findOrCreate({ where: { name: registerDto.role }, defaults: { name: registerDto.role }, transaction });
        const user = yield user_model_1.default.create(Object.assign(Object.assign({}, (yield dtos_1.CreateUserDto.fromDto(registerDto))), { roleId: userRole[0].id }), { transaction });
        yield transaction.commit();
        const jwtToken = jwt.sign({ id: user.id, username: user.username }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '', { expiresIn: '24h' });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ accessToken: jwtToken });
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.register = register;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findAll({ include: role_model_1.default });
    return res.status(http_status_codes_1.StatusCodes.OK).json(dtos_1.ReturnUserDto.toDtos(users));
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield user_model_1.default.findByPk(userId, { include: role_model_1.default });
    if (!user) {
        return (0, exception_filter_1.exceptionFilter)(res, http_status_codes_1.StatusCodes.NOT_FOUND, `THe user with ID ${userId} not found`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(dtos_1.ReturnUserDto.toDto(user));
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserDto = req.body;
    const transaction = yield database_1.default.transaction();
    try {
        const userRole = yield role_model_1.default.findOrCreate({ where: { name: createUserDto.role }, defaults: { name: createUserDto.role }, transaction });
        const user = yield user_model_1.default.create(Object.assign(Object.assign({}, (yield dtos_1.CreateUserDto.fromDto(createUserDto))), { roleId: userRole[0].id }), { transaction });
        yield transaction.commit();
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(user);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.createUser = createUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserDto = req.body;
    const userId = req.params.id;
    const transaction = yield database_1.default.transaction();
    try {
        const userRole = yield role_model_1.default.findOrCreate({ where: { name: updateUserDto.role }, defaults: { name: updateUserDto.role }, transaction });
        const user = yield user_model_1.default.update(Object.assign(Object.assign({}, (yield dtos_1.UpdateUserDto.fromDto(updateUserDto))), { roleId: userRole[0].id }), { where: { id: userId }, transaction });
        yield transaction.commit();
        return res.status(http_status_codes_1.StatusCodes.OK).json(user);
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield user_model_1.default.destroy({ where: { id: userId } });
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ deleted: true });
});
exports.deleteUserById = deleteUserById;
