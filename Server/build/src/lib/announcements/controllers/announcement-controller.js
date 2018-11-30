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
const announcement_service_1 = require("../services/announcement-service");
const status_1 = require("../models/status");
const user_service_1 = require("../../users/services/user-service");
class AnnouncementController {
    static getAllAnnouncements(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcements = yield announcement_service_1.AnnouncementService.getAllAnnouncements();
            res.status(200).send(announcements);
        });
    }
    static getAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            const announcement = yield announcement_service_1.AnnouncementService.getAnnouncement(announcementId);
            res.status(200).send(announcement);
        });
    }
    static deleteAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            yield announcement_service_1.AnnouncementService.deleteAnnouncement(announcementId);
            res.status(200).send();
        });
    }
    static updateAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            const model = req.body;
            yield announcement_service_1.AnnouncementService.updateAnnouncement(model, announcementId);
            res.status(200).send();
        });
    }
    static addAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = req.body;
            const ownerId = (yield user_service_1.UserService.getUserByToken(req.headers.authorization)).id;
            model.status = status_1.Status.OnReview;
            model.ownerId = ownerId;
            const announcement = yield announcement_service_1.AnnouncementService.addAnnouncement(model);
            res.status(200).send(announcement);
        });
    }
    static approveAnnouncement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            yield announcement_service_1.AnnouncementService.changeStatus(announcementId, status_1.Status.Open);
            res.status(200).send();
        });
    }
    static changeAnnouncementStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            const status = req.body.status;
            yield announcement_service_1.AnnouncementService.changeStatus(announcementId, status);
            res.status(200).send();
        });
    }
}
exports.default = AnnouncementController;
