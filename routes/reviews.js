const express = require('express');
const router = express.Router({ mergeParams: true });
const { listingSchemaValidator, reviewSchemaValidator } = require('../schemaValidator.js');
const ExpressError = require('../utils/ExpressError.js');
const review = require('../models/review.js');
const listing = require('../models/listing.js');
const isReviewAuthor = require('../middlewares/isReviewAuthor.js');
const { isLoggedIn } = require('../middlewares/isLoggedIn.js');
const validateReview = require('../middlewares/validateReview.js');
const reviewController = require('../controllers/review.js')

//route to add reviews to a prticular listing
router.post('/', isLoggedIn, validateReview, reviewController.postReview)

// route to delete reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview)


module.exports = router;