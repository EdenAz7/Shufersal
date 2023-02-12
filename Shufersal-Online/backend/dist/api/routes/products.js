"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const verifyToken_1 = require("../middlewares/verifyToken");
const adminProducts_1 = __importDefault(require("../validations/adminProducts"));
const router = express_1.default.Router();
router.get("/", products_1.getProductsHandler);
router.get("/search/:product_name", products_1.getProductByNameHandler);
router.get("/categories", products_1.getProductCategories);
router.get("/search_all/:category_id", products_1.getProductsByCategory);
router.post("/add_product", verifyToken_1.verifyAdminMiddleware, adminProducts_1.default, products_1.addProductHandler);
router.put("/edit_product/:product_id", verifyToken_1.verifyAdminMiddleware, adminProducts_1.default, products_1.editProductHandler);
exports.default = router;
