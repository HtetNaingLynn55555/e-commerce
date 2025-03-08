let Joi = require('joi');

module.exports = {
    nameSchema : Joi.object({
        name : Joi.string().min(3).max(30).required()
    }),
    idSchema : Joi.object({
        id : Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    }),
    RoleAddRemoveSchema : Joi.object({
        permission_id : Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
        role_id : Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
    }),
    UserSchema : Joi.object({
        name : Joi.string().min(3).max(30).required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
        phone : Joi.string().min(7).max(11).required()
    }),
    
    
}