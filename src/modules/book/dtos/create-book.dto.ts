import { BookDto } from "./book.dto";

export class CreateBookDto {
	title: string;
	author: string;
	year: string;
	genre: string;

	static fromDto(createBookDto: CreateBookDto): BookDto {
		let book = new BookDto();

		book.title = createBookDto.title;
		book.author = createBookDto.author;
		book.year = new Date(createBookDto.year);
		book.genre = createBookDto.genre;

		return book;
	}
}