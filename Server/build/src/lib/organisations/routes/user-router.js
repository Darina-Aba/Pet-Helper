"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", user_controller_1.default.getAllUsers);
        this.router.get("/:id", user_controller_1.default.getUser);
        this.router.post("/", user_controller_1.default.addUser);
        this.router.delete("/:id", user_controller_1.default.deleteUser);
        this.router.put("/:id", user_controller_1.default.updateUser);
    }
}
const userRouter = new UserRouter();
exports.default = userRouter.router;
