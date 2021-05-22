/////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////
const express = require('express');
const siteController = require('../controllers/siteController');
const checkLogin = require('../middlewares/checkLogin');





////////////////////////////////////////////
// Create a site router
////////////////////////////////////////////
const router = express.Router();






////////////////////////////////////////////
// handle all site http request
///////////////////////////////////////////

// insert data
router.post('/', checkLogin, siteController.InsertData);
router.get('/', siteController.GetData);
router.get('/all', siteController.GetAllData);


module.exports = router;