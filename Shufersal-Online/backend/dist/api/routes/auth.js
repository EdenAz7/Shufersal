"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const login_1 = __importDefault(require("../validations/login"));
const register_1 = require("../validations/register");
const router = express_1.default.Router();
router.post("/login", login_1.default, auth_1.loginHandler);
router.post("/register", register_1.validateRegistrationScheme, auth_1.registerHandler);
router.get("/logout", auth_1.logoutHandler);
exports.default = router;
