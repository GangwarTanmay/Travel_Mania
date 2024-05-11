const express = require('express');
const router = express.Router();
const ExpressError = require('../utils/ExpressError.js');
const listing = require('../models/listing.js');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');
const isAuthorized = require('../middlewares/isAuthorized.js');
const validateListing = require('../middlewares/validateListing.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


// route to handle get and post requests on '/' route
router.route('/').get(listingController.index).post(isLoggedIn, upload.single('image'), listingController.addNewListing)

//adding new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// route to handle get, patch and delete requests on '/:id' route
router.route('/:id').get(listingController.showListing).patch(isLoggedIn, isAuthorized, upload.single('image'), listingController.updateListing).delete(isLoggedIn, isAuthorized, listingController.deleteListing);

//edit listing
router.get("/:id/edit", isLoggedIn, isAuthorized, listingController.editListing)

module.exports = router;