const express = require('express');
const { allUsers, userById } = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/all', allUsers);
userRouter.get('/:userId', userById);


module.exports = userRouter;