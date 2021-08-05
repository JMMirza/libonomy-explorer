const axios = require('axios')
const Block = require('../model/block_info.model')

let height = 0
let latest_height = 0
let occupied = false
let compareHeight = 0
let sumHeight = 0

module.exports = async function blockInfo() {
    if (occupied === true) {
        response = "waiting for previous job to complete(block)"
        console.log({ message: response, height: height })
    } else {
        let dataArr = []
        let promiseArr = []
        occupied = true
        try {
            const latestBlock = await axios.get('http://18.206.253.182:1300/blocks/latest')
            compareHeight = Number(latestBlock.data.block_meta.header.height)
        } catch (error) {
            console.log(error.message);
        }

        if (latest_height === 0) {
            const latest_block = await Block.findOne().sort({ _id: -1 })
            latest_block !== null ? height = Number(latest_block.block_meta.header.height) + 1 : height = 1
        } else {
            height = latest_height + 1
        }
        if (compareHeight === height) {
            console.log({ message: "block already inserted", height: height });
            occupied = false
        } else {
            if (compareHeight - height >= 160) {
                sumHeight = 160
            } else {
                sumHeight = compareHeight - height
            }
            for (let index = height; index < (height + sumHeight); index++) {
                const res = axios.get(`http://18.206.253.182:1300/blocks/${index}`)
                promiseArr.push(res)
            }
            (await Promise.all(promiseArr)).map(element => {
                dataArr.push(element.data)
            })
            try {
                await Block.insertMany(dataArr)
                response = "blocks inserted"
                if (dataArr.length !== 0) { latest_height = parseInt(dataArr[dataArr.length - 1].block_meta.header.height) }
                occupied = false
                console.log({ message: response, height: height })
            } catch (ex) {
                response = ex.message
                occupied = false
                console.log({ message: response, height: height })
            }
        }

    }
}