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
const jwt = require("jsonwebtoken");
class AuthController {
    static signUserUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport.authenticate("usersignup", (err, user) => {
                if (err) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).send(user);
                }
            })(req, res, next);
        });
    }
    static signOrganisationUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.certificate = req.file.filename;
            return passport.authenticate("organisationsignup", (err, organisation) => {
                if (err) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).send(organisation);
                }
            })(req, res, next);
        });
    }
    static signUserIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport.authenticate("userlogin", (err, user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err || !user) {
                        throw new Error("500");
                    }
                    req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return next(error);
                        }
                        const body = { email: user.email };
                        const token = jwt.sign(body, process.env.SECRET, {
                            expiresIn: "30 days",
                        });
                        return res.json({ token, role: user.role });
                    }));
                }
                catch (error) {
                    return next(error);
                }
            }))(req, res, next);
        });
    }
    static signOrganisationIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport.authenticate("organisationlogin", (err, organisation) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err || !organisation) {
                        throw new Error("500");
                    }
                    req.login(organisation, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return next(error);
                        }
                        const body = { email: organisation.email };
                        const token = jwt.sign(body, process.env.SECRET, {
                            expiresIn: "30 days",
                        });
                        return res.json({ token });
                    }));
                }
                catch (error) {
                    return next(error);
                }
            }))(req, res, next);
        });
    }
}
exports.AuthController = AuthController;
