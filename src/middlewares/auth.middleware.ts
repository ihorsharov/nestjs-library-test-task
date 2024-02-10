import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import { ERoles } from "../enums/roles.enum";
import { IRequest } from "../interfaces/request.interface";
import { exceptionFilter } from "../utils/exception-filter";

const verifyJwt = (req: IRequest, res: Response): string | jwt.JwtPayload => {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if(!token){
		return exceptionFilter(res, StatusCodes.UNAUTHORIZED, 'You have not provided access token!');
	}

	return jwt.verify(token, process.env.JWT_SECRET ?? '');
}

export const isAuthenticated = (req: IRequest, res: Response, next: NextFunction) => {
	try {
    req.user = verifyJwt(req, res);

    next();
  } catch (error: any) {
    return exceptionFilter(res, StatusCodes.UNAUTHORIZED, 'You are not authenticated to our service');
  }
}

export const isAuthorized = (requiredRole: ERoles) => (req: IRequest, res: Response, next: NextFunction) => {
	try {
    const decodedJwt = verifyJwt(req, res) as jwt.JwtPayload;

		if(requiredRole !== decodedJwt?.role){
			return exceptionFilter(res, StatusCodes.FORBIDDEN, 'Forbidden resource');
		}

    next();
  } catch (error: any) {
    return exceptionFilter(res, StatusCodes.UNAUTHORIZED, 'You are not authenticated to our service');
  }
}