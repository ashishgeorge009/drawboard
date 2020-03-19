const express = require('express');
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static("public"));
io.on('connection',function(socket){
    console.log(socket.id)
    socket.on('oncolor',function(color){
        console.log(color)
        socket.broadcast.emit('colorchange',color)

    });
});

const port = process.env.port||3000

 server.listen(port,function(req,res){
     console.log("Server has started 3000")
    })