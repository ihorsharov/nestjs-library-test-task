"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUserDto = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class ReturnUserDto extends user_model_1.default {
    static toDto(user) {
        const returnUserDto = new ReturnUserDto();
        returnUserDto.id = user.id;
        returnUserDto.username = user.username;
        returnUserDto.role = user.role;
        return returnUserDto;
    }
    static toDtos(user) {
        return user.map(user => this.toDto(user));
    }
}
exports.ReturnUserDto = ReturnUserDto;
