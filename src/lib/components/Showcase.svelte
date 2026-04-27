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
    <div class="py-container-2 mb-6">
      <div class="hover:underline">
        <a href={url} target="_blank" rel="noopener noreferrer"
          >{name} <span><FontAwesomeIcon icon={faLink} /></span></a
        >
      </div>
      <div class="italic opacity-50 text-xs mt-1">{stack}</div>
      <div class="opacity-70 text-sm mt-2">{desc}</div>
      {#if previewImageSrc}
        <div class="mt-3">
          <img src={previewImageSrc} alt={alt ?? name} class="rounded-xl" />
        </div>
      {/if}
    </div>
  {/each}
</div>
