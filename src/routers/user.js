let router = require('express').Router();
let controller = require('../controllers/userController');
let {UserSchema} = require('../middleware/validationSchema')
let {bodyValidator, paramsValidator,tokenValidator} = require('../middleware/validator');



// Router

router.get('/',tokenValidator, controller.all);
router.post('/', controller.create);
router.route('/:id')
        .get(controller.details)
        .patch(controller.update)
        .delete(controller.drop);
router.post('/login', controller.login);
router.post('/register', bodyValidator(UserSchema), controller.register);

module.exports = router