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
  class="rounded-xl px-4 py-1 border-2 border-solid border-[#1d3040] hover:opacity-70 h-fit"
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
