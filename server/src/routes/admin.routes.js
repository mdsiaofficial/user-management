const express = require('express');
const { blockUser, unblockUser, deleteUser } = require('../controllers/admin.controller');
const adminRouter = express.Router();

adminRouter.post('/block', blockUser);
adminRouter.post('/unblock', unblockUser);
adminRouter.post('/delete', deleteUser);


module.exports = adminRouter;