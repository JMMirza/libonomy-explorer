const axios = require('axios')
const Node_Info = require('../model/node_info.model')
let response = null
let occupied = false

module.exports = async function node_info() {
    if (occupied === true) {
        response = "waiting for previous job to complete"
    } else {
        occupied = true
        axios.get('http://18.206.253.182:1300/node_info')
            .then(async function(res) {
                const data = res.data
                const node = await Node_Info.findOne({ 'application_version.commit': data.application_version.commit })
                if (node === null) {
                    await Node_Info.create(data)
                    occupied = false
                    response = "node inserted"
                } else {
                    occupied = false
                    response = "node information already exist"
                }
            })
            .catch(function(error) {
                response = error.message
            })
    }
    return { message: response }
}