import { genSalt, hash } from "bcrypt";
import { UserDto } from "./user.dto";

export class CreateUserDto {
	username: string;
	password: string;
	role: string;

	static async fromDto(createUserDto: CreateUserDto): Promise<UserDto> {
		const user = new UserDto();
		const salt = await genSalt();
		const hashedPassword = await hash(createUserDto.password, salt);

		user.username = createUserDto.username;
		user.password =  hashedPassword;

		return user;
	}
}