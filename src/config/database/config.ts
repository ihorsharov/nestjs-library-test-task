import { config } from "dotenv";
import { Dialect } from "sequelize";
import { IDatabaseSequelizeConfig } from "./types";

config();

const sequelizeConfig: IDatabaseSequelizeConfig = {
	database: process.env.DB_NAME ?? '',
	user: process.env.DB_USER ?? 'root',
	password: process.env.DB_PASSWORD ?? 'root',
	host: process.env.DB_HOST ?? 'localhost',
	dialect: process.env.DB_DIALECT as Dialect ?? 'postgres',
	pool: {
		max: process.env.DB_POOL_MAX ? +process.env.DB_POOL_MAX : 5,
		min: process.env.DB_POOL_MIN ? +process.env.DB_POOL_MIN : 0,
		acquire: process.env.DB_POOL_ACQUIRE ? +process.env.DB_POOL_ACQUIRE	 : 30000,
		idle: process.env.DB_POOL_IDLE ? +process.env.DB_POOL_IDLE : 10000
	}
}

export default sequelizeConfig;