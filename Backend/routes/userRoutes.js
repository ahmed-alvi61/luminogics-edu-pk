const express = require('express');
const user_Routes = express();

const userController = require('../controller/userController');
const emailVe = require('../controller/authControllers/email');
const uploads = require('../middleware/multer');

user_Routes.post('/register-user',userController.register_user)
.post('/login',uploads,userController.login_user)
.get('/users',userController.get_all_users)
.post('/forgot-password',emailVe.forgot_password)
.post('/verify-otp',emailVe.verify_otp)
.put('/edit-profile/:id',userController.edit_profile)
.post('/reset-password/:id',userController.reset_password)

module.exports = user_Routes;