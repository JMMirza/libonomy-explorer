require('./utilis/db.connection')()
const cron = require('node-cron')
const blockInfo = require('./controller/block_info.controller')
const supply_coins = require('./controller/supply_coins.controller')
const node_info = require('./controller/node_info.controller')
const transaction = require('./controller/transactions.controller')

let block, coin, node, txs
cron.schedule('*/1 * * * * *', async() => {
    block = await blockInfo()
    console.log(block);
})
cron.schedule('*/1 * * * * *', async() => {
    coin = await supply_coins()
    console.log(coin);
})
cron.schedule('*/1 * * * * *', async() => {
    node = await node_info()
    console.log(node);
})
cron.schedule('*/1 * * * * *', async() => {
    txs = await transaction()
    console.log(txs);
})