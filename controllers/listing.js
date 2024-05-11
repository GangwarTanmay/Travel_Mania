const listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

module.exports.index = async (req, res, next) => {
    try {
        if (req.query.q) {
            const allListings = await listing.find({ category: req.query.q });
            if (allListings.length == 0) {
                next(new ExpressError(404, 'No place found'));
                return;
            }
            res.render("./listings/allListings.ejs", { allListings });
        }
        else if (req.query.city) {
            const allListings = await listing.find({ location: req.query.city });
            if (allListings.length == 0) {
                next(new ExpressError(404, 'No place found at this location'));
                return;
            }
            res.render("./listings/allListings.ejs", { allListings });
        }
        else { 
            const allListings = await listing.find({});
            res.render("./listings/allListings.ejs", { allListings });
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/newListing.ejs");
}

module.exports.addNewListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        let { title, description, category, location, country } = req.body;
        let newListing = await new listing({
            title: title,
            description: description,
            category: category,
            location: location,
            country: country,
            owner: req.user._id
        });

        newListing.image = { url, filename };
        let result = await newListing.save();
        req.flash('success', "New listing Created!");
        res.redirect("/listings");
    }
    catch (err) {
        next(err);
    }
}

module.exports.showListing = async (req, res, next) => {
    try {
        let id = req.params.id;
        let listingData = await listing.findById(id).populate(
            {
                path: 'reviews', populate: {
                    path: 'author'
                }
            }).populate('owner');
        res.render("./listings/showListing.ejs", { listingData });
    }
    catch (err) {
        next(err);
    }
}

module.exports.editListing = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listingData = await listing.findById(id);
        if (!listingData) { //if user changed id to an invalid id in url, and db is unable find listing data on basis of that invalid id
            req.flash('error', "Listing that you requested for does not exist!");
            res.redirect('/listings');
        }
        else {
            res.render("./listings/editListing.ejs", { listingData });
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.updateListing = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { title, description, category, location, country } = req.body;
        let result = await listing.findById(id);
        if (!result) { //if user changed id to an invalid id in url, and db is unable find listing data on basis of that invalid id
            req.flash('error', "Listing that you requested for does not exist!");
            res.redirect('/listings');
        }
        else {
            let listingData = await listing.findByIdAndUpdate(id, { title: title, description: description, category: category, location: location, country: country }, { new: true });

            // if image is not updated the req.file will be undefined
            if (typeof req.file != "undefined") {
                let url = req.file.path;
                let filename = req.file.filename;
                listingData.image.url = url;
                listingData.image.filename = filename;
                await listingData.save();
            }
            req.flash('success', "Listing Updated!");
            res.redirect(`/listings/${id}`);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports.deleteListing = async (req, res, next) => {
    try {
        let { id } = req.params;
        let result = await listing.findById(id);
        if (!result) { //if user changed id to an invalid id in url, and db is unable find listing data on basis of that invalid id
            req.flash('error', "Listing that you requested is already deleted!");
            res.redirect('/listings');
        }
        else {
            await listing.findByIdAndDelete(id);
            req.flash('success', "Listing Deleted!");
            res.redirect("/listings");
        }
    }
    catch (err) {
        next(err);
    }
}