let controller = require('../../controllers/Authorization/roleController')
let router = require('express').Router();
let {nameSchema, idSchema, RoleAddRemoveSchema} = require('../../middleware/validationSchema')
let {bodyValidator, paramsValidator} = require('../../middleware/validator');

router.get('/', controller.all);
router.post('/',bodyValidator(nameSchema), controller.create);
router.post('/addPermission', bodyValidator(RoleAddRemoveSchema), controller.roleAddPermission);
router.post('/removePermission', bodyValidator(RoleAddRemoveSchema), controller.roleRemovePermission);
router.route('/:id')
        .get(paramsValidator(idSchema, "id"), controller.details)
        .patch(paramsValidator(idSchema, "id"), bodyValidator(nameSchema), controller.update)
        .delete(paramsValidator(idSchema, "id"), controller.drop);

module.exports = router;