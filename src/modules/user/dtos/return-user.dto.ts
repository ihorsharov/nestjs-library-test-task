import User from "../models/user.model";

export class ReturnUserDto extends User {
	static toDto(user: User): ReturnUserDto {
		const returnUserDto = new ReturnUserDto();

		returnUserDto.id = user.id;
		returnUserDto.username = user.username;
		returnUserDto.role = user.role;

		return returnUserDto;
	}

	static toDtos(user: User[]): ReturnUserDto[] {
		return user.map(user => this.toDto(user));
	}
}