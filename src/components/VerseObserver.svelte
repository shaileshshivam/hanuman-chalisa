<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('vis');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.v').forEach((v) => obs.observe(v));
    return () => obs.disconnect();
  });
</script>
