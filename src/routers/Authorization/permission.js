let controller = require('../../controllers/Authorization/permissionController');
let router = require('express').Router();
let {nameSchema} = require('../../middleware/validationSchema');
let {bodyValidator} = require('../../middleware/validator')

router.get('/', controller.all);
router.post('/',bodyValidator(nameSchema), controller.create);
router.route('/:id')
        .get(controller.details)
        .patch(controller.update)
        .delete(controller.drop)

module.exports = router;