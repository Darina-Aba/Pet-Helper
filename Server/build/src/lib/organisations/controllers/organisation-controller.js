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
const organisation_service_1 = require("../services/organisation-service");
const announcement_service_1 = require("../../announcements/services/announcement-service");
class OrganisationController {
    static getAllOrganisations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisations = yield organisation_service_1.OrganisationService.getAllOrganisations();
            res.status(200).send(organisations);
        });
    }
    static getOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisationId = req.params.id;
            const organisation = yield organisation_service_1.OrganisationService.getOrganisation(organisationId);
            res.status(200).send(organisation);
        });
    }
    static deleteOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisationId = req.params.id;
            yield organisation_service_1.OrganisationService.deleteOrganisation(organisationId);
            res.status(200).send();
        });
    }
    static updateOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organisationId = req.params.id;
            const model = req.body;
            yield organisation_service_1.OrganisationService.updateOrganisation(model, organisationId);
            res.status(200).send();
        });
    }
    static addOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = req.body;
            const organisation = yield organisation_service_1.OrganisationService.addOrganisation(model);
            res.status(200).send(organisation);
        });
    }
    static subscribeOnAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            const organisationId = (yield organisation_service_1.OrganisationService.getOrganisationByToken(req.headers.authorization)).id;
            announcement_service_1.AnnouncementService.subscribeOrganisation(announcementId, organisationId);
            res.status(200).send();
        });
    }
}
exports.default = OrganisationController;
