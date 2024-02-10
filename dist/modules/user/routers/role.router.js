"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = (0, express_1.Router)();
router.get('/', role_controller_1.getAllRoles);
router.get('/:id', role_controller_1.getRoleById);
router.post('/', role_controller_1.createRole);
router.put('/:id', role_controller_1.updateRoleById);
router.delete('/:id', role_controller_1.deleteRoleById);
exports.default = router;