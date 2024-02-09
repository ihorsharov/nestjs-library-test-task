import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CreateBookDto } from "../dtos/create-book.dto";

@Table({tableName: 'books'})
class Book extends Model<Book, CreateBookDto> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	title: string;

	@AllowNull(false)
	@Column
	author: string;

	@AllowNull(false)
	@Column(DataType.DATE)
	year: Date;

	@AllowNull(false)
	@Column
	genre: string;
	
}

export default Book;