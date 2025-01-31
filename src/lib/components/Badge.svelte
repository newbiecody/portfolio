<script lang="ts">
  import { isDarkMode } from "../../state.svelte";
  let { text }: { text: string } = $props();
</script>

<div
  class:dark-mode={$isDarkMode}
  class="flex justify-center items-center rounded-2xl bg-[#1d3040] text-[#f2eee2] py-0.5 px-2 text-sm"
>
  {text}
</div>

<style>
  .dark-mode {
    background-color: #f2eee2;
    color: #1d3040;
  }
</style>
