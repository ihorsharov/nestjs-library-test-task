import { RequestHandler, Router } from "express";
import { ERoles } from "../../../enums/roles.enum";
import { isAuthenticated, isAuthorized } from "../../../middlewares/auth.middleware";
import { createUser, deleteUserById, getAllUsers, getUserById, login, register, updateUserById } from "../controllers/user.controller";

const router = Router();

router.post('/sign-up', register);
router.post('/sign-in', login);

router.get('/', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, getAllUsers);
router.get('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, getUserById);
router.post('/', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, createUser);
router.put('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, updateUserById);
router.delete('/:id', isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, deleteUserById);

export default router;