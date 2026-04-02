<script lang="ts">
  import { darkMode, readerMode } from '../stores/app';

  let dark = $state(false);
  let reader = $state(false);
  let fontPanelOpen = $state(false);

  darkMode.subscribe((v) => { dark = v; });
  readerMode.subscribe((v) => { reader = v; });

  $effect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    // Update theme-color meta tags
    const lightMeta = document.querySelector('meta[name="theme-color"][media*="light"]');
    const darkMeta = document.querySelector('meta[name="theme-color"][media*="dark"]');
    const color = dark ? '#1A1210' : '#E65100';
    lightMeta?.setAttribute('content', color);
    darkMeta?.setAttribute('content', color);
  });

  $effect(() => {
    document.body.classList.toggle('reader', reader);
  });

  function toggleDark() {
    darkMode.update((v) => !v);
  }

  function toggleReader() {
    readerMode.update((v) => !v);
  }

  function toggleFont() {
    fontPanelOpen = !fontPanelOpen;
    window.dispatchEvent(new CustomEvent('font-panel-toggle', { detail: fontPanelOpen }));
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

<header class="toolbar" id="toolbar">
  <span class="tb-title">हनुमान चालीसा</span>
  <nav class="tb-actions">
    <button class="tb-btn" class:on={fontPanelOpen} onclick={toggleFont} aria-label="Font size">
      <svg viewBox="0 0 24 24"><path d="M4 7V4h16v3"/><path d="M12 4v16"/><path d="M8 20h8"/></svg>
    </button>
    <button class="tb-btn" class:on={reader} onclick={toggleReader} aria-label="Reader mode">
      <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    </button>
    <button class="tb-btn" class:on={dark} onclick={toggleDark} aria-label="Dark mode">
      <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    </button>
  </nav>
</header>

<!-- Reader exit button -->
<button class="reader-x" id="readerX" onclick={toggleReader} aria-label="Exit reader">
  <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</button>
