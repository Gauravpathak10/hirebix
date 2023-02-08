const express = require('express');
const { CreateUserAccount, updateScore, Login, getprofile } = require('../controller/UserController');
const { isAuthenticated } = require('../middlewares/authenticate');


const userRouter = express.Router();

//register
userRouter.post('/create', CreateUserAccount);
userRouter.put('/push/:id',updateScore)
userRouter.post('/login',Login)
userRouter.get('/get/:id',getprofile)


module.exports = userRouter;


