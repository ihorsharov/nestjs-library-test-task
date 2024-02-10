import { AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { UserDto } from "../dtos/user.dto";
import Role from "./role.model";

@Table({tableName: 'users'})
class User extends Model<UserDto, Omit<UserDto, 'id'>> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	username: string;

	@AllowNull(false)
	@Column
	password: string;

	@ForeignKey(() => Role)
	@AllowNull(false)
	@Column
	roleId: number;

	@BelongsTo(() => Role)
	role: Role;

}

export default User;