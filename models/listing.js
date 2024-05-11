const mongoose = require('mongoose');
const review = require('./review');
const User = require('./user.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename:String
    },
    category: {
        type:String
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "review"
        }
    ],
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

//middleware to delete all reviews associated to a listing if that listing is deleted
listingSchema.post("findOneAndDelete", async (listingData) => {
    if (listingData.reviews.length) {
        await review.deleteMany({ _id: { $in: listingData.reviews } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;