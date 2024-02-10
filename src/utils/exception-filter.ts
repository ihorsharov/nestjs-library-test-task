import { Response } from 'express';
import { StatusCodes } from "http-status-codes";

export const exceptionFilter = (res: Response, statusCode: StatusCodes, message: string) => {
	return res.status(statusCode).json({success: false, message})
}