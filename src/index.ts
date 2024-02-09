import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import db from './config/database';
import bookRouter from './modules/book/book.router';
import Book from "./modules/book/models/book.model";
import userRouter from './modules/user/user.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const main = async () => {

	try {
		await db.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error: any) {
		console.error("Unable to connect to the database: ", error);
	}
	
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	await Book.sync({force: true, alter: true});
	//await Role.sync({force: true, alter: true});
	//await User.sync({force: true, alter: true});

	app.use('/books', bookRouter);
	app.use('/users', userRouter);

	app.get("/", (req: Request, res: Response) => {
		res.send("Express + TypeScript Server");
	});

	app.listen(port, () => {
		console.log(`[server]: Server is running at http://localhost:${port}`);
	});
}

main();
