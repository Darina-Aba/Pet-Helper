"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organisation_controller_1 = require("../controllers/organisation-controller");
const auth_controller_1 = require("../../authentication/controllers/auth-controller");
const check_role_middleware_1 = require("../../server/check-role.middleware");
const role_1 = require("../../server/models/role");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", organisation_controller_1.default.getAllOrganisations);
        this.router.get("/:id", organisation_controller_1.default.getOrganisation);
        this.router.post("/signup", upload.single("certificate"), auth_controller_1.AuthController.signOrganisationUp);
        this.router.post("/login", auth_controller_1.AuthController.signOrganisationIn);
        this.router.post("/:id/subscribe", check_role_middleware_1.default.checkRole(role_1.Role.Organisation), organisation_controller_1.default.subscribeOnAnnouncement);
        this.router.delete("/:id", check_role_middleware_1.default.checkRole(role_1.Role.Admin), organisation_controller_1.default.deleteOrganisation);
        this.router.put("/:id", check_role_middleware_1.default.checkRole(role_1.Role.Admin, role_1.Role.Organisation), organisation_controller_1.default.updateOrganisation);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
