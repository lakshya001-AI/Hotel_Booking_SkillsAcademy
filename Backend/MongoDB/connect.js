const mongoose = require("mongoose");

async function connectMongoose(){

    try {
        await mongoose.connect("");
    } catch (error) {
        
    }

}

module.exports = connectMongoose;