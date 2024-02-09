import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateBookDto } from "./dtos/create-book.dto";
import { UpdateBookDto } from "./dtos/update-book.dto";
import Book from "./models/book.model";

export const getAllBooks: RequestHandler = async (req, res) => {
	const books = await Book.findAll();

	return res.status(StatusCodes.OK).json(books);
}

export const getBookById: RequestHandler = async (req, res) => {
	const userId = req.params.id;

	const book = await Book.findByPk(userId);

	return res.status(StatusCodes.OK).json(book);
}

export const createBook: RequestHandler = async (req, res) => {
	const bookBody: CreateBookDto = req.body;

	const createdBook = await Book.create(bookBody);

	return res.status(StatusCodes.CREATED).json(createdBook);
}

export const updateBookById: RequestHandler = async (req, res) => {
	const bookId = req.params.id;
	const updateBookDto: UpdateBookDto = req.body;

	await Book.update(UpdateBookDto.fromDto(updateBookDto), {where: {id: bookId}});

	const updatedBook = await Book.findByPk(bookId);

	return res.status(StatusCodes.OK).json(updatedBook);

}