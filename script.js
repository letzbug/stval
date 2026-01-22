const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const hearts = [];
for(let i=0;i<28;i++){
  hearts.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    s:Math.random()*8+6,
    v:Math.random()*0.4+0.2
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>{
    h.y -= h.v;
    if(h.y<-20) h.y = canvas.height+20;
    ctx.fillStyle="rgba(255,180,200,0.6)";
    ctx.beginPath();
    ctx.moveTo(h.x,h.y);
    ctx.arc(h.x-3,h.y-3,4,0,Math.PI,true);
    ctx.arc(h.x+3,h.y-3,4,0,Math.PI,true);
    ctx.lineTo(h.x,h.y+5);
    ctx.closePath();
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();

