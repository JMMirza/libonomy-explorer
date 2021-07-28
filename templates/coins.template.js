const Coins = require('../model/supply_coins.model')
module.exports = {
    supplyCoin: async(req, res) => {
        try {
            const coin = await Coins.find().sort({ _id: -1 }).limit(1)
            console.log(coin[0].result[0].denom);
            if (coin.length > 0) {
                return res.status(200).send(coin[0])
            } else {
                return res.status(404).send('no data found')
            }
        } catch (ex) {
            res.send(500).send(ex.message)
        }
    },
    specificCoin: async(req, res) => {
        try {
            const coin = await Coins.find().sort({ _id: -1 }).limit(1)
            const arr = coin[0].result
            let amount = null
            arr.forEach(element => {
                if (req.params.coin === element.denom) {
                    return amount = element.amount

                } else {
                    return amount
                }
            });
            if (amount === null) {
                return res.status(404).send("no data found")
            } else {
                return res.status(200).send({
                    height: coin[0].height,
                    result: amount
                })
            }

        } catch (ex) {
            res.status(500).send(ex.message)
        }
    }
}