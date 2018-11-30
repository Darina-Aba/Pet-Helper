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
const http = require("http");
const db_service_1 = require("./lib/db/services/db-service");
const express_application_1 = require("./lib/server/models/express-application");
const auth_service_1 = require("./lib/authentication/services/auth-service");
const initApplication = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = http.createServer(express_application_1.default);
        yield db_service_1.default.initDataBase();
        auth_service_1.default.setUpPassport();
        server.listen(process.env.PORT);
    }
    catch (error) {
        throw new Error("500");
    }
});
initApplication();
