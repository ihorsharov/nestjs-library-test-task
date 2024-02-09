import { Sequelize } from "sequelize-typescript";
import sequelizeConfig from "./config";

const {database, user, password, ...rest} = sequelizeConfig;

const sequelize = new Sequelize(database, user, password, {...rest, models: [process.cwd() + '/src/**/*.model.ts'], sync: {force: true, alter: true}});

export default sequelize;