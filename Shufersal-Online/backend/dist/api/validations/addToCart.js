"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddProduct = exports.addProductToCartScheme = void 0;
const Joi = require("joi");
const commonNumberSchema = Joi.number().required();
exports.addProductToCartScheme = Joi.object({
    product_id: commonNumberSchema,
    quantity: commonNumberSchema,
    total_price: commonNumberSchema,
});
function validateAddProduct(req, res, next) {
    var _a;
    const { product_id, quantity, total_price } = req === null || req === void 0 ? void 0 : req.body;
    if (!product_id || !quantity || !total_price)
        return next(new Error());
    const { error } = exports.addProductToCartScheme.validate({ product_id, quantity, total_price });
    if (error)
        return next(new Error((_a = error === null || error === void 0 ? void 0 : error.details[0]) === null || _a === void 0 ? void 0 : _a.message));
    else
        next();
}
exports.validateAddProduct = validateAddProduct;
