"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db/models/db");
const Sequelize = require("sequelize");
const User_1 = require("../../users/models/User");
const Organisation_1 = require("../../organisations/models/Organisation");
exports.Announcement = db_1.default.define("announcement", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    geolocation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User_1.User,
            key: "id",
        },
    },
    organizationId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Organisation_1.Organisation,
            key: "id",
        },
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            max: 7,
            min: 1,
        },
    },
});
