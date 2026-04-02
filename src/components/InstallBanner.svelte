<script lang="ts">
  let show = $state(false);
  let deferredPrompt: any = null;

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      show = true;
    });
  }

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    show = false;
  }

  function dismiss() { show = false; }
</script>

<div class="install-bar" class:show>
  <div class="ib-text"><strong>Install App</strong>Read offline anytime</div>
  <button class="ib-btn" onclick={install}>Install</button>
  <button class="ib-x" onclick={dismiss}>&times;</button>
</div>
