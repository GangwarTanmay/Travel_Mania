//middleware to check whether a user is logged in or not 
module.exports.isLoggedIn = (req, res, next) => {
    if (!(req.isAuthenticated())) {
        req.session.redirectPath = req.originalUrl;
        req.flash('error', "You must be logged in first!");
        return res.redirect('/user/signIn')
    } else {
        next();
    }
}
/*
passport by default resets the req.session as soon as we log in so we need to save
req.session.redirectPath to res.locals
*/

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectPath) {
        res.locals.redirectPath = req.session.redirectPath;
        next();
    }
    else { 
        res.locals.redirectPath = '/';
        next();
    }
}
