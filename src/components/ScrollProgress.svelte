<script lang="ts">
  import { onMount } from 'svelte';

  let width = $state('0%');
  let showTop = $state(false);

  onMount(() => {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          width = docH > 0 ? ((scrollY / docH) * 100) + '%' : '0%';
          showTop = scrollY > 500;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="progress-track">
  <div class="progress-bar" style:width></div>
</div>

<button class="go-top" class:show={showTop} onclick={scrollToTop} aria-label="Scroll to top">
  <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
</button>
