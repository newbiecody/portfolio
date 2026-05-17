<script lang="ts">
  import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { isDarkMode } from "../../../state.svelte";

  let {
    icon = undefined,
    buttonText = "",
    buttonAction,
  }: {
    icon?: IconDefinition;
    buttonText?: string;
    buttonAction: () => void;
  } = $props();
</script>

<button
  class:dark-mode={$isDarkMode}
  class="theme-btn rounded-xl px-4 py-1 h-fit"
  type="button"
  onclick={buttonAction}
>
  {#if icon}
    <FontAwesomeIcon {icon} />
  {/if}
  {#if buttonText}
    {buttonText}
  {/if}
</button>

<style>
  .theme-btn {
    border: 1px solid var(--border);
    background: transparent;
    color: inherit;
    transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  }
  .theme-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
    background-color: var(--accent-soft);
  }
</style>
