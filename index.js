const express = require('express')
const app = express();
const socket = require("socket.io");
const Block = require('./model/block_info.model')
    // require('./utilis/db.connection')()

const port = process.env.PORT || 3000
const server = app.listen(port, function() {
    console.log(`Listening on port 3000`)
});
// asyncHook.enable()
// Socket setup
const io = socket(server);
io.on('connection', async(socket) => {
    console.log('socket connected on port 3000');
    // io.emit('latestBlock', latest_block[0])

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})
module.exports = io