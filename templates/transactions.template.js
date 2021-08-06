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
            let andArray = []
            let sender = []
            let reciever = []
            let filterData = []
            const limit = req.query.limit === undefined ? 30 : Number(req.query.limit)
            const page = req.query.page === undefined ? 1 : Number(req.query.page)
            if (req.query['address'] !== undefined) {
                andArray.push({
                    $or: [
                        { 'tx.value.msg.value.from_address': req.query['address'] },
                        { 'tx.value.msg.value.to_address': req.query['address'] }
                    ]
                })
                if (req.query['coin'] !== undefined) {
                    andArray.push({ 'tx.value.msg.value.amount.denom': req.query['coin'] })
                }
            } else {
                return res.status(500).send({ error: "must declare address to search" })
            }
            if (andArray.length !== 0) {
                filterData = await Transaction.find({ $and: andArray })
                    .limit(limit)
                    .skip((page - 1) * limit)
                const page_total = Math.ceil(filterData.length / limit)
                if (req.query['type'] !== undefined) {
                    filterData.forEach(element => {
                        if (element.tx.value.msg[0].value.from_address === req.query['address']) {
                            sender.push(element)
                        } else if (element.tx.value.msg[0].value.to_address === req.query['address']) {
                            reciever.push(element)
                        } else {
                            console.log("no data");
                        }
                    })
                    if (req.query['type'] === 'reciever') {
                        return res.status(200).send({ total_count: reciever.length, page_total: page_total, limit: limit, page_number: page, count: reciever.length, tx: reciever })
                    } else if (req.query['type'] === 'sender') {
                        return res.status(200).send({ total_count: sender.length, page_total: page_total, limit: limit, page_number: page, count: sender.length, tx: sender })
                    } else {
                        res.status(404).send("type is not correct")
                    }
                } else {
                    return res.status(200).send({ total_count: filterData.length, page_total: page_total, limit: limit, page_number: page, count: filterData.length, tx: filterData })
                }
            } else {
                return res.status(200).send({ total_count: filterData.length, page_total: page_total, limit: limit, page_number: page, count: filterData.length, tx: filterData })
            }
        } catch (error) {
            res.status(500).send(error.message)

        }

    }
}