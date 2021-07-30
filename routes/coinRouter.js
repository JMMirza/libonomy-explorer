const express = require('express')
const router = express.Router()

const { supplyCoin, specificCoin } = require('../templates/coins.template')
router.get('/total', supplyCoin)
router.get('/total/:coin', specificCoin)

module.exports = router