const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError.js');
const listing = require('../models/listing.js');
const newsLetter = require('../models/newsletter.js');
const home = require('../controllers/home.js');

router.route('/').get(home.index).post(home.saveEmail);

module.exports = router;