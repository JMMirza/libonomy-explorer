const express = require('express')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const EventEmitter = require('events')
    // routes
app.use('/', require('./routes/routes.js'));

const socket = require("socket.io");
require('./utilis/db.connection')()

const port = process.env.PORT || 3000
const server = app.listen(port, function() {
    console.log(`Listening on port 3000`)
});
const io = socket(server);
io.on('connection', async(socket) => {
    console.log('socket connected on port 3000');

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})

module.exports = io