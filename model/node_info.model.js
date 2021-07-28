const mongoose = require('mongoose')


const nodeInfo = new mongoose.Schema({
    "node_info": {
        "protocol_version": {
            "p2p": String,
            "block": String,
            "app": { type: String, default: "0" }

        },
        "listen_addr": String,
        "network": String,
        "version": String,
        "channels": String,
        "moniker": String,
        "other": {
            "tx_index": String,
            "rpc_address": String
        }
    },
    "application_version": {
        "name": String,
        "server_name": String,
        "client_name": String,
        "version": String,
        "commit": String,
        "build_tags": String,
        "go": String
    }
})


const Node_Info = mongoose.model("Node_Info", nodeInfo)

module.exports = Node_Info