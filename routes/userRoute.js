//////////////////////////////////////////
// Dependencies
//////////////////////////////////////////
const express = require('express');
const userController = require('../controllers/userController');



//////////////////////////////////////////
// Create a sub route
//////////////////////////////////////////
const router = express.Router();



/////////////////////////////////////////
// handle all users http request
/////////////////////////////////////////

// user signup
router.post('/signup', userController.UserSignUp);

// user login
router.post('/signin', userController.UserSignIn);

// Get User List
router.get('/all', userController.GetAllUser);





module.exports = router;