import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IRequest extends Request {
	user: string | JwtPayload;
}