"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
// For some reasons DataTypes: DataTypes doesn't work
const UserFactory = (sequelize, DataTypes) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: 'User',
        sequelize: sequelize
    });
    // @ts-ignore
    User.associate = (models) => {
        User.hasMany(models.Post);
    };
    return User;
};
exports.default = UserFactory;
