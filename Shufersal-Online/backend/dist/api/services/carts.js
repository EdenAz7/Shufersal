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
exports.getAllOrdersService = exports.getUnavailableShippingDatesService = exports.getCartPriceService = exports.isProductInCartService = exports.isCartExist = exports.orderCartService = exports.deleteAllProductsFromCartService = exports.removeProductFromCartService = exports.updateQuantityService = exports.addProductToCartService = exports.createCartToUserService = exports.getCartByUserIDService = exports.getCartDetailsByIDService = void 0;
const database_config_1 = require("../../config/database_config");
const queries_1 = require("../helpers/queries");
function getCartDetailsByIDService(cart_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getCartDetailsByCartIDQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id]);
        return result;
    });
}
exports.getCartDetailsByIDService = getCartDetailsByIDService;
function getCartByUserIDService(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getCartByUserIDQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [user_id]);
        return result[0];
    });
}
exports.getCartByUserIDService = getCartByUserIDService;
function createCartToUserService(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.createCartToUserQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [user_id]);
        return result;
    });
}
exports.createCartToUserService = createCartToUserService;
function addProductToCartService(product_id, quantity, total_price, cart_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.addProductToCartQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [product_id, quantity, total_price, cart_id]);
        return result;
    });
}
exports.addProductToCartService = addProductToCartService;
function updateQuantityService(quantity, total_price, product_id, cart_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.updateProductQuantityQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [quantity, total_price, product_id, cart_id]);
        return result;
    });
}
exports.updateQuantityService = updateQuantityService;
function removeProductFromCartService(cart_id, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.removeProductToCartQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id, product_id]);
        return result;
    });
}
exports.removeProductFromCartService = removeProductFromCartService;
function deleteAllProductsFromCartService(cart_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.deleteAllProductsFromCartQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id]);
        return result;
    });
}
exports.deleteAllProductsFromCartService = deleteAllProductsFromCartService;
function orderCartService(orderDetailsObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.orderCartQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, Object.values(orderDetailsObject));
        if ((result === null || result === void 0 ? void 0 : result.affectedRows) === 1) {
            const closeOrderQuery = (0, queries_1.getCloseOrderQuery)();
            const [closeOrderResult] = yield (0, database_config_1.getConnection)().execute(closeOrderQuery, [orderDetailsObject === null || orderDetailsObject === void 0 ? void 0 : orderDetailsObject.cart_id]);
            if ((closeOrderResult === null || closeOrderResult === void 0 ? void 0 : closeOrderResult.affectedRows) === 1)
                return result;
            else
                return false;
        }
        else
            return false;
    });
}
exports.orderCartService = orderCartService;
function isCartExist(cart_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.isCartExistQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id]);
        return result[0];
    });
}
exports.isCartExist = isCartExist;
function isProductInCartService(cart_id, product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.isProductInCartQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id, product_id]);
        return result[0];
    });
}
exports.isProductInCartService = isProductInCartService;
function getCartPriceService(cart_id) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getCartPriceQuery)();
        const [result] = yield (0, database_config_1.getConnection)().execute(query, [cart_id]);
        if ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total_cart_price)
            return parseInt((_b = result[0]) === null || _b === void 0 ? void 0 : _b.total_cart_price);
        else
            return 0;
    });
}
exports.getCartPriceService = getCartPriceService;
function getUnavailableShippingDatesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getUnavailableShippingDatesQuery)();
        const [result] = yield (0, database_config_1.getConnection)().query(query);
        return result;
    });
}
exports.getUnavailableShippingDatesService = getUnavailableShippingDatesService;
function getAllOrdersService() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, queries_1.getAllOrdersQuery)();
        const [result] = yield (0, database_config_1.getConnection)().query(query);
        return result;
    });
}
exports.getAllOrdersService = getAllOrdersService;
