import { RequestHandler, Router } from "express";
import { ERoles } from "../../enums/roles.enum";
import { isAuthenticated, isAuthorized } from "../../middlewares/auth.middleware";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "./book.controller";

const router = Router();

router.get('/', isAuthenticated as RequestHandler, isAuthorized(ERoles.USER) as RequestHandler, getAllBooks);
router.get('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.USER) as RequestHandler, getBookById);
router.post('/', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, createBook);
router.put('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, updateBookById);
router.delete('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, deleteBookById);

export default router;