const Joi = require('joi');

const SignupSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z\s]+$/).min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9.,]+$')).min(8).max(30)
});
module.exports= SignupSchema;