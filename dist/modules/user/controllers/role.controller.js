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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleById = exports.updateRoleById = exports.createRole = exports.getRoleById = exports.getAllRoles = void 0;
const http_status_codes_1 = require("http-status-codes");
const exception_filter_1 = require("../../../utils/exception-filter");
const role_model_1 = __importDefault(require("../models/role.model"));
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield role_model_1.default.findAll();
    return res.status(http_status_codes_1.StatusCodes.OK).json(roles);
});
exports.getAllRoles = getAllRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleId = req.params.id;
    const role = yield role_model_1.default.findByPk(roleId);
    if (!role) {
        return (0, exception_filter_1.exceptionFilter)(res, http_status_codes_1.StatusCodes.NOT_FOUND, `THe role with ID ${roleId} not found`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(role);
});
exports.getRoleById = getRoleById;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleBody = req.body;
    const createdRole = yield role_model_1.default.create(roleBody);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdRole);
});
exports.createRole = createRole;
const updateRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleId = req.params.id;
    const updateRoleDto = req.body;
    yield role_model_1.default.update(updateRoleDto, { where: { id: roleId } });
    const updatedRole = yield role_model_1.default.findByPk(roleId);
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRole);
});
exports.updateRoleById = updateRoleById;
const deleteRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roleId = req.params.id;
    yield role_model_1.default.destroy({ where: { id: roleId } });
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ deleted: true });
});
exports.deleteRoleById = deleteRoleById;
