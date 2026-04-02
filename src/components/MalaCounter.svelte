<script lang="ts">
  import { malaCount } from '../stores/app';

  const BEADS = 27;
  let count = $state(0);
  let pop = $state(false);

  malaCount.subscribe((v) => { count = v; });

  function getBeadSvg() {
    const cx = 110, cy = 110, r = 90;
    let s = `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--bead-empty)" stroke-width="1" opacity="0.5"/>`;
    const filled = count % BEADS;
    const allDone = count > 0 && filled === 0;
    for (let i = 0; i < BEADS; i++) {
      const a = (i / BEADS) * 2 * Math.PI - Math.PI / 2;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      const on = allDone || i < filled;
      s += `<circle cx="${x}" cy="${y}" r="${on ? 7 : 5.5}" fill="${on ? 'var(--bead-done)' : 'var(--bead-empty)'}" opacity="${on ? 1 : 0.6}" style="transition:all .3s ease"/>`;
    }
    s += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-size="30" fill="var(--accent)" opacity="0.2" font-family="serif">ॐ</text>`;
    s += `</svg>`;
    return s;
  }

  function markComplete() {
    if (navigator.vibrate) navigator.vibrate(10);
    malaCount.update((v) => v + 1);
    pop = true;
    setTimeout(() => { pop = false; }, 350);

    // Petal shower
    window.dispatchEvent(new CustomEvent('spawn-petals', { detail: { count: 60 } }));

    // Celebration milestones
    const newCount = count + 1;
    if ([1, 7, 11, 21, 51, 101].includes(newCount) || newCount % 108 === 0) {
      window.dispatchEvent(new CustomEvent('celebrate', {
        detail: { count: newCount, major: newCount >= 108 }
      }));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('spawn-petals', { detail: { count: 40 } }));
      }, 500);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetCounter() {
    window.dispatchEvent(new CustomEvent('show-reset-confirm'));
  }

  async function share() {
    const data = { title: 'श्री हनुमान चालीसा', text: 'Read Hanuman Chalisa beautifully', url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch {}
    } else {
      await navigator.clipboard.writeText(location.href);
    }
  }
</script>

<section class="mala" id="mala">
  <p class="mala-head">पाठ गणना · Reading Counter</p>
  <div class="bead-ring">{@html getBeadSvg()}</div>
  <div class="mala-num" class:pop>{count}</div>
  <p class="mala-sub">times completed</p>
  <button class="done-btn" onclick={markComplete}>
    <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    पाठ पूर्ण · Mark Complete
  </button>
  <div class="mala-footer">
    <button class="rst-btn" onclick={resetCounter}>
      <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      Reset
    </button>
    <button class="share-btn" onclick={share}>
      <svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      Share
    </button>
  </div>
</section>
