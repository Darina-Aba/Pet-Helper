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
const user_service_1 = require("../users/services/user-service");
const organisation_service_1 = require("../organisations/services/organisation-service");
class CheckRoleMiddleware {
    static checkRole(...roles) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            let entity = yield user_service_1.UserService.getUserByToken(token);
            if (!entity) {
                entity = yield organisation_service_1.OrganisationService.getOrganisationByToken(token);
            }
            const isValid = roles.some((role) => entity.role === role);
            if (isValid) {
                next();
            }
            else {
                throw Error("400");
            }
        });
    }
}
exports.default = CheckRoleMiddleware;
