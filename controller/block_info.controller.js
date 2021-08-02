const axios = require('axios')
const Block = require('../model/block_info.model')

let height = 0
let occupied = false
let response = null
let dataArr = []

function loop(height) {
    axios.get(`http://18.206.253.182:1300/blocks/${height}`)
        .then(function(res) {
            return res.data
        })
        .catch(function(error) {
            console.log("loop func");
            return error.message
        })
}
module.exports = async function blockInfo() {
    const latest_block = await Block.find().sort({ _id: -1 }).limit(1)
    if (latest_block.length !== 0) {
        height = Number(latest_block[0].block_meta.header.height) + 1
    } else {
        height = 1
    }
    if (occupied === true) {
        response = "waiting for previous job to complete(block)"
    } else {
        occupied = true
        for (let index = 0; index < 3; index++) {
            console.log(index, height);
            const data = loop(height)
            console.log(data);
            dataArr.push(data)
            height++
        }
        const dataHeight = dataArr.map(element => element.block_meta.header.height)
        const dupBlock = await Block.find({ 'block_meta.header.height': { $in: dataHeight } })
        if (dupBlock.length !== 0 || dataArr.length === 0) {
            response = "block cannot inserted"
            dataArr.splice(0, 10)
            occupied = false
        } else {
            await Block.insertMany(dataArr)
            dataArr.splice(0, 10)
            response = "blocks inserted"
            occupied = false
        }
    }
    return { message: response, height: height }
}