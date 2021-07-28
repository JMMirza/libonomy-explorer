const express = require('express')
const router = express.Router()

const { supplyCoin, specificCoin } = require('../templates/coins.template')
const { getBlock } = require('../templates/blocks.template')
const { node_info } = require('../templates/node_info.template')
const { getTxsByHash, searchTxs } = require('../templates/transactions.template')

router.get('/supply/total', supplyCoin)
router.get('/supply/total/:coin', specificCoin)
router.get('/blocks/:id', getBlock)
router.get('/node_info', node_info)
router.get('/txs/:id', getTxsByHash)
router.get('/txs', searchTxs)

module.exports = router