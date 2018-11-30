"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.User = db_1.default.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            len: [3, 255],
        },
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [0, 255],
        },
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
