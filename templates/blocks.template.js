const Block = require('../model/block_info.model')

module.exports = {
    blockByHeight: async(req, res) => {
        try {
            const block = await Block.findOne({ 'block_meta.header.height': req.params.height })
            if (block) {
                return res.status(200).send(block)
            } else {
                return res.status(404).send('no data found')
            }
        } catch (ex) {
            res.status(500).send(ex.message)
        }
    },
    latestBlock: async(req, res) => {
        try {
            const latestBlock = await Block.find().sort({ _id: -1 }).limit(1)
            if (latestBlock.length > 0) {
                return res.status(200).send(latestBlock[0])
            } else {
                return res.status(404).send("no data found")
            }
        } catch (ex) {
            res.status(500).send(ex.message)
        }
    }


}