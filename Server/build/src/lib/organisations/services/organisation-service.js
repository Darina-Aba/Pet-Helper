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
const Organisation_1 = require("../models/Organisation");
const jwt = require("jsonwebtoken");
class OrganisationService {
    static getAllOrganisations() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Organisation_1.Organisation.findAll();
        });
    }
    static getOrganisation(organisationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisation = yield Organisation_1.Organisation.findByPk(organisationId);
            if (organisation) {
                return organisation;
            }
            else {
                throw Error("500");
            }
        });
    }
    static addOrganisation(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisation = yield Organisation_1.Organisation.create(model);
            if (organisation) {
                return organisation;
            }
            else {
                throw new Error("500");
            }
        });
    }
    static deleteOrganisation(organisationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Organisation_1.Organisation.destroy({
                where: {
                    id: organisationId,
                },
            });
            if (!res) {
                throw new Error("500");
            }
        });
    }
    static updateOrganisation(model, organisationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Organisation_1.Organisation.update(model, {
                where: {
                    id: organisationId,
                },
            });
        });
    }
    static getOrganisationByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Organisation_1.Organisation.findOne({
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
    static getOrganisationByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = jwt.decode(token);
            return yield this.getOrganisationByEmail(body.email);
        });
    }
    static changeStatus(organisationId, state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Organisation_1.Organisation.update({ active: state }, { where: { organisationId } });
        });
    }
}
exports.OrganisationService = OrganisationService;
