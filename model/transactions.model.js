const mongoose = require('mongoose')
let io
setTimeout(() => {
    io = require('../index')
}, 10);

const signature_schema = new mongoose.Schema({
    "pub_key": {
        'type': { type: String },
        "value": String
    },
    "signature": String
})

const amount_schema = new mongoose.Schema({
    "denom": String,
    "amount": String
})

const msg_schema = new mongoose.Schema({
    'type': { type: String },
    "value": {
        "from_address": String,
        "to_address": String,
        "amount": [amount_schema]
    }
})

const attributes_schema = new mongoose.Schema({
    "key": String,
    "value": String
})

const event_schema = new mongoose.Schema({
    'type': { type: String },
    "attributes": [attributes_schema]
})

const log_schema = new mongoose.Schema({
    "msg_index": Number,
    "success": Boolean,
    "log": String,
    "events": [event_schema]
})
const transaction = new mongoose.Schema({
    "height": String,
    "txhash": { type: String, unique: true },
    "raw_log": String,
    "logs": [log_schema],
    "gas_wanted": String,
    "gas_used": String,
    "tx": {
        'type': { type: String },
        "value": {
            "msg": [msg_schema],
            "fee": {
                "amount": [amount_schema],
                "gas": String
            },
            "signatures": [signature_schema],
            "memo": String
        }
    },
    "timestamp": Date,
    "events": [{
        'type': { type: String },
        "attributes": [attributes_schema]
    }]
})

transaction.post('save', (txs) => {
    // console.log(typeof(txs));
    io.emit('latestTxs', txs)
})

const Transaction = mongoose.model('Transaction', transaction)

module.exports = Transaction