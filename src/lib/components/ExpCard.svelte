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

<div class="exp-card">
  {#if !!startDate}
    <div class="dates font-mono">
      <span>{startDate}</span>
      {#if !!endDate}
        <span>— {endDate}</span>
      {:else}
        <span>— Present</span>
      {/if}
    </div>
  {/if}

  <div class="body">
    {#if !!title}
      <div class="text-sm">
        <span class="font-semibold">{title}</span>
        <span class="opacity-60">— {company}, {location}</span>
      </div>
    {/if}
    <div class="opacity-70 mt-1">{roleDesc}</div>
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
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border);
    transition: background-color 0.2s ease;
  }
  .exp-card:last-child {
    border-bottom: none;
  }
  .exp-card:hover {
    background-color: var(--card-hover);
  }
  .dates {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.5;
    margin-bottom: 0.35rem;
  }
  .body {
    width: 100%;
  }
</style>
