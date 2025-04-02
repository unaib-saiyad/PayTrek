const mongoose = require("mongoose");

const connectToMongo = async ()=>{
    mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectToMongo;