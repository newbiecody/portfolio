<script lang="ts">
  import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
  import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

  const channels = [
    { label: "dansonkang@gmail.com", url: "mailto:dansonkang@gmail.com", icon: faEnvelope },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/danson-kang-30829078/", icon: faLinkedin },
    { label: "GitHub", url: "https://github.com/newbiecody", icon: faGithub },
  ];
</script>

<div class="contact-wrap">
  <p class="lede">
    Open to interesting backend, full-stack, and platform problems.
    Quickest way to reach me:
  </p>
  <ul class="channels">
    {#each channels as { label, url, icon } (label)}
      <li>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon {icon} />
          <span>{label}</span>
          <FontAwesomeIcon icon={faArrowRight} class="arrow" />
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .contact-wrap {
    margin-top: 0.5rem;
  }
  .lede {
    opacity: 0.7;
    margin: 0 0 1rem;
  }
  .channels {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .channels a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    margin: 0 -0.75rem;
    border: 1px solid transparent;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }
  .channels a :global(.arrow) {
    margin-left: auto;
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .channels a:hover {
    color: var(--accent);
    border-color: var(--border);
    background-color: var(--accent-soft);
  }
  .channels a:hover :global(.arrow) {
    opacity: 1;
    transform: translateX(0);
  }
</style>
