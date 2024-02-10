"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookDto = void 0;
const book_dto_1 = require("./book.dto");
class CreateBookDto {
    static fromDto(createBookDto) {
        let book = new book_dto_1.BookDto();
        book.title = createBookDto.title;
        book.author = createBookDto.author;
        book.year = new Date(createBookDto.year);
        book.genre = createBookDto.genre;
        return book;
    }
}
exports.CreateBookDto = CreateBookDto;
