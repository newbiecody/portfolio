<script lang="ts">
  import { isDarkMode } from "../../state.svelte";
  let { text }: { text: string } = $props();
</script>

<div
  class:dark-mode={$isDarkMode}
  class="badge flex justify-center items-center rounded-2xl py-0.5 px-2 text-sm"
>
  {text}
</div>

<style>
  .badge {
    background-color: #1d3040;
    color: #f2eee2;
    border: 1px solid transparent;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    cursor: default;
  }
  .badge:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
    box-shadow: 0 4px 14px -6px var(--accent-soft);
  }
  .badge.dark-mode {
    background-color: #f2eee2;
    color: #1d3040;
  }
</style>
