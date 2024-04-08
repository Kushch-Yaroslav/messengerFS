const {Router} = require('express');
const {hashPass} = require('../middleware/hashPassword');
const UserController = require('../controllers/user.controller');
const { checkToken } = require('../middleware/checkToken');
const userRouter = Router();

userRouter.post('/sign-up', hashPass, UserController.signUpUser); // signUp
userRouter.post('/sign-in', UserController.signInUser); // singIn
userRouter.get('/', checkToken, UserController.getOneUser); // getOne user
userRouter.post('/refresh', UserController.refreshSession); // refresh session


module.exports = userRouter;
