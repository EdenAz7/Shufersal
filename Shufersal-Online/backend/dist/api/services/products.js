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
exports.editProductService = exports.addProductService = exports.getProductsByCategoryService = exports.getProductCategoriesService = exports.getProductByNameService = exports.getProductsService = void 0;
const database_config_1 = require("../../config/database_config");
const queries_1 = require("../helpers/queries");
function getProductsService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getProductsQuery)();
        const [result] = yield (0, database_config_1.getConnection)().query(query);
        return result;
    });
}
exports.getProductsService = getProductsService;
function getProductByNameService(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getProductByNameQuery)();
        const queryString = `%${name}%`;
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [queryString]);
        return result;
    });
}
exports.getProductByNameService = getProductByNameService;
function getProductCategoriesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getProductCategoriesQuery)();
        const [result] = yield (0, database_config_1.getConnection)().query(query);
        return result;
    });
}
exports.getProductCategoriesService = getProductCategoriesService;
function getProductsByCategoryService(category_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getProductsByCategoryQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [category_id]);
        return result;
    });
}
exports.getProductsByCategoryService = getProductsByCategoryService;
function addProductService(name, category_id, price, picture) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.addProductQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [name, category_id, price, picture]);
        return result;
    });
}
exports.addProductService = addProductService;
function editProductService(name, category_id, price, picture, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.editProductQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [name, category_id, price, picture, product_id]);
        return result;
    });
}
exports.editProductService = editProductService;
