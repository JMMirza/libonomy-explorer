const axios = require('axios')
const Transaction = require('../model/transactions.model')
let height = 0;
let occupied = false
let response = null

module.exports = async function transaction() {
    const latest_txs = await Transaction.findOne().sort({ _id: -1 })
    if (Object.keys(latest_txs).length !== 0) {
        height = Number(latest_txs.height)
    } else {
        height = 1
    }
    if (occupied === true) {
        response = "waiting for previous job to complete(txs)"
    } else {
        occupied = true
        axios.get(`http://18.206.253.182:1300/txs?tx.minheight=${height}`)
            .then(async function(res) {
                const data = res.data
                if (Object.keys(data.txs).length === 0 || data.txs[1] === undefined) {
                    occupied = false
                    response = "No transaction data to insert"
                    console.log({ message: response, height: height });
                } else {
                    let arr = data.txs
                    const firstTx = await Transaction.find({ 'txhash': arr[0].txhash })
                    if (firstTx.length !== 0) {
                        arr.splice(0, 1)
                    }
                    let txHash = arr.map(element => element.txhash)
                    let dupTxs = await Transaction.find({ 'txhash': { $in: txHash } })
                    if (dupTxs.length !== 0) {
                        response = "transaction cannot inserted"
                        console.log({ message: response, height: height });
                    } else {
                        await Transaction.insertMany(arr)
                        response = "transaction added"
                        console.log({ message: response, height: height });
                    }
                }
            })
            .catch(function(error) {
                response = error.message;
                console.log({ message: response, height: height });
            })
        occupied = false
    }
    return
}