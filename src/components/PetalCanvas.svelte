<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let petals: any[] = [];
  let raf: number | null = null;

  const PETAL_COLORS = [
    '#E65100', '#FF6F00', '#FF8F00', '#FFA726',
    '#FFB300', '#FFCA28',
    '#D32F2F', '#C62828',
  ];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn(n: number) {
    const W = canvas.width, H = canvas.height;
    for (let i = 0; i < n; i++) {
      petals.push({
        x: Math.random() * W,
        y: -15 - Math.random() * H * 0.4,
        vx: (Math.random() - 0.5) * 2,
        vy: 2.5 + Math.random() * 3.5,
        r: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.06,
        wobble: Math.random() * Math.PI * 2,
        wobbleV: 0.02 + Math.random() * 0.03,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        opacity: 0.8 + Math.random() * 0.2,
        w: 0.8 + Math.random() * 0.6,
      });
    }
    if (!raf) animate();
  }

  function drawPetal(p: any) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.opacity;
    const r = p.r, w = r * p.w;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.bezierCurveTo(w, -r * 0.5, w, r * 0.5, 0, r * 0.75);
    ctx.bezierCurveTo(-w, r * 0.5, -w, -r * 0.5, 0, -r);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = p.opacity * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, -r * 0.6);
    ctx.bezierCurveTo(w * 0.4, -r * 0.2, w * 0.3, r * 0.3, 0, r * 0.5);
    ctx.bezierCurveTo(-w * 0.3, r * 0.3, -w * 0.4, -r * 0.2, 0, -r * 0.6);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.wobble += p.wobbleV;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;
      p.rot += p.rotV;
      if (p.y > H * 0.75) p.opacity -= 0.012;
      if (p.y > H + 20 || p.opacity <= 0) { petals.splice(i, 1); continue; }
      drawPetal(p);
    }
    if (petals.length > 0) {
      raf = requestAnimationFrame(animate);
    } else {
      raf = null;
      ctx.clearRect(0, 0, W, H);
    }
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('spawn-petals', ((e: CustomEvent) => {
      spawn(e.detail?.count ?? 60);
    }) as EventListener);
  });
</script>

<canvas bind:this={canvas} style="position:fixed;inset:0;z-index:999;pointer-events:none;"></canvas>
