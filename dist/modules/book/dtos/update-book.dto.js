"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookDto = void 0;
const book_dto_1 = require("./book.dto");
class UpdateBookDto {
    static fromDto(updateBookDto) {
        let book = new book_dto_1.BookDto();
        book.title = updateBookDto.title;
        book.author = updateBookDto.author;
        book.year = new Date(updateBookDto.year);
        book.genre = updateBookDto.genre;
        return book;
    }
}
exports.UpdateBookDto = UpdateBookDto;
