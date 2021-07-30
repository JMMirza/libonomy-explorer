const express = require('express')
const socket = require("socket.io");
const app = express();
require('./utilis/db.connection')()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
    // routes

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
app.use('/', require('./app'));
require('./cron_jobs/cronjobs')()