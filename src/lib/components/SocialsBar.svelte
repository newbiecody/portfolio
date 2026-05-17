<script>
  import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
  import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
    {
      name: "Email",
      url: "mailto:dansonkang@gmail.com",
      icon: faEnvelope,
    },
  ];
</script>

<div class="socials-bar flex flex-wrap gap-x-5 gap-y-2 mt-2">
  {#each socials as { name, url, icon } (name)}
    <a class="social" href={url} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon {icon} />
      <span>{name}</span>
    </a>
  {/each}
</div>

<style>
  .social {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    text-decoration: none;
    color: inherit;
    opacity: 0.75;
    transition: opacity 0.2s ease, color 0.2s ease;
  }
  .social span {
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }
  .social:hover span {
    border-color: currentColor;
  }
  .social:hover {
    opacity: 1;
    color: var(--accent);
  }
</style>
