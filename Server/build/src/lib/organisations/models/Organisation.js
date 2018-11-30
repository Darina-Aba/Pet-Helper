"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
exports.Organisation = db_1.default.define("organisation", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 255],
        },
    },
    address: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255],
        },
    },
    logo: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    active: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    certificate: {
        unique: true,
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});
