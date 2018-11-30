"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_1 = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user_router_1 = require("../../../lib/users/routes/user-router");
const announcement_router_1 = require("../../../lib/announcements/routes/announcement-router");
const organisation_router_1 = require("../../../lib/organisations/routes/organisation-router");
const passport = require("passport");
const path = require("path");
class Server {
    constructor() {
        try {
            this.app = express();
            this.router = express_1.Router();
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(express.static(path.resolve("public")));
            this.app.use(passport.initialize());
            this.app.use(cors());
            this.setRoutes();
        }
        catch (error) {
            global.console.log("Error");
        }
    }
    setRoutes() {
        this.app.use("/api/v1", this.router);
        this.app.post("/fake", (req, res) => {
            const t = req.body;
        });
        this.router.use("/users", user_router_1.default);
        this.router.use("/announcements", announcement_router_1.default);
        this.router.use("/organizations", organisation_router_1.default);
    }
}
exports.Server = Server;
const server = new Server();
exports.default = new Server().app;
