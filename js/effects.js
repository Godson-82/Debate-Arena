/* ─── FIREFLIES ─── */
(function() {
  const canvas = document.getElementById('fireflies');
  const ctx = canvas.getContext('2d');
  let W, H, flies = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 48; i++) {
    flies.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.006,
      color: Math.random() > 0.5 ? [200,120,14] : [86,168,106]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    flies.forEach(f => {
      f.life += f.speed;
      f.x += f.vx + Math.sin(f.life * 0.7) * 0.25;
      f.y += f.vy + Math.cos(f.life * 0.5) * 0.25;
      if (f.x < 0) f.x = W; if (f.x > W) f.x = 0;
      if (f.y < 0) f.y = H; if (f.y > H) f.y = 0;
      const alpha = (Math.sin(f.life) * 0.5 + 0.5) * 0.65 + 0.1;
      const [r,g,b] = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.7})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();