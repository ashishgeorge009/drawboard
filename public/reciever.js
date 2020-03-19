
const socket = io.connect('http://localhost:3000');
const d = document;

socket.on('colorchange', function(color){
    ctx.strokeStyle=color;
})

