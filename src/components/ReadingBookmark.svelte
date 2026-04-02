<script lang="ts">
  import { onMount } from 'svelte';

  let show = $state(false);
  let savedIndex = $state(-1);
  let dismissed = false;

  onMount(() => {
    // Read saved position
    const stored = localStorage.getItem('hc-verse');
    savedIndex = stored !== null ? parseInt(stored, 10) : -1;

    // Show toast if user was past verse 3
    if (savedIndex > 3) {
      // Small delay so splash screen clears first
      setTimeout(() => { show = true; }, 1800);
      // Auto-dismiss after 5s
      setTimeout(() => { if (!dismissed) dismiss(); }, 7000);
    }

    // Track current verse on scroll (debounced)
    let scrollTimer: ReturnType<typeof setTimeout>;
    const trackScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const verses = document.querySelectorAll('.v[data-verse]');
        const viewportCenter = window.innerHeight / 2;
        let closest = -1;
        let closestDist = Infinity;

        verses.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = parseInt(el.getAttribute('data-verse') || '-1', 10);
          }
        });

        if (closest >= 0) {
          localStorage.setItem('hc-verse', String(closest));
        }
      }, 300);
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Dismiss if user scrolls manually
    const userScrollDismiss = () => {
      if (show && !dismissed) dismiss();
    };
    setTimeout(() => {
      window.addEventListener('scroll', userScrollDismiss, { passive: true, once: true });
    }, 2000);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      clearTimeout(scrollTimer);
    };
  });

  function scrollToVerse() {
    dismissed = true;
    show = false;
    const el = document.querySelector(`.v[data-verse="${savedIndex}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function dismiss() {
    dismissed = true;
    show = false;
  }
</script>

{#if show}
<button class="bookmark-toast" onclick={scrollToVerse}>
  <span class="bookmark-text">
    <span class="bookmark-hi">पिछली बार से जारी रखें</span>
    <span class="bookmark-en">Continue where you left off</span>
  </span>
  <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>
</button>
{/if}

<style>
  .bookmark-toast {
    position: fixed;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    left: 50%;
    transform: translateX(-50%) translateY(0);
    z-index: 95;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px 12px 16px;
    border-radius: 60px;
    border: 1.5px solid var(--card-border);
    background: var(--card);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    animation: toastSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    transition: opacity 0.3s, transform 0.3s;
    font-family: 'Outfit', sans-serif;
    white-space: nowrap;
  }

  .bookmark-toast:active {
    transform: translateX(-50%) scale(0.96);
  }

  .bookmark-text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .bookmark-hi {
    font-family: 'Tiro Devanagari Hindi', serif;
    font-size: 13px;
    color: var(--text);
    line-height: 1.3;
  }

  .bookmark-en {
    font-size: 11px;
    color: var(--text2);
    letter-spacing: 0.3px;
  }

  .bookmark-toast svg {
    width: 16px;
    height: 16px;
    stroke: var(--accent);
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }

  @keyframes toastSlideUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
</style>
