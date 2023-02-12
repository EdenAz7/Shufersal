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
exports.registerUser = exports.isIDExist = exports.isUserExist = void 0;
const database_config_1 = require("../../config/database_config");
const queries_1 = require("../helpers/queries");
function isUserExist(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.isUserExistQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [email]);
        return result[0];
    });
}
exports.isUserExist = isUserExist;
function isIDExist(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.isIDExistQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [id]);
        return result[0];
    });
}
exports.isIDExist = isIDExist;
function registerUser(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.registerUserQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, Object.values(obj));
        return result;
    });
}
exports.registerUser = registerUser;
