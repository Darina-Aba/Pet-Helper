"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const jwt = require("jsonwebtoken");
class UserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findAll();
        });
    }
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findByPk(userId);
            if (user) {
                return user;
            }
            else {
                throw Error("500");
            }
        });
    }
    static addUser(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.create(model);
            if (user) {
                return user;
            }
            else {
                throw new Error("500");
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield User_1.User.destroy({
                where: {
                    id: userId,
                },
            });
            if (!res) {
                throw new Error("500");
            }
        });
    }
    static updateUser(model, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_1.User.update(model, {
                where: {
                    id: userId,
                },
            });
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: {
                    email,
                },
            });
            if (user) {
                return user;
            }
            else {
                throw new Error("400");
            }
        });
    }
    static getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = jwt.decode(token);
            return yield this.getUserByEmail(body.email);
        });
    }
}
exports.UserService = UserService;
