/*

this app proposes two ways to draw. one by drawing circles at every point detected by onmousemove event, another one by drawing a line between the actual  point and the last one.
comment lines 64 and 73 and uncomment precedent lines to try both.

*/

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')


let isDrawing = false;
let x=0;
let y=0;

addEventListener('load', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})



function drawLine(x1, y1, x2, y2) {
  // using a line between actual point and the last one solves the problem
  // if you make very fast circles, you will see polygons.
  // we could make arcs instead of lines to smooth the angles and solve the problem
  c.beginPath();
  c.strokeStyle = 'black';
  c.lineWidth = 1;
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  c.closePath();
}

function drawCircleAtCursor(x,y,canvas, event) {
  // Problem with draw circle is the refresh rate of the mousevent.
  // if you move too fast, circles are not connected.
  // this is browser dependant, and can't be modified.
    c.beginPath()
    c.arc(x, y, 10/2, 0, Math.PI * 2)
    c.closePath()

    c.lineWidth = 2
    c.strokeStyle = "#000"
    c.stroke()

    c.fillStyle = "#000"
    c.fill()
}

canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    isDrawing=true

})

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    drawLine(x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    drawLine(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})


function to_image(){
  var canvas  = document.getElementById("canvas");
  var dataUrl = canvas.toDataURL();
  var win = window.open();
  win.document.write('<h1 style=text-align:center>Voici votre dessin</h1><div><iframe src="' + dataUrl  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe></div>');
}
