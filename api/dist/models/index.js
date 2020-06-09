"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const DB = {};
let sequelize;
let envConfig;
if (config.use_env_variable) {
    envConfig = process.env[config.use_env_variable];
    sequelize = new sequelize_1.Sequelize(envConfig, config);
}
else {
    sequelize = new sequelize_1.Sequelize(config);
}
function test(sequelize) {
    // Test and log connection to the database
    sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    }).catch((err) => {
        console.log('Unable to connect to the database:', err);
    });
}
test(sequelize);
function getModels(DB, sequelize, DataTypes) {
    let base = path_1.basename(__filename);
    fs_1.readdirSync(__dirname)
        .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== base) && (file.slice(-3) === '.js');
    }).forEach(file => {
        console.log(sequelize.import);
        const model = require(path_1.join(__dirname, file))(sequelize, DataTypes);
        DB[model.name] = model;
    });
    Object.keys(DB).forEach(modelName => {
        if (DB[modelName].associate)
            DB[modelName].associate(DB);
    });
    console.log(DB);
}
getModels(DB, sequelize, sequelize_1.DataTypes);
DB.sequelize = sequelize;
DB.Sequelize = sequelize_1.Sequelize;
exports.default = DB;
