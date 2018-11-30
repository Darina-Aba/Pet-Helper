"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_controller_1 = require("../controllers/announcement-controller");
const check_role_middleware_1 = require("../../server/check-role.middleware");
const role_1 = require("../../server/models/role");
class AnnouncementRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", announcement_controller_1.default.getAllAnnouncements);
        this.router.get("/:id", announcement_controller_1.default.getAnnouncement);
        this.router.post("/", check_role_middleware_1.default.checkRole(role_1.Role.Admin, role_1.Role.User), announcement_controller_1.default.addAnnouncement);
        this.router.delete("/:id", check_role_middleware_1.default.checkRole(role_1.Role.Admin, role_1.Role.User), announcement_controller_1.default.deleteAnnouncement);
        this.router.put("/:id/approve", check_role_middleware_1.default.checkRole(role_1.Role.Admin), announcement_controller_1.default.approveAnnouncement);
        this.router.put("/:id/changeStatus", check_role_middleware_1.default.checkRole(role_1.Role.Organisation), announcement_controller_1.default.changeAnnouncementStatus);
        this.router.put("/:id", check_role_middleware_1.default.checkRole(role_1.Role.Admin, role_1.Role.User), announcement_controller_1.default.updateAnnouncement);
    }
}
const announcementRouter = new AnnouncementRouter();
exports.default = announcementRouter.router;
