"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminMiddleware = exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyTokenMiddleware(req, res, next) {
    var _a;
    const authorization = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authorization)
        return next(new Error("UnAuthorized error"));
    jsonwebtoken_1.default.verify(authorization, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("UnAuthorized: " + (err === null || err === void 0 ? void 0 : err.message)));
        }
        else {
            req.userData = decoded === null || decoded === void 0 ? void 0 : decoded.data;
            return next();
        }
    });
}
exports.verifyTokenMiddleware = verifyTokenMiddleware;
function verifyAdminMiddleware(req, res, next) {
    var _a;
    const authorization = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!authorization)
        return next(new Error("UnAuthorized error"));
    jsonwebtoken_1.default.verify(authorization, process.env.SECRET, (err, decoded) => {
        var _a;
        if (err) {
            return next(new Error("UnAuthorized: " + (err === null || err === void 0 ? void 0 : err.message)));
        }
        else {
            if (((_a = decoded === null || decoded === void 0 ? void 0 : decoded.data) === null || _a === void 0 ? void 0 : _a.role) === 'admin')
                return next();
            else
                return next(new Error("UnAuthorized / UnPermission"));
        }
    });
}
exports.verifyAdminMiddleware = verifyAdminMiddleware;
