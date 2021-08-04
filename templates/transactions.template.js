const Transaction = require('../model/transactions.model')
module.exports = {
    getTxsByHash: async(req, res) => {
        try {
            console.log(req.query, req.params);
            const txs = await Transaction.findOne({ 'txhash': req.params.id })
            if (txs) {
                return res.status(200).send(txs)
            } else {
                return res.status(404).send('no tx found')
            }
        } catch (ex) {
            res.status(500).send(ex.message)
        }
    },
    searchTxs: async(req, res) => {
        try {

        } catch (error) {

        }
    }
}