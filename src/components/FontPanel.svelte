<script lang="ts">
  import { onMount } from 'svelte';
  import { fontSize } from '../stores/app';

  let size = $state(22);
  let open = $state(false);

  fontSize.subscribe((v) => { size = v; });

  onMount(() => {
    // Apply initial font size
    document.documentElement.style.setProperty('--font-size', size + 'px');

    const handler = (e: Event) => {
      open = (e as CustomEvent).detail;
    };
    window.addEventListener('font-panel-toggle', handler);

    // Close on outside click
    const clickHandler = (e: MouseEvent) => {
      if (open && !(e.target as Element)?.closest('.font-panel') && !(e.target as Element)?.closest('#btnFont, .tb-btn')) {
        open = false;
        window.dispatchEvent(new CustomEvent('font-panel-toggle', { detail: false }));
      }
    };
    document.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('font-panel-toggle', handler);
      document.removeEventListener('click', clickHandler);
    };
  });

  function onInput(e: Event) {
    const val = +(e.target as HTMLInputElement).value;
    fontSize.set(val);
    document.documentElement.style.setProperty('--font-size', val + 'px');
  }
</script>

<div class="font-panel" class:open>
  <div class="fp-label">Text Size</div>
  <div class="fp-row">
    <span>अ</span>
    <input type="range" min="16" max="36" value={size} oninput={onInput} aria-label="Text size">
    <span>अ</span>
  </div>
</div>
