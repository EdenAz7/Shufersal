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
exports.orderCartByIDHandler = exports.getCartTotalPriceHandler = exports.deleteAllCartHandler = exports.removeProductFromCartByIDHandler = exports.updateProductQuantityHandler = exports.addProductToCartByIDHandler = exports.getAllOrdersHandler = exports.getCartByUserIDHandler = exports.getUnavailableShippingDatesHandler = exports.getCartDetailsByCartIDHandler = void 0;
const carts_1 = require("../services/carts");
function getCartDetailsByCartIDHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            if (!cart_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const cartDetails = yield (0, carts_1.getCartDetailsByIDService)(cart_id);
            if ((cartDetails === null || cartDetails === void 0 ? void 0 : cartDetails.length) === 0)
                return res.status(204).json({ message: "cart is empty", cartDetails: [] });
            else
                return res.status(200).json({ message: "ok", cartDetails });
        }
        catch (error) {
            return next(new Error("getCartDetailsByCartIDHandler" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.getCartDetailsByCartIDHandler = getCartDetailsByCartIDHandler;
function getUnavailableShippingDatesHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const unavailableShippingDates = yield (0, carts_1.getUnavailableShippingDatesService)();
            if (!unavailableShippingDates)
                return res.status(404).json({ message: "somthing went wrong please try again" });
            else
                return res.status(200).json({ message: "ok", unavailable_shipping_dates: unavailableShippingDates });
        }
        catch (error) {
            return next(new Error("getUnavailableShippingDatesHandler" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.getUnavailableShippingDatesHandler = getUnavailableShippingDatesHandler;
function getCartByUserIDHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.user_id;
            if (!user_id)
                return res.status(403).json({ message: "bad request" });
            const cart = yield (0, carts_1.getCartByUserIDService)(user_id);
            if (!cart) {
                const newCart = yield (0, carts_1.createCartToUserService)(user_id);
                if (newCart === null || newCart === void 0 ? void 0 : newCart.insertId) {
                    const currentCart = yield (0, carts_1.getCartByUserIDService)(user_id);
                    if (!currentCart)
                        return res.status(404).json({ message: "getting cart details went wrong" });
                    return res.status(200).json({ message: "cart details succeed", cart: currentCart });
                }
                else {
                    return res.status(404).json({ message: "getting cart details went wrong" });
                }
            }
            else {
                return res.status(200).json({ message: "cart details succeed", cart });
            }
        }
        catch (error) {
            return next(new Error("getCartByUserIDHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.getCartByUserIDHandler = getCartByUserIDHandler;
function getAllOrdersHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allOrders = yield (0, carts_1.getAllOrdersService)();
            if (!allOrders)
                return res.status(404).json({ message: "no orders available" });
            else
                return res.status(200).json({ message: "ok", orders: allOrders });
        }
        catch (error) {
            return next(new Error("getAllOrdersHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.getAllOrdersHandler = getAllOrdersHandler;
function addProductToCartByIDHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            const { product_id, quantity, total_price } = req === null || req === void 0 ? void 0 : req.body;
            if (!cart_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const isProductInCart = yield (0, carts_1.isProductInCartService)(cart_id, product_id);
            if (isProductInCart) {
                const newQuantity = (isProductInCart === null || isProductInCart === void 0 ? void 0 : isProductInCart.quantity) + quantity;
                const newTotalPrice = (isProductInCart === null || isProductInCart === void 0 ? void 0 : isProductInCart.total_price) + total_price;
                const result = yield (0, carts_1.updateQuantityService)(newQuantity, newTotalPrice, product_id, cart_id);
                if (!result || (result === null || result === void 0 ? void 0 : result.affectedRows) === 0)
                    return res.status(400).json({ message: "update quantity failed" });
                else
                    return res.status(200).json({ message: "product updated succefully" });
            }
            else {
                const result = yield (0, carts_1.addProductToCartService)(product_id, quantity, total_price, cart_id);
                if (!result || (result === null || result === void 0 ? void 0 : result.affectedRows) === 0)
                    return res.status(400).json({ message: "porduct failed to add" });
                else
                    return res.status(200).json({ message: "product added succefully" });
            }
        }
        catch (error) {
            return next(new Error("addProductToCartByIDHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.addProductToCartByIDHandler = addProductToCartByIDHandler;
function updateProductQuantityHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            const { product_id, quantity, total_price } = req === null || req === void 0 ? void 0 : req.body;
            if (!cart_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const isProductInCart = yield (0, carts_1.isProductInCartService)(cart_id, product_id);
            if (!isProductInCart)
                return res.status(403).json({ message: "the product is not in the cart" });
            else {
                if (isProductInCart.quantity === 1) {
                    const result = yield (0, carts_1.removeProductFromCartService)(cart_id, product_id);
                    if (!result || (result === null || result === void 0 ? void 0 : result.affectedRows) === 0)
                        return res.status(400).json({ message: "porduct failed to add" });
                    else
                        return res.status(200).json({ message: "product removed succefully" });
                }
                else {
                    const newQuantity = (isProductInCart === null || isProductInCart === void 0 ? void 0 : isProductInCart.quantity) + quantity;
                    const newTotalPrice = (isProductInCart === null || isProductInCart === void 0 ? void 0 : isProductInCart.total_price) + total_price;
                    const result = yield (0, carts_1.updateQuantityService)(newQuantity, newTotalPrice, product_id, cart_id);
                    if (!result || (result === null || result === void 0 ? void 0 : result.affectedRows) === 0)
                        return res.status(400).json({ message: "update quantity failed" });
                    else
                        return res.status(200).json({ message: "product updated succefully" });
                }
            }
        }
        catch (error) {
            return next(new Error("updateProductQuantityHandler error" + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.updateProductQuantityHandler = updateProductQuantityHandler;
function removeProductFromCartByIDHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            const { product_id } = req === null || req === void 0 ? void 0 : req.body;
            if (!cart_id || !product_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const isProductInCart = yield (0, carts_1.isProductInCartService)(cart_id, product_id);
            if (!isProductInCart)
                return res.status(403).json({ message: "the product is not in the cart" });
            const result = yield (0, carts_1.removeProductFromCartService)(cart_id, product_id);
            if (!result || (result === null || result === void 0 ? void 0 : result.affectedRows) === 0)
                return res.status(400).json({ message: "porduct failed to add" });
            else
                return res.status(200).json({ message: "product removed succefully" });
        }
        catch (error) {
            return next(new Error("removeProductFromCartByIDHandler error: " + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.removeProductFromCartByIDHandler = removeProductFromCartByIDHandler;
function deleteAllCartHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            if (!cart_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const result = yield (0, carts_1.deleteAllProductsFromCartService)(cart_id);
            if (!result)
                return res.status(400).json({ message: "porducts failed to removed from cart" });
            else
                return res.status(200).json({ message: "porducts removed from cart succefully " });
        }
        catch (error) {
            return next(new Error("deleteAllCartHandler error: " + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.deleteAllCartHandler = deleteAllCartHandler;
function getCartTotalPriceHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const cart_total = yield (0, carts_1.getCartPriceService)(currentCart === null || currentCart === void 0 ? void 0 : currentCart.id);
            return res.status(200).json({ message: "ok", total_price: cart_total });
        }
        catch (error) {
            return next(new Error("getCartTotalPriceHandler error: " + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.getCartTotalPriceHandler = getCartTotalPriceHandler;
function orderCartByIDHandler(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart_id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.cart_id;
            if (!cart_id)
                return res.status(403).json({ message: "bad request" });
            const currentCart = yield (0, carts_1.isCartExist)(cart_id);
            if (!currentCart)
                return res.status(403).json({ message: "no open cart available for the certain id" });
            const currentUser = req.userData;
            if (!currentUser)
                return res.status(401).json({ message: "unauthorized" });
            const { city, street, date, credit_card } = req.body;
            const fullShippingDates = yield (0, carts_1.getUnavailableShippingDatesService)();
            let isDateAvailable = true;
            fullShippingDates.map((result) => {
                const tempDate = new Date((result === null || result === void 0 ? void 0 : result.date).toString());
                const currentStringDate = `${tempDate.getFullYear()}-${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${("0" + tempDate.getDate()).slice(-2)}`;
                if (currentStringDate === date)
                    isDateAvailable = false;
                else
                    isDateAvailable = true;
            });
            if (!isDateAvailable)
                return res.status(404).json({ message: "date is already full of shipping please select another date" });
            const cart_total = yield (0, carts_1.getCartPriceService)(currentCart === null || currentCart === void 0 ? void 0 : currentCart.id);
            if (!cart_total)
                return res.status(404).json({ message: "error, please try again" });
            const orderDetailsObject = {
                user_id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                cart_id: currentCart === null || currentCart === void 0 ? void 0 : currentCart.id,
                total_price: cart_total,
                city: city,
                street: street,
                date: date,
                credit_card: credit_card,
            };
            const orderResult = yield (0, carts_1.orderCartService)(orderDetailsObject);
            if (!orderResult)
                return res.status(404).json({ message: "bad order" });
            else
                return res.status(200).json({ message: "order success", order_id: orderResult === null || orderResult === void 0 ? void 0 : orderResult.insertId });
        }
        catch (error) {
            return next(new Error("orderCartByIDHandler error: " + (error === null || error === void 0 ? void 0 : error.message)));
        }
    });
}
exports.orderCartByIDHandler = orderCartByIDHandler;
