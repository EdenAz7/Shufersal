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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_config_1 = require("./config/database_config");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./api/routes/auth"));
const products_1 = __importDefault(require("./api/routes/products"));
const carts_1 = __importDefault(require("./api/routes/carts"));
const verifyToken_1 = require("./api/middlewares/verifyToken");
dotenv_1.default.config();
(0, database_config_1.initDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/healthcheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("Api is working!");
}));
app.use("/auth", auth_1.default);
app.use(verifyToken_1.verifyTokenMiddleware);
app.use("/products", products_1.default);
app.use("/carts", carts_1.default);
app.use((error, req, res, next) => {
    if (error) {
        if (error === null || error === void 0 ? void 0 : error.message)
            res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
        else
            return res.status(500).json({ message: "something went wrong" });
    }
});
const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`api listening to port ${PORT}`);
});
