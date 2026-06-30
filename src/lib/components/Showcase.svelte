<script lang="ts">
  import { faLink } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  interface ShowcaseItem {
    name: string;
    desc: string;
    stack: string;
    url: string;
    previewImageSrc?: string;
    alt?: string;
  }

  const showcaseDetails: ShowcaseItem[] = [
    {
      name: "Flatlas — Singapore HDB Resale Map",
      desc: "An interactive analytics map of every Singapore HDB resale transaction since 1990. A three-tier zoom blends town choropleth → individual block dots → 3D blocks, with a real/nominal (inflation-adjusted) price toggle and a per-block hedonic model that explains why each block is priced the way it is. Live at flatlas.sg.",
      stack: "Go · PostGIS · Martin vector tiles · React · MapLibre GL · Docker",
      url: "https://flatlas.sg",
      previewImageSrc:
        "https://raw.githubusercontent.com/newbiecody/portfolio/refs/heads/main/static/images/flatlas.png",
      alt: "Flatlas Singapore HDB resale price map",
    },
    {
      name: "Audio Transcriber",
      desc: "A web app that transcribes uploaded audio files using OpenAI's whisper-tiny model. Async processing via Redis queues and Docker containers keeps the UI responsive while transcription runs in the background — the kind of architecture you'd reach for if this were a real product.",
      stack: "React · FastAPI · Redis · Docker · Whisper",
      url: "https://github.com/newbiecody/transcriber-app",
    },
    {
      name: "Hello Again — Merchant Portal",
      desc: "A merchant portal for managing inventory, employees, and business analytics. Built as an excuse to go end-to-end on a stack I don't use at work — frontend in Vue 3, backend in Spring Boot with JWT auth, admin dashboard layered on top.",
      stack: "Vue 3 · Spring Boot · JWT · PostgreSQL",
      url: "https://github.com/newbiecody/Hello-Again-React",
      previewImageSrc:
        "https://raw.githubusercontent.com/newbiecody/portfolio/refs/heads/main/static/images/hello-again.gif",
      alt: "Hello Again merchant portal",
    },
  ];
</script>

<div>
  {#each showcaseDetails as { name, desc, stack, previewImageSrc, url, alt } (name)}
    <div class="showcase-item py-container-2 mb-6">
      <a class="title" href={url} target="_blank" rel="noopener noreferrer">
        <span>{name}</span>
        <FontAwesomeIcon icon={faLink} class="link-icon" />
      </a>
      <div class="stack">{stack}</div>
      <div class="opacity-70 text-sm mt-2 leading-relaxed">{desc}</div>
      {#if previewImageSrc}
        <div class="preview mt-3">
          <img src={previewImageSrc} alt={alt ?? name} />
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .showcase-item {
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  }
  .showcase-item:last-child {
    border-bottom: none;
  }
  .title {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }
  .title :global(.link-icon) {
    font-size: 0.75em;
    opacity: 0.5;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .title:hover {
    color: var(--accent);
  }
  .title:hover :global(.link-icon) {
    opacity: 1;
    transform: translate(2px, -2px);
  }
  .stack {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    opacity: 0.55;
    margin-top: 0.35rem;
    text-transform: uppercase;
  }
  .preview {
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid var(--border);
  }
  .preview img {
    display: block;
    width: 100%;
    transition: transform 0.4s ease;
  }
  .preview:hover img {
    transform: scale(1.02);
  }
</style>
