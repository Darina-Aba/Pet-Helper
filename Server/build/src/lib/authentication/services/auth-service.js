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
const passport = require("passport");
const bcrypt = require("bcrypt");
const passport_local_1 = require("passport-local");
const user_1 = require("../../users/models/user");
const user_service_1 = require("../../users/services/user-service");
const passport_jwt_1 = require("passport-jwt");
const role_1 = require("../../server/models/role");
const organisation_service_1 = require("../../organisations/services/organisation-service");
const state_1 = require("../../organisations/models/state");
const Organisation_1 = require("../../organisations/models/Organisation");
class AuthService {
    static setUpPassport() {
        AuthService.setSignUp();
        AuthService.setLogIn();
        AuthService.setCheckAccess();
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.hash(password, 10);
        });
    }
    static isValidPassword(userPass, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(password, userPass);
        });
    }
    static setSignUp() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use("usersignup", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            }, this.userSignUp));
            passport.use("organisationsignup", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            }, this.organisationSignUp));
        });
    }
    static setLogIn() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use("userlogin", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
            }, this.userLogIn));
            passport.use("organisationlogin", new passport_local_1.Strategy({
                usernameField: "email",
                passwordField: "password",
            }, this.organisationLogIn));
        });
    }
    static setCheckAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            passport.use(new passport_jwt_1.Strategy({
                secretOrKey: "top_secret",
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
            }, (token, done) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return done(null, token.user);
                }
                catch (error) {
                    done(error);
                }
            })));
        });
    }
    static userSignUp(req, email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPass = yield AuthService.hashPassword(password);
                yield user_service_1.UserService.addUser({
                    email,
                    password: hashPass,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: role_1.Role.User,
                });
                return done(null);
            }
            catch (error) {
                return done(error);
            }
        });
    }
    static organisationSignUp(req, email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPass = yield AuthService.hashPassword(password);
                yield organisation_service_1.OrganisationService.addOrganisation({
                    email,
                    password: hashPass,
                    active: state_1.State.UnActive,
                    name: req.body.name,
                    certificate: req.body.certificate,
                    phone: req.body.phone,
                    role: role_1.Role.Organisation,
                });
                return done(null);
            }
            catch (error) {
                return done(error);
            }
        });
    }
    static userLogIn(email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ where: { email } });
                if (!user) {
                    return done(null, false, { message: "User not found" });
                }
                const validate = yield AuthService.isValidPassword(user.password, password);
                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }
                return done(null, user, { message: "Logged in Successfully" });
            }
            catch (error) {
                return done(error);
            }
        });
    }
    static organisationLogIn(email, password, done) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organisation = yield Organisation_1.Organisation.findOne({ where: { email } });
                if (organisation.active === state_1.State.UnActive) {
                    return done(null, false, { message: "Organisation is being on review" });
                }
                if (!organisation) {
                    return done(null, false, { message: "Organisation not found" });
                }
                const validate = yield AuthService.isValidPassword(organisation.password, password);
                if (!validate) {
                    return done(null, false, { message: "Wrong Password" });
                }
                return done(null, organisation, { message: "Logged in Successfully" });
            }
            catch (error) {
                return done(error);
            }
        });
    }
}
exports.default = AuthService;
