//using .env file
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');    //helps in creating templates
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const listing = require('./models/listing');
const port = 8080;

const listingsRouter = require('./routes/listings.js');
const reviewsRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');
const homeRouter = require('./routes/home.js');

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);
app.use(flash());

const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 60 * 60 * 24,
})

store.on("error", () => {
    console.log('Error occured in Mongo session store')
})

app.use(session({
    store: store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
        expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
})

app.listen(port, () => {
    console.log("Server listening at port 8080");
});

async function main() {
    await mongoose.connect(dbUrl);
}

main().then(res => {
    console.log("Connection successfull...");
}).catch(err => {
    console.log(err);
    console.log("Connection failed");
});

app.use('/', homeRouter);

//handling requests on /user route
app.use("/user", userRouter);

//handling routes on /listings
app.use("/listings", listingsRouter);

//handling routes on /listings/:id/reviews
app.use("/listings/:id/review", reviewsRouter);


//if request is sent to any invalid route
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

//Error handling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Internal Sever Error" } = err;
    //res.status(status).send(message);
    res.status(status).render("error.ejs", { message, status });
})