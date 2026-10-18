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
      desc: "An interactive map of every Singapore HDB resale since 1990 — roughly a million sales across ten thousand blocks. Zoom from ranked town choropleths to block dots to 3D buildings coloured floor by floor, and switch the map between price, $/m², lease, rent, rental yield and 5-year growth, in real or nominal dollars. Click any block for its price history and a hedonic model's verdict (test R² 0.94) on whether it sits above or below its likely value. Live at flatlas.sg.",
      stack: "Go · PostGIS · Martin vector tiles · React · MapLibre GL · DuckDB · Docker",
      url: "https://flatlas.sg",
      caseStudyHref: `${base}/flatlas`,
      previewVideoSrc: `${base}/images/flatlas.mp4`,
      alt: "Flatlas Singapore HDB resale price map",
    },
    {
      name: "Parking Arrival Prediction — Singapore",
      desc: "Every parking app here shows the lots free right now, which is fiction after a 30-minute drive. This one logs every public carpark feed in Singapore every five minutes and predicts whether a lot will still be there when you arrive, served as a Telegram bot. Each carpark is backtested walk-forward and has to clear an accuracy bar before it is allowed to answer — the ones that can't say \"not enough signal\" instead of guessing.",
      stack: "TypeScript · Node · Postgres · grammY · Docker · GitHub Actions",
      url: "https://t.me/sgcarparkpredict_bot",
      caseStudyHref: `${base}/carpark`,
    },
    {
      name: "Hello Again — Merchant Portal",
      desc: "A merchant portal for managing inventory, employees, and business analytics. Built as an excuse to go end-to-end on a stack I don't use at work — frontend in Vue 3, backend in Spring Boot with JWT auth, admin dashboard layered on top.",
      stack: "Vue 3 · Spring Boot · JWT · PostgreSQL",
      url: "https://github.com/newbiecody/Hello-Again-React",
      previewVideoSrc: `${base}/images/hello-again.mp4`,
      alt: "Hello Again merchant portal",
    },
    {
      name: "Audio Transcriber",
      desc: "A web app that transcribes uploaded audio files using OpenAI's whisper-tiny model. Async processing via Redis queues and Docker containers keeps the UI responsive while transcription runs in the background — the kind of architecture you'd reach for if this were a real product.",
      stack: "React · FastAPI · Redis · Docker · Whisper",
      url: "https://github.com/newbiecody/transcriber-app",
    },
  ];
</script>

<div class="grid-cards">
  {#each showcaseDetails as { name, desc, stack, previewImageSrc, previewVideoSrc, url, alt, caseStudyHref } (name)}
    <div class="showcase-item">
      <div class="preview">
        {#if previewVideoSrc}
          <video src={previewVideoSrc} autoplay loop muted playsinline aria-label={alt ?? name}></video>
        {:else if previewImageSrc}
          <img src={previewImageSrc} alt={alt ?? name} />
        {:else}
          <div class="placeholder" aria-hidden="true">{name.split(" — ")[0]}</div>
        {/if}
      </div>
      <div class="text">
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
      </div>
    </div>
  {/each}
</div>

<style>
  .grid-cards {
    display: grid;
    gap: 2.5rem 2rem;
  }
  @media (min-width: 900px) {
    .grid-cards {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .showcase-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    text-align: center;
    color: var(--accent);
    background: var(--accent-soft);
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
    aspect-ratio: 12 / 7;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid var(--border);
  }
  .preview img,
  .preview video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.4s ease;
  }
  .preview:hover img,
  .preview:hover video {
    transform: scale(1.02);
  }
</style>
