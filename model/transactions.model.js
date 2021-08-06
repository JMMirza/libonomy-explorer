const mongoose = require('mongoose')
let io = require('../index')

const transaction = new mongoose.Schema({
    "height": String,
    "txhash": { type: String, unique: true },
    "raw_log": String,
    "logs": [{
        "msg_index": Number,
        "success": Boolean,
        "log": String,
        "events": [{
            'type': { type: String },
            "attributes": [{
                "key": String,
                "value": String
            }]
        }]
    }],
    "gas_wanted": String,
    "code": Number,
    "gas_used": String,
    "tx": {
        'type': { type: String },
        "value": {
            "msg": [{
                'type': { type: String },
                "value": {
                    "from_address": String,
                    "to_address": String,
                    "amount": [{
                        "denom": String,
                        "amount": String
                    }]
                }
            }],
            "fee": {
                "amount": [{
                    "denom": String,
                    "amount": String
                }],
                "gas": String
            },
            "signatures": [{
                "pub_key": {
                    'type': { type: String },
                    "value": String
                },
                "signature": String
            }],
            "memo": String
        }
    },
    "timestamp": Date,
    "events": [{
        'type': { type: String },
        "attributes": [{
            "key": String,
            "value": String
        }]
    }]
})

transaction.post('insertMany', (txs) => {
    io.emit('latestTxs', txs)
})
const Transaction = mongoose.model('Transaction', transaction)

module.exports = Transaction