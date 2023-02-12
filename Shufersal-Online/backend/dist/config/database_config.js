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
exports.getConnection = exports.initDB = void 0;
const mysql2 = require("mysql2/promise");
let connection = null;
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const { MYSQL_DB_HOST: host, MYSQL_DB_PORT: port, MYSQL_DB_USER: user, MYSQL_DB_PASS: password, MYSQL_DB_SCHEMA: database, } = process.env;
        try {
            connection = yield mysql2.createConnection({
                host,
                port,
                user,
                password,
                database,
            });
            console.log(`mysql DB running on port ${port}`);
        }
        catch (error) {
            console.log(error);
            console.log("Application shut down due to MySQL connection error");
            process.exit(1);
        }
    });
}
exports.initDB = initDB;
function getConnection() {
    return connection;
}
exports.getConnection = getConnection;
