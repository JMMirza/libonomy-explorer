const cron = require('node-cron')
const blockInfo = require('../controller/block_info.controller')
const supply_coins = require('../controller/supply_coins.controller')
const node_info = require('../controller/node_info.controller')
const transaction = require('../controller/transactions.controller')

module.exports = function cronJobs() {
    cron.schedule('*/1 * * * * *', async() => {
        await blockInfo()
    })
    cron.schedule('*/1 * * * * *', async() => {
        await supply_coins()
    })
    cron.schedule('*/1 * * * * *', async() => {
        await node_info()
    })
    cron.schedule('*/1 * * * * *', async() => {
        await transaction()
    })
}