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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const book_router_1 = __importDefault(require("./modules/book/book.router"));
const book_model_1 = __importDefault(require("./modules/book/models/book.model"));
const role_model_1 = __importDefault(require("./modules/user/models/role.model"));
const user_model_1 = __importDefault(require("./modules/user/models/user.model"));
const role_router_1 = __importDefault(require("./modules/user/routers/role.router"));
const user_router_1 = __importDefault(require("./modules/user/routers/user.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    yield book_model_1.default.sync({ force: true, alter: true });
    yield role_model_1.default.sync({ force: true, alter: true });
    yield user_model_1.default.sync({ force: true, alter: true });
    app.use('/books', book_router_1.default);
    app.use('/users', user_router_1.default);
    app.use('/roles', role_router_1.default);
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
});
main();
