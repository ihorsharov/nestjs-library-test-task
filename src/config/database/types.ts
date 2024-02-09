import { Dialect } from "sequelize";

export interface IDatabaseSequelizeConfigPool {
	max: number;
	min: number;
	acquire: number;
	idle: number;
}

export interface IDatabaseSequelizeConfig {
	database: string;
	user: string;
	password: string;
	host: string;
	dialect: Dialect;
	pool: IDatabaseSequelizeConfigPool;
}