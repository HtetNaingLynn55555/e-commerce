let controller = require('../../controllers/Authorization/roleController')
let router = require('express').Router();
let {nameSchema, idSchema} = require('../../middleware/validationSchema')
let {bodyValidator, paramsValidator} = require('../../middleware/validator');

router.get('/', controller.all);
router.post('/', controller.create);
router.route('/:id')
        .get(controller.details)
        .patch(controller.update)
        .delete(controller.drop);

module.exports = router;