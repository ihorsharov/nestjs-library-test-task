import { AllowNull, AutoIncrement, Column, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({tableName: 'roles'})
class Role extends Model {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@AllowNull(false)
	@Column
	name: string;

	@HasOne(() => User)
	user: User;
}

export default Role