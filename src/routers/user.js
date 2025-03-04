let router = require('express').Router();
let controller = require('../controllers/userController');



// Router

router.get('/', controller.all);
router.post('/', controller.create);
router.route('/:id')
        .get(controller.details)
        .patch(controller.update)
        .delete(controller.drop)

module.exports = router