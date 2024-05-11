const listing = require('../models/listing');

let isAuthorized = async (req, res, next) => {
    let { id } = req.params;
    let listingData = await listing.findById(id);
    //checking whether the user is the owner of that listing which he is trying to edit
    if (!(req.user) || !(listingData.owner.equals(req.user._id))) {
        req.flash('error', "You are not authorized to temper this listing");
        res.redirect(`/listings/${id}`);
    }
    else {
        next();
    }
}

module.exports = isAuthorized;