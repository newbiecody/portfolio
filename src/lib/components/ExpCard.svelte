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
    skills,
  }: IExperience = $props();
</script>

<div class="padded-container-3 space-y-1">
  {#if !!startDate}
    <div
      class="text-sm text-nowrap w-48 md:relative md:top-[2px] opacity-50"
    >
      <span>{startDate}</span>
      {#if !!endDate}
        <span>to {endDate}</span>
      {:else}
        <span>- Present</span>
      {/if}
    </div>
  {/if}

  <div class="md:w-128">
    {#if !!title}
      <div class="text-sm">{title} - {company}, {location}</div>
    {/if}
    <div class=" opacity-70">{roleDesc}</div>
    <div class="flex space-x-2 mt-2">
      {#each skills as skill}
        <Badge text={skill} />
      {/each}
    </div>
  </div>
</div>
