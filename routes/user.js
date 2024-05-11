const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middlewares/isLoggedIn.js');
const userController = require('../controllers/user.js');

//route to handle get and post requests on '/signup' route
router.route('/signUp').get(userController.renderSignUpForm).post(userController.createUserAccount);

//route to handle get and post requests on '/signIn' route
router.route('/signIn').get(userController.renderSignInForm).post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/user/signIn', failureFlash: true }), userController.signInUser)

router.get('/logout', userController.logOutUser)

module.exports = router;