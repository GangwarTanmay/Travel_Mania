const User = require('../models/user.js');

module.exports.renderSignUpForm = (req, res) => {
    res.render('./user/signUp.ejs');
}

module.exports.createUserAccount = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            else {
                req.flash('success', 'Registration successfully!');
                res.redirect('/');
            }
        })
    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/signUp')
    }
}

module.exports.renderSignInForm = (req, res) => {
    res.render('./user/signIn.ejs');
}

module.exports.signInUser = async (req, res) => {
    req.flash('success', "Welcome to Travel Mania :)");
    res.redirect(res.locals.redirectPath);
}

module.exports.logOutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash('error', err.message);
        }
        else {
            req.flash('success', "Logged Out!");
            res.redirect('/listings');
        }
    })
}