<script lang="ts">
  interface NavItem {
    id: string;
    label: string;
  }

  let { items }: { items: NavItem[] } = $props();

  let activeId = $state(items[0]?.id ?? "");

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });

  function handleClick(e: MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
</script>

<nav class="side-nav" aria-label="Section navigation">
  <ul>
    {#each items as item (item.id)}
      <li>
        <a
          href={`#${item.id}`}
          onclick={(e) => handleClick(e, item.id)}
          class:active={activeId === item.id}
        >
          <span class="dash" aria-hidden="true"></span>
          <span class="label">{item.label}</span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .side-nav {
    position: fixed;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    z-index: 10;
    display: none;
  }
  @media (min-width: 1100px) {
    .side-nav {
      display: block;
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
    opacity: 0.45;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    transition: opacity 0.2s ease, color 0.2s ease;
  }
  a:hover {
    opacity: 1;
    color: var(--accent);
  }
  a.active {
    opacity: 1;
    color: var(--accent);
  }
  .dash {
    display: inline-block;
    width: 1.5rem;
    height: 1px;
    background: currentColor;
    transition: width 0.2s ease;
  }
  a.active .dash,
  a:hover .dash {
    width: 2.5rem;
  }
</style>
