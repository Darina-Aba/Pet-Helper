"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const auth_controller_1 = require("../../authentication/controllers/auth-controller");
const check_role_middleware_1 = require("../../server/check-role.middleware");
const role_1 = require("../../server/models/role");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", check_role_middleware_1.default.checkRole(role_1.Role.Admin), user_controller_1.default.getAllUsers);
        this.router.get("/:id", user_controller_1.default.getUser);
        this.router.post("/signup", auth_controller_1.AuthController.signUserUp);
        this.router.post("/login", auth_controller_1.AuthController.signUserIn);
        this.router.put("/changeOrganisationState", check_role_middleware_1.default.checkRole(role_1.Role.Admin), user_controller_1.default.changeOrganisationState);
        this.router.delete("/:id", user_controller_1.default.deleteUser);
        this.router.put("/:id", check_role_middleware_1.default.checkRole(role_1.Role.User), user_controller_1.default.updateUser);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
