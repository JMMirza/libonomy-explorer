const mongoose = require('mongoose')

const pri_commits = new mongoose.Schema({
    'type': { type: Number },
    "height": String,
    "round": String,
    "block_id": {
        "hash": String,
        "parts": {
            "total": String,
            "hash": String
        }
    },
    "timestamp": Date,
    "validator_address": String,
    "validator_index": String,
    "signature": String
})

const block = new mongoose.Schema({
    "block_meta": {
        "block_id": {
            "hash": String,
            "parts": {
                "total": String,
                "hash": String
            }
        },
        "header": {
            "version": {
                "block": String,
                "app": String
            },
            "chain_id": String,
            "height": { type: String, unique: true },
            "time": Date,
            "num_txs": String,
            "total_txs": String,
            "last_block_id": {
                "hash": String,
                "parts": {
                    "total": String,
                    "hash": String
                }
            },
            "last_commit_hash": String,
            "data_hash": String,
            "validators_hash": String,
            "next_validators_hash": String,
            "consensus_hash": String,
            "app_hash": String,
            "last_results_hash": String,
            "evidence_hash": String,
            "proposer_address": String
        }
    },
    "block": {
        "header": {
            "version": {
                "block": String,
                "app": String
            },
            "chain_id": String,
            "height": String,
            "time": Date,
            "num_txs": String,
            "total_txs": String,
            "last_block_id": {
                "hash": String,
                "parts": {
                    "total": String,
                    "hash": String
                }
            },
            "last_commit_hash": String,
            "data_hash": String,
            "validators_hash": String,
            "next_validators_hash": String,
            "consensus_hash": String,
            "app_hash": String,
            "last_results_hash": String,
            "evidence_hash": String,
            "proposer_address": String
        },
        "data": {
            "txs": { type: Array, default: null }
        },
        "evidence": {
            "evidence": { type: Array, default: null }
        },
        "last_commit": {
            "block_id": {
                "hash": String,
                "parts": {
                    "total": String,
                    "hash": String
                }
            },
            "precommits": [pri_commits]
        }
    }
})

const Block = mongoose.model('Block', block)

module.exports = Block