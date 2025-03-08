let router = require('express').Router();
let controller = require('../controllers/userController');



// Router

router.get('/', controller.all);
router.post('/', controller.create);
router.route('/:id')
        .get(controller.details)
        .patch(controller.update)
        .delete(controller.drop);
router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router