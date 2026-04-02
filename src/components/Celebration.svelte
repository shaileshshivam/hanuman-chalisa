<script lang="ts">
  import { onMount } from 'svelte';

  let show = $state(false);
  let count = $state(0);
  let isMajor = $state(false);

  onMount(() => {
    window.addEventListener('celebrate', ((e: CustomEvent) => {
      count = e.detail.count;
      isMajor = e.detail.major;
      show = true;
    }) as EventListener);
  });

  function close() {
    show = false;
  }

  function onOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) close();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="celeb" class:on={show} onclick={onOverlayClick}>
  <div class="celeb-card">
    {#if !isMajor}
    <svg class="celeb-lotus" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFB75E"/><stop offset="100%" stop-color="#ED8F03"/></linearGradient>
        <linearGradient id="clLotus" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#E65C00"/><stop offset="100%" stop-color="#FF9933"/></linearGradient>
      </defs>
      <circle cx="256" cy="256" r="140" fill="url(#clGlow)" opacity="0.1"/><circle cx="256" cy="256" r="100" fill="url(#clGlow)" opacity="0.2"/>
      <path d="M256 70l4 20 20 4-20 4-4 20-4-20-20-4 20-4z" fill="#FFB75E"/>
      <path d="M130 180l4 15 15 4-15 4-4 15-4-15-15-4 15-4z" fill="#FFB75E" opacity="0.7"/>
      <path d="M382 180l4 15 15 4-15 4-4 15-4-15-15-4 15-4z" fill="#FFB75E" opacity="0.7"/>
      <g stroke="#FFF" stroke-width="3">
        <path d="M256 150C200 230 190 300 200 350 210 380 240 380 256 380Z" fill="url(#clGlow)"/>
        <path d="M256 150C312 230 322 300 312 350 302 380 272 380 256 380Z" fill="url(#clGlow)"/>
        <line x1="256" y1="155" x2="256" y2="375" stroke="#FFF" stroke-width="4" stroke-linecap="round"/>
      </g>
      <path d="M256 360C230 410 235 440 256 460 277 440 282 410 256 360Z" fill="url(#clLotus)"/>
      <path d="M245 385C195 395 170 420 160 440 190 450 220 430 240 410Z" fill="url(#clLotus)" opacity="0.9"/>
      <path d="M230 405C150 415 120 440 110 450 150 460 190 440 220 420Z" fill="url(#clLotus)" opacity="0.7"/>
      <path d="M267 385C317 395 342 420 352 440 322 450 292 430 272 410Z" fill="url(#clLotus)" opacity="0.9"/>
      <path d="M282 405C362 415 392 440 402 450 362 460 322 440 292 420Z" fill="url(#clLotus)" opacity="0.7"/>
    </svg>
    {:else}
    <svg class="celeb-trophy" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ctBg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFFDF7"/><stop offset="35%" stop-color="#FFECB3"/><stop offset="75%" stop-color="#FFB300"/><stop offset="100%" stop-color="#E65100"/></radialGradient>
        <linearGradient id="ctLotus" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#C62828"/><stop offset="50%" stop-color="#E65100"/><stop offset="100%" stop-color="#FFCA28"/></linearGradient>
        <linearGradient id="ctGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFE082"/><stop offset="50%" stop-color="#FFB300"/><stop offset="100%" stop-color="#F57C00"/></linearGradient>
      </defs>
      <g stroke="#FFF" stroke-width="2" opacity="0.3" stroke-linecap="round">
        <line x1="256" y1="256" x2="256" y2="40"/><line x1="256" y1="256" x2="256" y2="472"/>
        <line x1="256" y1="256" x2="40" y2="256"/><line x1="256" y1="256" x2="472" y2="256"/>
        <line x1="256" y1="256" x2="103" y2="103"/><line x1="256" y1="256" x2="409" y2="409"/>
        <line x1="256" y1="256" x2="103" y2="409"/><line x1="256" y1="256" x2="409" y2="103"/>
      </g>
      <circle cx="256" cy="256" r="200" fill="none" stroke="url(#ctGold)" stroke-width="3" opacity="0.6"/>
      <circle cx="256" cy="256" r="215" fill="none" stroke="#C62828" stroke-width="8" stroke-dasharray="0 25.2" stroke-linecap="round" opacity="0.8"/>
      <circle cx="256" cy="256" r="215" fill="none" stroke="url(#ctGold)" stroke-width="4" stroke-dasharray="0 25.2" stroke-linecap="round"/>
      <circle cx="256" cy="256" r="160" fill="none" stroke="#FFF" stroke-width="1.5" opacity="0.5"/>
      <g fill="url(#ctLotus)" opacity="0.85">
        <path d="M256 96C220 156 230 186 256 206 282 186 292 156 256 96Z"/>
        <path d="M256 416C220 356 230 326 256 306 282 326 292 356 256 416Z"/>
        <path d="M96 256C156 220 186 230 206 256 186 282 156 292 96 256Z"/>
        <path d="M416 256C356 220 326 230 306 256 326 282 356 292 416 256Z"/>
        <path d="M143 143C185 185 206 190 220 220 190 206 185 185 143 143Z"/>
        <path d="M369 369C327 327 306 322 292 292 322 306 327 327 369 369Z"/>
        <path d="M143 369C185 327 206 322 220 292 190 306 185 327 143 369Z"/>
        <path d="M369 143C327 185 306 190 292 220 322 206 327 185 369 143Z"/>
      </g>
      <circle cx="256" cy="256" r="70" fill="#FFF" opacity="0.95"/><circle cx="256" cy="256" r="55" fill="url(#ctBg)"/>
      <path d="M256 200C240 235 230 256 244 274 254 286 270 280 266 266 260 252 258 225 256 200Z" fill="#E65100"/>
      <path d="M256 220C248 242 242 256 250 268 256 276 264 272 262 264 258 254 257 236 256 220Z" fill="#FFCA28"/>
      <path d="M230 285C230 295 240 300 256 300 272 300 282 295 282 285L275 280 237 280Z" fill="url(#ctGold)"/>
      <circle cx="256" cy="315" r="4" fill="#C62828"/>
    </svg>
    {/if}
    <p class="celeb-heading">जय श्री राम!</p>
    <p class="celeb-sub">Jai Shri Ram</p>
    <div class="celeb-count">{count}</div>
    <p class="celeb-count-label">times completed</p>
    <p class="celeb-msg">You've completed reading<br>Hanuman Chalisa. May Bajrangbali<br>bless you with strength & wisdom.</p>
    <div class="celeb-divider"></div>
    <button class="celeb-close" onclick={close}>जय बजरंगबली</button>
  </div>
</div>
