const Listing = require("../models/listing");
const newsLetter = require("../models/newsletter");
const ExpressError = require('../utils/ExpressError');

module.exports.index = async (req, res, next) => {
    try {
        const allListings = await Listing.find({}).limit(4);
        res.render("./listings/index.ejs", { allListings });
    }
    catch (err) {
        next(err);
    }
}

module.exports.saveEmail = async (req, res, next) => { 
    try {
        let { email } = req.body;
        let newNewsLetter = new newsLetter({
            email: email
        });
        await newNewsLetter.save();
        req.flash('success', 'E-mail saved! We will get back to you soon');
        res.redirect('/');
    }
    catch (err) { 
        next(err);
    }
}