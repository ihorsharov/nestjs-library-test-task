import { UserDto } from "./user.dto";

export class UpdateBookDto {
	title: string;
	author: string;
	year: string;
	genre: string;

	static fromDto(updateBookDto: UpdateBookDto): UserDto {
		let book = new UserDto();

		book.title = updateBookDto.title;
		book.author = updateBookDto.author;
		book.year = new Date(updateBookDto.year);
		book.genre = updateBookDto.genre;

		return book;
	}
}