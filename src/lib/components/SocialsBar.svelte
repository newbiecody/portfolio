<script>
  import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { isDarkMode } from "../../state.svelte";
  const socials = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/danson-kang-30829078/",
      icon: faLinkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/newbiecody",
      icon: faGithub,
    },
  ];
</script>

<div class="flex space-x-4">
  {#each socials as { name, url, icon } (name)}
    <a href={url} target="_blank" rel="noopener noreferrer">
      <span class=" hover:underline tracking-[0.1em]">{name}</span>
      {#if $isDarkMode}
        <FontAwesomeIcon {icon} style="color: #f2eee2;" />
      {:else}
        <FontAwesomeIcon {icon} style="color: #1d3040;" />
      {/if}
    </a>
  {/each}
</div>
