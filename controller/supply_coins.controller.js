const axios = require('axios')
const Coins = require('../model/supply_coins.model')
let response = null
let height = 0
let occupied = false

module.exports = async function supply_coins() {
    if (occupied === true) {
        response = "waiting for previous job to complete"
    } else {
        occupied = true
        axios.get('http://18.206.253.182:1300/supply/total')
            .then(async function(res) {
                const data = res.data

                const coin = await Coins.findOne({ 'height': data.height })
                if (coin) {
                    occupied = false
                    response = "no new coin to insert"
                    height = data.height
                } else {
                    await Coins.create(data)
                    occupied = false
                    response = 'coin inserted'
                    height = data.height
                }
            })
            .catch(function(error) {
                response = error.message
            })
    }
    return { message: response, height: height }
}