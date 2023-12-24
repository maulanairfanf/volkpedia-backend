const router = require('express').Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.delete('/', userController.deleteUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.putUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;