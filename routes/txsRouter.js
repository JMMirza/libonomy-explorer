const express = require('express')
const router = express.Router()

const { getTxsByHash, searchTxs } = require('../templates/transactions.template')

router.get('/:id', getTxsByHash)
router.get('/', searchTxs)

module.exports = router