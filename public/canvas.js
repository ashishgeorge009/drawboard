let isMouseDown = false;
let undoStack=[]
let redoStack=[]
board.addEventListener("mousedown", function (e) {

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY-board.getBoundingClientRect().y);
    let x= e.clientX
    let y= e.clientY-board.getBoundingClientRect().y
    let point={
        x:x,
        y:y,
        color: ctx.strokeStyle,
        width:ctx.lineWidth,
        type:"start"
    }
    undoStack.push(point);

    isMouseDown = true
})

board.addEventListener("mousemove", function (e) {
    if (isMouseDown == true) {
        console.log(ctx);
        ctx.lineTo(e.clientX, e.clientY-board.getBoundingClientRect().y);
        ctx.stroke();//drawing the line
        let x= e.clientX
        let y= e.clientY-board.getBoundingClientRect().y
        let point={
            x:x,
            y:y,
            color: ctx.strokeStyle,
            width:ctx.lineWidth,
            type:"end"
        }
        undoStack.push(point)
        
    }
})
board.addEventListener("mouseup", function (e) {
    isMouseDown = false;
    ctx.closePath();
})

var undobutton = document.getElementById('undo-stroke')
undobutton.addEventListener("mousedown",function(e){
    let myfunc=function(){
     //making it a function
    let rpoint = undoStack.pop() //rpoin is the pop
    redoStack.push(rpoint)// pushing into redostack
    drawagain();
    }
    interval = setInterval(function()
                            {myfunc();},50) //calling setinterval to run myfunc at interval of 50ms....and also naming it interval

    
})

undobutton.addEventListener("mouseup",function(){
    clearInterval(interval);
})


function drawagain(){
    ctx.clearRect(0, 0, board.width, board.height)
    for(let i =0;i<undoStack.length;i++)
    {
        if(undoStack[i].type=="start")
        {
            ctx.beginPath();
            ctx.moveTo(undoStack[i].x,undoStack[i].y)
            ctx.lineWidth=undoStack[i].width;
            ctx.strokeStyle=undoStack[i].color;
        }
        else if(undoStack[i].type=="end")
        {
            ctx.lineTo(undoStack[i].x,undoStack[i].y)
            ctx.stroke();
        }
        
    }
}

var redobutton = document.getElementById("redo-stroke")
redobutton.addEventListener('mousedown',function(e){
    let myfunc=function(){
        ctx.clearRect(0, 0, board.width, board.height) //making it a function
        undoStack.push(redoStack.pop()) //rpoin is the pop
         drawagain();
        }
        interval = setInterval(function()
                                {myfunc();},50)
    
})

redobutton.addEventListener('mouseup',function(){
    clearInterval(interval);
})

var zoomin = document.getElementById("zoom-in");
var zoomout = document.getElementById("zoom-out");
zoomin.addEventListener("click",function(e){
    ctx.scale(2,2);
    drawagain();
    //console.log("xoomin")//zoomout sunction
})
zoomout.addEventListener("click",function(e)
{
    ctx.clearRect(0, 0, board.width, board.height)
    ctx.scale(0.1,0.1)
    drawagain();
})


