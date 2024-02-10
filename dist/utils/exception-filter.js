"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionFilter = void 0;
const exceptionFilter = (res, statusCode, message) => {
    return res.status(statusCode).json({ success: false, message });
};
exports.exceptionFilter = exceptionFilter;
