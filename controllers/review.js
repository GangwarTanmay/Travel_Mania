const listing = require('../models/listing.js')
const review = require('../models/review.js');

module.exports.postReview = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listingData = await listing.findById(id);

        if (!listingData) { //if user changed id to an invalid id in url, and db is unable find listing data on basis of that invalid id
            req.flash('error', "Listing that you requested for does not exist!");
            res.redirect('/listings');
        }
        else {
            let { rating, comment } = req.body;
            let newReview = new review({ rating: rating, comment: comment, author: req.user._id });

            listingData.reviews.push(newReview); //also add new review's id to the listing

            await newReview.save();
            await listingData.save();

            req.flash('success', "New Review Added!");
            res.redirect(`/listings/${id}`);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.deleteReview = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        await review.findByIdAndDelete(reviewId);
        await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        req.flash('success', "Review Deleted!");
        res.redirect(`/listings/${id}`);
    }
    catch (err) {
        next(err);
    }
}