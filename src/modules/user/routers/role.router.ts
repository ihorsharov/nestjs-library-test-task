import { RequestHandler, Router } from "express";
import { ERoles } from "../../../enums/roles.enum";
import { isAuthenticated, isAuthorized } from "../../../middlewares/auth.middleware";
import { createRole, deleteRoleById, getAllRoles, getRoleById, updateRoleById } from "../controllers/role.controller";

const router = Router();

router.get('/',  isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, getAllRoles);
router.get('/:id',  isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, getRoleById);
router.post('/',  isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, createRole);
router.put('/:id',  isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, updateRoleById);
router.delete('/:id',  isAuthenticated as RequestHandler, isAuthorized(ERoles.ADMIN) as RequestHandler, deleteRoleById);

export default router;