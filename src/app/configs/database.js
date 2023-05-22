const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {

    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { 
        console.log("DB CONNECTED!");
    })
    .catch(err => {
        console.log(err);
        console.log("DB NOT CONNECTED!");
    });

};