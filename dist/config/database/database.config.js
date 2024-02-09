import { Sequelize } from "sequelize";
import { sequelizeConfig } from "./config";
const { database, user, password, ...rest } = sequelizeConfig;
const sequelize = new Sequelize(database, user, password, rest);
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
//# sourceMappingURL=database.config.js.map