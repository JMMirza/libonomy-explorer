const express = require('express')
const router = express.Router()

const { node_info } = require('../templates/node_info.template')

router.get('/', node_info)

module.exports = router