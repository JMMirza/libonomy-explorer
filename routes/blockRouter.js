const express = require('express')
const router = express.Router()

const { blockByHeight, latestBlock } = require('../templates/blocks.template')

router.get('/:height', blockByHeight)
router.get('/latest', latestBlock)

module.exports = router