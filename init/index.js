// This file is going to intitialize the database by saving the
// data from init.js to database

const mongoose = require('mongoose');
const initData = require('./data.js');
const listing = require('../models/listing.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelMania');
}

main().then(res => {
    console.log("Connection successfull...");
}).catch(err => {
    console.log("Connection failed");
});

function intitialize() {
    //first we will clean the database

    listing.deleteMany({}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

    //now initialize the database
    listing.insertMany(initData.data).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

intitialize();
