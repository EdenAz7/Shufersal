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
exports.editProductHandler = exports.addProductHandler = exports.getProductsByCategory = exports.getProductCategories = exports.getProductByNameHandler = exports.getProductsHandler = void 0;
const products_1 = require("../services/products");
function getProductsHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, products_1.getProductsService)();
            if (!products)
                return res.status(404).json({ message: "error" });
            else
                return res.status(200).json({ message: "ok", products });
        }
        catch (error) {
            return next(new Error(error === null || error === void 0 ? void 0 : error.message));
        }
    });
}
exports.getProductsHandler = getProductsHandler;
function getProductByNameHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product_name = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.product_name;
            if (!product_name)
                return res.status(403).json({ message: "bad request" });
            const products = yield (0, products_1.getProductByNameService)(product_name);
            if (!products)
                return res.status(404).json({ message: "error" });
            else
                return res.status(200).json({ message: "ok", products });
        }
        catch (error) {
            return next(new Error(error === null || error === void 0 ? void 0 : error.message));
        }
    });
}
exports.getProductByNameHandler = getProductByNameHandler;
function getProductCategories(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, products_1.getProductCategoriesService)();
            if (!categories)
                return res.status(404).json({ message: "error" });
            else
                return res.status(200).json({ message: "ok", categories });
        }
        catch (error) {
            return next(new Error(error === null || error === void 0 ? void 0 : error.message));
        }
    });
}
exports.getProductCategories = getProductCategories;
function getProductsByCategory(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.category_id;
            if (!category_id)
                return res.status(403).json({ message: "bad request" });
            const products = yield (0, products_1.getProductsByCategoryService)(category_id);
            if (!products)
                return res.status(404).json({ message: "error" });
            else
                return res.status(200).json({ message: "ok", products });
        }
        catch (error) {
            return next(new Error(error === null || error === void 0 ? void 0 : error.message));
        }
    });
}
exports.getProductsByCategory = getProductsByCategory;
function addProductHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category_id, price, picture } = req.body;
            const result = yield (0, products_1.addProductService)(name, category_id, price, picture);
            if (!(result === null || result === void 0 ? void 0 : result.insertId))
                return res.status(403).json({ message: "bad request" });
            else
                return res.status(201).json({ message: "product added successfully", new_product_id: result === null || result === void 0 ? void 0 : result.insertId });
        }
        catch (error) {
            return next(new Error("addProductHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.addProductHandler = addProductHandler;
function editProductHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.product_id;
            if (!product_id)
                return res.status(403).json({ message: "bad request" });
            const { name, category_id, price, picture } = req.body;
            const result = yield (0, products_1.editProductService)(name, category_id, price, picture, product_id);
            if ((result === null || result === void 0 ? void 0 : result.affectedRows) !== 1)
                return res.status(403).json({ message: "edit fail" });
            else
                return res.status(201).json({ message: `product ${product_id} edited successfully` });
        }
        catch (error) {
            return next(new Error("editProductHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.editProductHandler = editProductHandler;
