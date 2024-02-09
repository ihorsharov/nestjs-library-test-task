import { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBookById } from "./book.controller";

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBookById);

export default router;