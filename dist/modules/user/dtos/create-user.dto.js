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
exports.CreateUserDto = void 0;
const bcrypt_1 = require("bcrypt");
const user_dto_1 = require("./user.dto");
class CreateUserDto {
    static fromDto(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_dto_1.UserDto();
            const salt = yield (0, bcrypt_1.genSalt)();
            const hashedPassword = yield (0, bcrypt_1.hash)(createUserDto.password, salt);
            user.username = createUserDto.username;
            user.password = hashedPassword;
            return user;
        });
    }
}
exports.CreateUserDto = CreateUserDto;
