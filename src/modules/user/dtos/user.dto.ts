import Role from "../models/role.model";

export class UserDto {
	id: number;
	username: string;
	password: string;
	roleId: number;
	role: Role;
}