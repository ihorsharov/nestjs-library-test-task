import { BookDto } from "./book.dto";

export class UpdateBookDto {
	title: string;
	author: string;
	year: string;
	genre: string;

	static fromDto(updateBookDto: UpdateBookDto): BookDto {
		let book = new BookDto();

		book.title = updateBookDto.title;
		book.author = updateBookDto.author;
		book.year = new Date(updateBookDto.year);
		book.genre = updateBookDto.genre;

		return book;
	}
}