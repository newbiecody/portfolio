<script lang="ts">
  interface Props {
    text: string;
    level?: 2 | 3 | 4;
    waveStagger?: number;
    repeat?: boolean;
  }

  let {
    text,
    level = 2,
    waveStagger = 35,
    repeat = false,
  }: Props = $props();

  const chars = $derived(text.split(''));

  let refs: HTMLSpanElement[] = $state([]);
  let container: HTMLElement;
  let prefersReducedMotion = $state(false);
  let hasRevealed = $state(false);

  $effect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mq.matches;
    const handler = (e: MediaQueryListEvent) => (prefersReducedMotion = e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  $effect(() => {
    if (!container) return;
    if (prefersReducedMotion) {
      refs.forEach((el) => el && (el.style.opacity = '1'));
      hasRevealed = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!hasRevealed || repeat) reveal();
            if (!repeat) observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  });

  let timeouts: ReturnType<typeof setTimeout>[] = [];

  function reveal() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
    hasRevealed = true;

    refs.forEach((el, i) => {
      if (!el) return;
      const start = i * waveStagger;
      timeouts.push(
        setTimeout(() => {
          el.style.transition = 'opacity 0.25s ease-out';
          el.style.opacity = '1';
        }, start),
      );
    });
  }
</script>

<svelte:element
  this={`h${level}`}
  bind:this={container}
  class="section-header"
  aria-label={text}
>
  {#each chars as char, i (i)}
    <span
      bind:this={refs[i]}
      aria-hidden="true"
      style:opacity={prefersReducedMotion ? 1 : 0}
    >{char === ' ' ? ' ' : char}</span>
  {/each}
</svelte:element>

<style>
  .section-header {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin: 0 0 0.5rem;
  }

  .section-header span {
    display: inline-block;
    will-change: opacity;
  }

  @media (prefers-reduced-motion: reduce) {
    .section-header span {
      opacity: 1 !important;
      transition: none !important;
    }
  }
</style>
