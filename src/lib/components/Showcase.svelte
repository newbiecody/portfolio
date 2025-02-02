<script lang="ts">
  import { faLink } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  const showcaseDetails = [
    {
      name: "Weather Application (MVP)",
      desc: "A quick MVP done in 2 days. - written in React",
      // previewImageSrc: "/images/weather-app.gif",
      previewImageSrc: "https://github.com/newbiecody/portfolio/blob/main/static/images/weather-app.gif?raw=true",
      url: "https://github.com/newbiecody/weather-app",
      alt: "Responsive weather app MVP",
    },
    {
      name: "hello again",
      desc: "An online shop selling photo frames - written (WIP) in Next.js",
      // previewImageSrc: "/images/hello-again.gif",
      previewImageSrc: "https://raw.githubusercontent.com/newbiecody/portfolio/refs/heads/main/static/images/hello-again.gif",
      url: "https://github.com/newbiecody/Hello-Again-React/tree/main",
      alt: "hello again",
    },
  ];
</script>

<div>
  {#each showcaseDetails as { name, desc, previewImageSrc, url, alt } (name)}
    <div class="py-container-2">
      <div class="hover:underline">
        <a href={url} target="_blank" rel="noopener norefferer"
          >{name} <span><FontAwesomeIcon icon={faLink} /></span></a
        >
      </div>
      <div class="italic opacity-70 text-sm">{desc}</div>
      <div>
        <img src={previewImageSrc} {alt} class="rounded-xl" />
      </div>
    </div>
  {/each}
</div>
