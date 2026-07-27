<script lang="ts">
  import { faLink } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { base } from "$app/paths";

  interface ShowcaseItem {
    name: string;
    desc: string;
    stack: string;
    url: string;
    previewImageSrc?: string;
    previewVideoSrc?: string;
    alt?: string;
    caseStudyHref?: string;
  }

  const showcaseDetails: ShowcaseItem[] = [
    {
      name: "Flatlas — Singapore HDB Resale Map",
      desc: "An interactive analytics map of every Singapore HDB resale transaction since 1990 — roughly a million sales across ten thousand blocks. A three-tier zoom blends town choropleth → block dots → 3D buildings extruded from their real footprints; a time slider replays 35 years of prices in real (CPI-adjusted) or nominal dollars. A hedonic pricing model (test R² 0.94) explains why each flat is priced the way it is, and the map flips between resale and rental markets. Live at flatlas.sg.",
      stack: "Go · PostGIS · Martin vector tiles · React · MapLibre GL · DuckDB · Docker",
      url: "https://flatlas.sg",
      caseStudyHref: `${base}/flatlas`,
      previewVideoSrc: `${base}/images/flatlas.mp4`,
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
      previewVideoSrc: `${base}/images/hello-again.mp4`,
      alt: "Hello Again merchant portal",
    },
  ];
</script>

<div>
  {#each showcaseDetails as { name, desc, stack, previewImageSrc, previewVideoSrc, url, alt, caseStudyHref } (name)}
    <div class="showcase-item py-container-2 mb-6">
      <a class="title" href={url} target="_blank" rel="noopener noreferrer">
        <span>{name}</span>
        <FontAwesomeIcon icon={faLink} class="link-icon" />
      </a>
      <div class="stack">{stack}</div>
      <div class="opacity-70 text-sm mt-2 leading-relaxed">
        {desc}
        {#if caseStudyHref}
          <a class="case-study" href={caseStudyHref}>Read the case study →</a>
        {/if}
      </div>
      {#if previewVideoSrc}
        <div class="preview mt-3">
          <video src={previewVideoSrc} autoplay loop muted playsinline aria-label={alt ?? name}></video>
        </div>
      {:else if previewImageSrc}
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
  .case-study {
    color: var(--accent);
    text-decoration: none;
    white-space: nowrap;
  }
  .case-study:hover {
    text-decoration: underline;
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
  .preview img,
  .preview video {
    display: block;
    width: 100%;
    transition: transform 0.4s ease;
  }
  .preview:hover img,
  .preview:hover video {
    transform: scale(1.02);
  }
</style>
