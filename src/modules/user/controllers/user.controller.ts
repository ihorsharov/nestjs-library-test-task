import { compare } from "bcrypt";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import sequelize from "../../../config/database";
import { exceptionFilter } from "../../../utils/exception-filter";
import { CreateUserDto, ReturnUserDto, UpdateUserDto } from "../dtos";
import { LoginDto } from "../dtos/login.dto";
import Role from "../models/role.model";
import User from "../models/user.model";

export const register: RequestHandler = async (req, res) => {
	const registerDto: CreateUserDto = req.body;

	const isUserWithUsername = await User.findOne({where: {username: registerDto.username}});

	if(isUserWithUsername) {
		return exceptionFilter(res, StatusCodes.BAD_REQUEST, `The user with username ${registerDto.username} alreadty exists`);
	}

	const transaction = await sequelize.transaction();

	try {
		const userRole = await Role.findOrCreate({where: {name: registerDto.role}, defaults: {name: registerDto.role}, transaction});

		const user = await User.create({...(await CreateUserDto.fromDto(registerDto)), roleId: userRole[0].id}, {include: Role, returning: true, transaction});

		await transaction.commit();

		const jwtToken = jwt.sign({id: user.id, username: user.username, role: (await user.$get('role'))?.name}, process.env.JWT_SECRET ?? '', {expiresIn: '24h'});

		return res.status(StatusCodes.CREATED).json({accessToken: jwtToken});
	} catch (error: any) {
		await transaction.rollback();

		throw error;
	}
}

export const login: RequestHandler = async (req, res) => {
	const loginDto: LoginDto = req.body;

	const user = await User.findOne({where: {username: loginDto.username}});

	if(!user) return exceptionFilter(res, StatusCodes.BAD_REQUEST, `User with username ${loginDto.username} does not exist`);

	const passwordCheck = await compare(loginDto.password, user.password);

	if(!passwordCheck) return exceptionFilter(res, StatusCodes.UNAUTHORIZED, 'Incorrect password');

	const jwtToken = jwt.sign({id: user.id, username: user.username, role: (await user.$get('role'))?.name}, process.env.JWT_SECRET ?? '', {expiresIn: '24h'});

	return res.status(StatusCodes.CREATED).json({accessToken: jwtToken});
}

export const getAllUsers: RequestHandler = async (req, res) => {
	const users = await User.findAll({include: Role});

	return res.status(StatusCodes.OK).json(ReturnUserDto.toDtos(users));
}

export const getUserById: RequestHandler = async (req, res) => {
	const userId = req.params.id;

	const user = await User.findByPk(userId, {include: Role});

	if(!user){
		return exceptionFilter(res, StatusCodes.NOT_FOUND, `THe user with ID ${userId} not found`);
	}

	return res.status(StatusCodes.OK).json(ReturnUserDto.toDto(user));
}

export const createUser: RequestHandler = async (req, res) => {
	const createUserDto: CreateUserDto = req.body;
	const transaction = await sequelize.transaction();

	try {
		const userRole = await Role.findOrCreate({where: {name: createUserDto.role}, defaults: {name: createUserDto.role}, transaction});

		const user = await User.create({...(await CreateUserDto.fromDto(createUserDto)), roleId: userRole[0].id}, {transaction});

		await transaction.commit();

		return res.status(StatusCodes.CREATED).json(user);
	} catch (error: any) {
		await transaction.rollback();

		throw error;
	}
}

export const updateUserById: RequestHandler = async (req, res) => {
	const updateUserDto: UpdateUserDto = req.body;
	const userId = req.params.id;
	const transaction = await sequelize.transaction();

	try {
		const userRole = await Role.findOrCreate({where: {name: updateUserDto.role}, defaults: {name: updateUserDto.role}, transaction});

		const user = await User.update({...(await UpdateUserDto.fromDto(updateUserDto)), roleId: userRole[0].id}, {where: {id: userId}, transaction});

		await transaction.commit();

		return res.status(StatusCodes.OK).json(user);
	} catch (error: any) {
		await transaction.rollback();

		throw error;
	}
}

export const deleteUserById: RequestHandler = async (req, res) => {
	const userId = req.params.id;

	await User.destroy({where: {id: userId}});

	return res.status(StatusCodes.NO_CONTENT).json({deleted: true});
}