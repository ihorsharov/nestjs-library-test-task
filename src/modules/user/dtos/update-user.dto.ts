import { UserDto } from "./user.dto";

export class UpdateUserDto {
	username: string;
	role: string;

	static async fromDto(updateUserDto: UpdateUserDto): Promise<UserDto> {
		const user = new UserDto();

		user.username = updateUserDto.username;

		return user;
	}
}