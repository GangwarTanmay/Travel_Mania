const mongoose = require('mongoose');

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
});

const newsLetter = mongoose.model('newsLetter', newsLetterSchema);
module.exports = newsLetter;