const express = require('express')
const app = express()

const coinRouter = require('./routes/coinRouter')
const blockRouter = require('./routes/blockRouter')
const nodeRouter = require('./routes/nodeRouter')
const txsRouter = require('./routes/txsRouter')

app.use('/supply', coinRouter)
app.use('/blocks', blockRouter)
app.use('/node_info', nodeRouter)
app.use('/txs', txsRouter)

module.exports = app