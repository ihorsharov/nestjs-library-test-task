import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { exceptionFilter } from "../../../utils/exception-filter";
import { CreateRoleDto } from "../dtos";
import { UpdateRoleDto } from "../dtos/update-role.dto";
import Role from "../models/role.model";

export const getAllRoles: RequestHandler = async (req, res) => {
	const roles = await Role.findAll();

	return res.status(StatusCodes.OK).json(roles);
}

export const getRoleById: RequestHandler = async (req, res) => {
	const roleId = req.params.id;

	const role = await Role.findByPk(roleId);

	if(!role) {
		return exceptionFilter(res, StatusCodes.NOT_FOUND, `THe role with ID ${roleId} not found`);
	}

	return res.status(StatusCodes.OK).json(role);
}

export const createRole: RequestHandler = async (req, res) => {
	const roleBody: CreateRoleDto = req.body;

	const createdRole = await Role.create(roleBody);

	return res.status(StatusCodes.CREATED).json(createdRole);
}

export const updateRoleById: RequestHandler = async (req, res) => {
	const roleId = req.params.id;
	const updateRoleDto: UpdateRoleDto = req.body;

	await Role.update(updateRoleDto, {where: {id: roleId}});

	const updatedRole = await Role.findByPk(roleId);

	return res.status(StatusCodes.OK).json(updatedRole);
}

export const deleteRoleById: RequestHandler = async (req, res) => {
	const roleId = req.params.id;

	await Role.destroy({where: {id: roleId}});

	return res.status(StatusCodes.NO_CONTENT).json({deleted: true});
}