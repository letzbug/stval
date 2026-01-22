// Hearts canvas (romantic floating particles)
(function () {
  const canvas = document.getElementById("hearts");
  const ctx = canvas.getContext("2d");

  let w = 0, h = 0, dpr = 1;
  const hearts = [];
  const MAX = 42;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function heartPath(x, y, s, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(s, s);
    ctx.beginPath();
    // Simple heart curve
    ctx.moveTo(0, 0.35);
    ctx.bezierCurveTo(-0.5, -0.15, -0.9, 0.35, -0.5, 0.75);
    ctx.bezierCurveTo(-0.1, 1.1, 0, 1.0, 0, 1.0);
    ctx.bezierCurveTo(0, 1.0, 0.1, 1.1, 0.5, 0.75);
    ctx.bezierCurveTo(0.9, 0.35, 0.5, -0.15, 0, 0.35);
    ctx.closePath();
    ctx.restore();
  }

  function spawn() {
    return {
      x: rand(0, w),
      y: rand(h * 0.25, h),
      vy: rand(0.25, 0.85),
      vx: rand(-0.25, 0.25),
      s: rand(10, 22),
      rot: rand(-0.6, 0.6),
      vr: rand(-0.006, 0.006),
      a: rand(0.10, 0.26),
      hue: rand(330, 360), // pink/red tones
      sat: rand(55, 75),
      light: rand(60, 72)
    };
  }

  function ensureCount() {
    while (hearts.length < MAX) hearts.push(spawn());
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ensureCount();

    for (let i = 0; i < hearts.length; i++) {
      const p = hearts[i];
      p.y -= p.vy;
      p.x += p.vx + Math.sin((p.y / 120)) * 0.15;
      p.rot += p.vr;

      if (p.y < -40 || p.x < -60 || p.x > w + 60) {
        hearts[i] = spawn();
        hearts[i].y = h + rand(20, 120);
      }

      ctx.save();
      ctx.globalAlpha = p.a;

      const fill = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${p.a})`;
      const stroke = `hsla(${p.hue}, ${p.sat}%, ${Math.max(30, p.light - 18)}%, ${p.a})`;

      heartPath(p.x, p.y, p.s / 28, p.rot);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = stroke;
      ctx.stroke();

      ctx.restore();
    }

    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  tick();
})();

// Copy romantic message
(function () {
  const btn = document.getElementById("copyMsg");
  const fine = document.getElementById("fineText");

  const messages = [
    "Pour toi, pour nous, pour un moment magique.",
    "Je t’offre un souvenir à vivre… avec tout mon cœur.",
    "Un moment UniPop, rien que pour toi. Bonne Saint-Valentin ❤",
    "Parce que les plus beaux cadeaux… se vivent."
  ];

  function pick() {
    return messages[Math.floor(Math.random() * messages.length)];
  }

  btn.addEventListener("click", async () => {
    const msg = pick();
    try {
      await navigator.clipboard.writeText(msg);
      fine.innerHTML = `Message copié : <em>“${msg}”</em>`;
    } catch {
      // Fallback: select text
      fine.textContent = msg;
    }
  });
})();
