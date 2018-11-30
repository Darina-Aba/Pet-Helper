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
const Announcement_1 = require("../models/Announcement");
const status_1 = require("../models/status");
class AnnouncementService {
    static getAllAnnouncements() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Announcement_1.Announcement.findAll();
        });
    }
    static subscribeOrganisation(announcementId, organisationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Announcement_1.Announcement.update({ organizationId: organisationId, status: status_1.Status.InProgress }, { where: { id: announcementId } });
        });
    }
    static getAnnouncement(announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcement = yield Announcement_1.Announcement.findByPk(announcementId);
            if (announcement) {
                return announcement;
            }
            else {
                throw Error("500");
            }
        });
    }
    static addAnnouncement(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcement = yield Announcement_1.Announcement.create(model);
            if (announcement) {
                return announcement;
            }
            else {
                throw new Error("500");
            }
        });
    }
    static deleteAnnouncement(announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Announcement_1.Announcement.destroy({
                where: {
                    id: announcementId,
                },
            });
            if (!res) {
                throw new Error("500");
            }
        });
    }
    static updateAnnouncement(model, announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Announcement_1.Announcement.update(model, {
                where: {
                    id: announcementId,
                },
            });
        });
    }
    static changeStatus(announcementId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Announcement_1.Announcement.update({ status }, {
                where: {
                    id: announcementId,
                },
            });
        });
    }
}
exports.AnnouncementService = AnnouncementService;
