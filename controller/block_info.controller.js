const axios = require('axios')
const Block = require('../model/block_info.model')

let height = 1
let occupied = false
let response = null
let data = null

module.exports = async function blockInfo() {
    const latest_block = await Block.find().sort({ _id: -1 }).limit(1)
    if (latest_block.length !== 0) {
        height = Number(latest_block[0].block_meta.header.height) + 1

    } else {
        height = 1
    }
    if (occupied === true) {
        // console.log(old_height);
        response = "Wait!!! block is sent to the database"
    } else {
        occupied = true
        axios.get(`http://18.206.253.182:1300/blocks/${height}`)
            .then(async function(res) {
                data = res.data
                const block = await Block.findOne({ 'block_meta.header.height': data.block_meta.header.height })
                if (block !== null) {
                    response = "block cannot send"
                    occupied = false
                } else {
                    await Block.create(data)
                    console.log(occupied);
                    occupied = false
                    response = 'block inserted'
                }
            })
            .catch(function(error) {
                response = error.message
            })
    }
    return { message: response, height: height }
}