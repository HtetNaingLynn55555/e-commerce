let controller = require('../../controllers/Authorization/permissionController');
let router = require('express').Router();
let {nameSchema, idSchema} = require('../../middleware/validationSchema');
let {bodyValidator, paramsValidator} = require('../../middleware/validator')

router.get('/', controller.all);
router.post('/',bodyValidator(nameSchema), controller.create);
router.route('/:id')
        .get(paramsValidator(idSchema,"id"), controller.details)
        .patch(paramsValidator(idSchema, "id"),bodyValidator(nameSchema), controller.update)
        .delete(paramsValidator(idSchema,"id"), controller.drop);

module.exports = router;