<script>
  import "../app.css";
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
  import Button from "$lib/components/buttons/Button.svelte";
  import { isDarkMode } from "../state.svelte";

  function toggleColorMode() {
    isDarkMode.set(!$isDarkMode);
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<div class="theme-toggle">
  {#if $isDarkMode}
    <Button icon={faMoon} buttonAction={toggleColorMode} />
  {:else}
    <Button icon={faSun} buttonAction={toggleColorMode} />
  {/if}
</div>

<slot />

<style>
  /* Lives here, not on the home page: a scoped :global(body) rule only applies
     while that component is mounted, so a direct load of any other route left
     the body unpainted — black-on-black in a dark-scheme browser. */
  :global(body) {
    background-color: var(--bg);
    color: var(--fg);
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  .theme-toggle {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
  }
</style>
