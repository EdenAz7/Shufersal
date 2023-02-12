"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegistrationScheme = exports.registerSchema = void 0;
const Joi = require("joi");
const commonStringSchema = Joi.string().min(2).max(18).required();
const commonPasswordSchema = Joi.string().min(6).max(24).required();
exports.registerSchema = Joi.object({
    id: Joi.number().min(11111111).max(999999999).required(),
    email: Joi.string().email().required(),
    password: commonPasswordSchema,
    passwordConfirm: commonPasswordSchema,
    city: commonStringSchema,
    street: Joi.string().min(2).max(50).required(),
    first_name: commonStringSchema,
    last_name: commonStringSchema,
});
function validateRegistrationScheme(req, res, next) {
    var _a;
    const { id, email, password, passwordConfirm, city, street, first_name, last_name } = req === null || req === void 0 ? void 0 : req.body;
    if (!id || !email || !password || !passwordConfirm || !city || !street || !first_name || !last_name)
        return next(new Error());
    if (password !== passwordConfirm)
        return next(new Error("passwords didn't match"));
    const { error } = exports.registerSchema.validate({ id, email, password, passwordConfirm, city, street, first_name, last_name });
    if (error)
        return next(new Error((_a = error === null || error === void 0 ? void 0 : error.details[0]) === null || _a === void 0 ? void 0 : _a.message));
    else
        next();
}
exports.validateRegistrationScheme = validateRegistrationScheme;
