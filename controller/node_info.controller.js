const axios = require('axios')
const Node_Info = require('../model/node_info.model')
let response = null

module.exports = async function node_info() {
    axios.get('http://18.206.253.182:1300/node_info')
        .then(async function(res) {
            const data = res.data
            const node = await Node_Info.findOne({ 'application_version.commit': data.application_version.commit })
            if (node === null) {
                await Node_Info.create(data)
                response = "node inserted"
            } else {
                response = "node information already exist"
            }
        })
        .catch(function(error) {
            response = error.message
        })
    return { message: response }
}