<script lang="ts">
  import type { IExperience } from "../../constants";
  import Badge from "./Badge.svelte";

  let {
    title,
    company,
    location,
    startDate,
    endDate,
    roleDesc,
    achievements,
    skills,
  }: IExperience = $props();
</script>

<div class="exp-card padded-container-3 space-y-1">
  {#if !!startDate}
    <div
      class="font-mono text-xs text-nowrap w-48 md:relative md:top-[2px] opacity-50 uppercase tracking-wider"
    >
      <span>{startDate}</span>
      {#if !!endDate}
        <span>— {endDate}</span>
      {:else}
        <span>— Present</span>
      {/if}
    </div>
  {/if}

  <div class="md:w-128">
    {#if !!title}
      <div class="text-sm">
        <span class="font-semibold">{title}</span>
        <span class="opacity-60">— {company}, {location}</span>
      </div>
    {/if}
    <div class="opacity-70">{roleDesc}</div>
    {#if achievements && achievements.length > 0}
      <ul class="list-disc pl-5 mt-2 space-y-1 opacity-70 text-sm">
        {#each achievements as achievement}
          <li>{achievement}</li>
        {/each}
      </ul>
    {/if}
    <div class="flex flex-wrap gap-2 mt-3">
      {#each skills as skill}
        <Badge text={skill} />
      {/each}
    </div>
  </div>
</div>

<style>
  .exp-card {
    border-radius: 8px;
    border: 1px solid transparent;
    margin: 0 -12px;
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }
  .exp-card:hover {
    background-color: var(--card-hover);
    border-color: var(--border);
  }
</style>
