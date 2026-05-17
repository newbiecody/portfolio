<script lang="ts">
  interface Props {
    name?: string;
    subtitle?: string;
    cursorRadius?: number;
    baseOpacity?: number;
    waveStagger?: number;
  }

  let {
    name = 'Danson',
    subtitle = 'Software Engineer',
    cursorRadius = 200,
    baseOpacity = 0.25,
    waveStagger = 70,
  }: Props = $props();

  const nameChars = $derived(name.split(''));
  const subtitleChars = $derived(subtitle.split(''));

  let nameRefs: HTMLSpanElement[] = $state([]);
  let subtitleRefs: HTMLSpanElement[] = $state([]);

  let stage: HTMLElement;
  let mouseX = $state(-Infinity);
  let mouseY = $state(-Infinity);
  let waveActive = $state(true);
  let prefersReducedMotion = $state(false);

  $effect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mq.matches;
    const handler = (e: MediaQueryListEvent) => (prefersReducedMotion = e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  $effect(() => {
    if (prefersReducedMotion) {
      waveActive = false;
      return;
    }

    const allChars = [...nameRefs, ...subtitleRefs].filter(Boolean);
    if (allChars.length === 0) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    allChars.forEach((el, i) => {
      const start = i * waveStagger;
      timeouts.push(
        setTimeout(() => {
          el.style.transition = 'opacity 0.3s ease-out';
          el.style.opacity = '1';
        }, start),
        setTimeout(() => {
          el.style.transition = 'opacity 0.6s ease-out';
          el.style.opacity = String(baseOpacity);
        }, start + 350),
        setTimeout(() => {
          el.style.transition = 'opacity 0.15s ease-out';
        }, start + 950),
      );
    });

    timeouts.push(
      setTimeout(() => {
        waveActive = false;
      }, allChars.length * waveStagger + 1000),
    );

    return () => timeouts.forEach(clearTimeout);
  });

  let rafId: number | null = null;

  function applyProximity() {
    if (waveActive || prefersReducedMotion) {
      rafId = null;
      return;
    }

    const allChars = [...nameRefs, ...subtitleRefs].filter(Boolean);
    for (const el of allChars) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX;
      const dy = cy - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / cursorRadius);
      const opacity = baseOpacity + proximity * (1 - baseOpacity);
      el.style.opacity = opacity.toFixed(3);
    }
    rafId = null;
  }

  function handleMouseMove(e: MouseEvent) {
    if (prefersReducedMotion) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (rafId === null) rafId = requestAnimationFrame(applyProximity);
  }

  function handleMouseLeave() {
    mouseX = -Infinity;
    mouseY = -Infinity;
    if (rafId === null) rafId = requestAnimationFrame(applyProximity);
  }
</script>

<section
  bind:this={stage}
  class="hero"
  role="banner"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
>
  <h1 class="name" aria-label={name}>
    {#each nameChars as char, i (i)}
      <span
        bind:this={nameRefs[i]}
        aria-hidden="true"
        style:opacity={prefersReducedMotion ? 1 : 0}
      >{char === ' ' ? ' ' : char}</span>
    {/each}
  </h1>

  <p class="subtitle" aria-label={subtitle}>
    {#each subtitleChars as char, i (i)}
      <span
        bind:this={subtitleRefs[i]}
        aria-hidden="true"
        style:opacity={prefersReducedMotion ? 1 : 0}
      >{char === ' ' ? ' ' : char}</span>
    {/each}
  </p>
</section>

<style>
  .hero {
    padding: 1rem 0 2rem;
  }

  .name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 9vw, 5.5rem);
    font-weight: 700;
    font-variation-settings: "opsz" 144;
    line-height: 1;
    letter-spacing: -0.03em;
    margin: 0;
  }

  .subtitle {
    font-family: var(--font-mono);
    font-size: clamp(0.85rem, 1.4vw, 0.95rem);
    margin: 0.75rem 0 0;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.7;
  }

  .name span,
  .subtitle span {
    display: inline-block;
    will-change: opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .name span,
    .subtitle span {
      opacity: 1 !important;
      transition: none !important;
    }
  }
</style>
