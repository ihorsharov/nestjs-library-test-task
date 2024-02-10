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
exports.deleteBookById = exports.updateBookById = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const http_status_codes_1 = require("http-status-codes");
const exception_filter_1 = require("../../utils/exception-filter");
const create_book_dto_1 = require("./dtos/create-book.dto");
const update_book_dto_1 = require("./dtos/update-book.dto");
const book_model_1 = __importDefault(require("./models/book.model"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.findAll();
    return res.status(http_status_codes_1.StatusCodes.OK).json(books);
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const book = yield book_model_1.default.findByPk(bookId);
    if (!book) {
        return (0, exception_filter_1.exceptionFilter)(res, http_status_codes_1.StatusCodes.NOT_FOUND, `THe book with ID ${bookId} not found`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
});
exports.getBookById = getBookById;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookBody = req.body;
    const createdBook = yield book_model_1.default.create(create_book_dto_1.CreateBookDto.fromDto(bookBody));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdBook);
});
exports.createBook = createBook;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updateBookDto = req.body;
    yield book_model_1.default.update(update_book_dto_1.UpdateBookDto.fromDto(updateBookDto), { where: { id: bookId } });
    const updatedBook = yield book_model_1.default.findByPk(bookId);
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedBook);
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    yield book_model_1.default.destroy({ where: { id: bookId } });
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ deleted: true });
});
exports.deleteBookById = deleteBookById;
