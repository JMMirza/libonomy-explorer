const mongoose = require('mongoose')

const coin_type = new mongoose.Schema({
    "denom": String,
    "amount": String
})

const coins = new mongoose.Schema({
    "height": { type: String, unique: true },
    "result": [coin_type]
})

const Coins = mongoose.model('Coins', coins)
module.exports = Coins