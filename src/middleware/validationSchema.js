let Joi = require('joi')

module.exportes = {
    nameSchema : Joi.object({
        name : Joi.string().min(3).max(30).required()
    })
}