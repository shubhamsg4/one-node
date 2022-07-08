const Joi = require("joi");

module.exports.LoginModel = {
    username: Joi.string()
        .min(6)
        .required(),
    password: Joi.string()
        .required()
        .min(6)
        .max(50)
};

module.exports.RegisterModel = {
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),
    username: Joi.string()
        .required()
        .min(2)
        .max(50),
    password: Joi.required(),
    role_id: Joi.number()
};