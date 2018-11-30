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
const user_service_1 = require("../services/user-service");
const organisation_service_1 = require("../../organisations/services/organisation-service");
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.UserService.getAllUsers();
            res.status(200).send(users);
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield user_service_1.UserService.getUser(userId);
            res.status(200).send(user);
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            yield user_service_1.UserService.deleteUser(userId);
            res.status(200).send();
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const model = req.body;
            yield user_service_1.UserService.updateUser(model, userId);
            res.status(200).send();
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = req.body;
            const user = yield user_service_1.UserService.addUser(model);
            res.status(200).send(user);
        });
    }
    static changeOrganisationState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisationId = req.body.organisationId;
            const state = req.body.state;
            yield organisation_service_1.OrganisationService.changeStatus(organisationId, state);
            res.status(200).send();
        });
    }
}
exports.default = UserController;
