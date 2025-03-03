let Joi = require('joi');

module.exports = {
    nameSchema : Joi.object({
        name : Joi.string().min(3).max(30).required()
    }),
    idSchema : Joi.object({
        id : Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    }),
    
}