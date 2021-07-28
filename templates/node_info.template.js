const Node_Info = require('../model/node_info.model')
module.exports = {
    node_info: async(req, res) => {
        try {
            const node_info = await Node_Info.find().sort({ _id: -1 }).limit(1)
            if (node_info.length > 0) {
                return res.status(200).send(node_info[0])
            } else {
                return res.status(404).send('no data found')
            }
        } catch (ex) {
            res.status(500).send(ex.message)
        }
    }
}