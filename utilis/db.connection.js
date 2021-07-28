const mongoose = require('mongoose')
require('dotenv').config()
module.exports = function() {
    mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => console.log("connection established"))
        .catch(err => console.error("connection cannot established", err.message))
}