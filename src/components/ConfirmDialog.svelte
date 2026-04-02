<script lang="ts">
  import { onMount } from 'svelte';
  import { malaCount } from '../stores/app';

  let show = $state(false);

  onMount(() => {
    window.addEventListener('show-reset-confirm', () => { show = true; });
  });

  function cancel() { show = false; }

  function confirm() {
    malaCount.set(0);
    show = false;
  }

  function onOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) cancel();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="confirm-overlay" class:on={show} onclick={onOverlayClick}>
  <div class="confirm-card">
    <div class="confirm-icon">
      <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    </div>
    <p class="confirm-msg">गणना रीसेट करें?</p>
    <p class="confirm-sub">Reset reading count</p>
    <p class="confirm-detail">Your count will be set to 0.<br>यह क्रिया पूर्ववत नहीं की जा सकती।</p>
    <div class="confirm-divider"></div>
    <div class="confirm-actions">
      <button class="confirm-cancel" onclick={cancel}>रद्द करें</button>
      <button class="confirm-yes" onclick={confirm}>रीसेट</button>
    </div>
  </div>
</div>
