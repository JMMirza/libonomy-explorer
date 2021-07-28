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
        if (Object.keys(req.query).length === 0) {
            return res.send("empty")
        } else {
            let total_count = null
            Transaction.estimatedDocumentCount({}, function(err, result) {
                if (err) {
                    console.log(err)
                } else {
                    total_count = result
                }

            })
            const data = await Transaction.find().sort({ _id: 1 }).limit(30)
            console.log(req.query, total_count);
            res.send(data)
        }
    }
}