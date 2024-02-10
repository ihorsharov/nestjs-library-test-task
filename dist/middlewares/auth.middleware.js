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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt = __importStar(require("jsonwebtoken"));
const exception_filter_1 = require("../utils/exception-filter");
const isAuthenticated = (req, res, next) => {
    var _a, _b, _c;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw Error('You have not provided access token!');
        }
        const decoded = jwt.verify(token, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : '');
        req.user = decoded;
        next();
    }
    catch (error) {
        return (0, exception_filter_1.exceptionFilter)(res, http_status_codes_1.StatusCodes.UNAUTHORIZED, (_c = error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : 'You are not authenticated to our service');
    }
};
exports.isAuthenticated = isAuthenticated;
