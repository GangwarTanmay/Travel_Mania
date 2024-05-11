const review = require("../models/review");

let isReviewAuthor = async (req, res, next) => {
    let { reviewId } = req.params;
    let Review = await review.findById(reviewId);
    if (!Review.author.equals(res.locals.user._id)) {
        req.flash('error', 'You are not authorized to delete this review');
        return res.redirect(`/listings/${reviewId}`);
    }
    else {
        next();
    }
}

module.exports = isReviewAuthor;