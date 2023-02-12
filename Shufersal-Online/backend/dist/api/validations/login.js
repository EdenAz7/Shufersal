"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const Joi = require("joi");
exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(18).required(),
});
function validateLoginScheme(req, res, next) {
    const { error } = exports.loginSchema.validate(req.body);
    if (error)
        return next(new Error(error.message));
    next();
}
exports.default = validateLoginScheme;
