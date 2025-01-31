<script lang="ts">
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
  import Button from "$lib/components/buttons/Button.svelte";
  import { isDarkMode } from "../state.svelte";
  import ExpCard from "$lib/components/ExpCard.svelte";
  import { experiences } from "../constants";
  import SocialsBar from "$lib/components/SocialsBar.svelte";
  import Showcase from "$lib/components/Showcase.svelte";

  function toggleColorMode() {
    isDarkMode.set(!$isDarkMode);
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<div class="justify-center w-full p-4">
  <div class="flex justify-end">
    {#if isDarkMode}
      <Button icon={faMoon} buttonAction={toggleColorMode} />
    {:else}
      <Button icon={faSun} buttonAction={toggleColorMode} />
    {/if}
  </div>
  <div class="flex justify-center">
    <div class="flex flex-col space-y-8 w-[36rem]">
      <div class="relative mb-8">
        <div class="mb-8">
          <div class="flex justify-between align-center">
            <div class="logo">Danson</div>
          </div>
          <div class="subtitle tracking-[0.1em] opacity-70">
            Full-Stack Developer
          </div>
          <SocialsBar />
        </div>
        <div>
          <div class="font-extrabold text-lg">About me</div>
          <div class="opacity-70 w-96">
            I am a software engineer with a passion for building things which are
            useful and enjoyable to use.<br /> Always learning, always growing, always
            building.
          </div>
        </div>
      </div>
      <div>
        <div class="relative font-extrabold text-lg">Work experiences</div>
        {#each experiences as experience: experiences.company}
          <div class="mb-8">
            <ExpCard {...experience} />
          </div>
        {/each}
      </div>
      <div>
        <div class="relative font-extrabold text-lg">Showcase</div>
        <Showcase />
      </div>
    </div>

  </div>
</div>

<style>
  :global(body) {
    background-color: #f2eee2;
    color: #121212;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #121212;
    color: #f2eee2;
    transition: background-color 0.3s;
  }

  .logo {
    font-size: 3rem;
    font-weight: 800;
    text-transform: uppercase;
    background: linear-gradient(to right, #121212, #d4c8a2, #f2eee2);
    -webkit-background-clip: text;
    color: transparent;
    transition: letter-spacing 0.3s ease;
  }

  .logo:hover {
    letter-spacing: 0.2rem;
  }

  .subtitle {
    transition: letter-spacing 0.3s ease;
  }

  .subtitle:hover {
    letter-spacing: 0.2em;
  }
</style>
