// ===== Floating hearts (canvas) =====
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const hearts = [];
const HEARTS = 26;

function rand(min,max){ return Math.random()*(max-min)+min; }

for(let i=0;i<HEARTS;i++){
  hearts.push({
    x: rand(0, window.innerWidth),
    y: rand(0, window.innerHeight),
    s: rand(7, 14),
    vy: rand(0.25, 0.65),
    vx: rand(-0.15, 0.15),
    a: rand(0.12, 0.28)
  });
}

function drawHeart(x,y,size,alpha){
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x,y);
  ctx.scale(size/28, size/28);

  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-12, -6, -24, 6, -10, 20);
  ctx.bezierCurveTo(-2, 30, 0, 28, 0, 28);
  ctx.bezierCurveTo(0, 28, 2, 30, 10, 20);
  ctx.bezierCurveTo(24, 6, 12, -6, 0, 8);
  ctx.closePath();

  ctx.fillStyle = "rgba(255, 190, 210, 0.85)";
  ctx.fill();

  ctx.restore();
}

function tick(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(const p of hearts){
    p.y -= p.vy;
    p.x += p.vx + Math.sin(p.y/120)*0.12;

    if(p.y < -40) p.y = canvas.height + rand(20, 160);
    if(p.x < -60) p.x = canvas.width + 60;
    if(p.x > canvas.width + 60) p.x = -60;

    drawHeart(p.x, p.y, p.s, p.a);
  }

  requestAnimationFrame(tick);
}
tick();

// ===== Auto-fit card into iframe height (NO CROP) =====
function fitCard(){
  const card = document.getElementById("card");
  if(!card) return;

  // Reset scale to measure natural size
  card.style.transform = "scale(1)";

  const vh = window.innerHeight;
  const padding = 28; // matches CSS calc(100vh - 28px)
  const available = Math.max(320, vh - padding);

  const rect = card.getBoundingClientRect();
  const natural = rect.height;

  if(natural <= available){
    card.style.transform = "scale(1)";
    return;
  }

  // scale down but not too small
  const scale = Math.max(0.82, Math.min(1, available / natural));
  card.style.transform = `scale(${scale})`;
}

window.addEventListener("load", fitCard);
window.addEventListener("resize", fitCard);
setTimeout(fitCard, 200);
setTimeout(fitCard, 800);

