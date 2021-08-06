const express = require('express')
const router = express.Router()

const { blockByHeight, latestBlock } = require('../templates/blocks.template')

router.get('/latest', latestBlock)
router.get('/:height', blockByHeight)

module.exports = router