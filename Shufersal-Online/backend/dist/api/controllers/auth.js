"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.registerHandler = exports.loginHandler = void 0;
const jwt_helper_1 = require("../helpers/jwt-helper");
const auth_1 = require("../services/auth");
function loginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req === null || req === void 0 ? void 0 : req.body;
        try {
            if (!email || !password)
                return res.status(400).json({ message: "bad request" });
            const currentUser = yield (0, auth_1.isUserExist)(email);
            if (!currentUser)
                return res.status(400).json({ message: "user don't exist" });
            if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.email) !== email || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.password) !== password)
                return res.status(401).json({ message: "user not authorized" });
            delete currentUser.password;
            const token = (0, jwt_helper_1.signToken)(currentUser);
            return res.status(200).json({ token, user_id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id, user_name: currentUser === null || currentUser === void 0 ? void 0 : currentUser.first_name, message: "user logged in successfully" });
        }
        catch (error) {
            return next(new Error("loginHandler error:" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.loginHandler = loginHandler;
function registerHandler(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = yield (0, auth_1.isUserExist)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email);
            const currentID = yield (0, auth_1.isIDExist)((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id);
            if (currentUser || currentID)
                return res.status(400).json({ message: "user already exist" });
            else {
                const { id, first_name, last_name, email, password, city, street } = req === null || req === void 0 ? void 0 : req.body;
                const currentRegisterUser = { id, first_name, last_name, email, password, city, street };
                const result = yield (0, auth_1.registerUser)(currentRegisterUser);
                if (!result)
                    return next(new Error("registerSecondHandler error"));
                return res.status(201).json({ message: "user created successfully", email: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email });
            }
        }
        catch (error) {
            return next(new Error(error.message));
        }
    });
}
exports.registerHandler = registerHandler;
function logoutHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.json({ message: "user logged out successfully" });
        }
        catch (error) {
            return next(new Error());
        }
    });
}
exports.logoutHandler = logoutHandler;
