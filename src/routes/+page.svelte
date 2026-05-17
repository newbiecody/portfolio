<script lang="ts">
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
  import Button from "$lib/components/buttons/Button.svelte";
  import { isDarkMode } from "../state.svelte";
  import ExpCard from "$lib/components/ExpCard.svelte";
  import { experiences } from "../constants";
  import SocialsBar from "$lib/components/SocialsBar.svelte";
  import Showcase from "$lib/components/Showcase.svelte";
  import PretextHero from "$lib/components/PretextHero.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import SideNav from "$lib/components/SideNav.svelte";
  import Contact from "$lib/components/Contact.svelte";

  function toggleColorMode() {
    isDarkMode.set(!$isDarkMode);
    window.document.body.classList.toggle("dark-mode");
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "showcase", label: "Showcase" },
    { id: "contact", label: "Contact" },
  ];
</script>

<SideNav items={navItems} />

<div class="justify-center w-full p-4 relative" style="z-index: 2;">
  <div class="flex justify-end">
    {#if $isDarkMode}
      <Button icon={faMoon} buttonAction={toggleColorMode} />
    {:else}
      <Button icon={faSun} buttonAction={toggleColorMode} />
    {/if}
  </div>
  <div class="flex justify-center">
    <div class="flex flex-col space-y-16 w-[36rem]">
      <div class="relative">
        <PretextHero name="Danson" subtitle="Software Engineer" />
        <SocialsBar />
      </div>
      <section id="about">
        <SectionHeader text="About me" />
        <div class="opacity-70 space-y-3 leading-relaxed">
          <p>
            Full-stack engineer based in Singapore with 4+ years of experience
            building scalable backend systems and the frontends that sit on top
            of them. Currently at Vistra Singapore; previously at DCS Card
            Center, where I worked across TypeScript, Spring Boot, and
            PostgreSQL — focused on API performance, observability, and turning
            slow, manual workflows into fast, automated ones.
          </p>
          <p>
            I care about the parts of software that compound: clean queries,
            good monitoring, type-safe interfaces, and code that the next
            engineer can actually read.
          </p>
        </div>
      </section>
      <section id="work">
        <SectionHeader text="Work experience" />
        {#each experiences as experience (experience.company)}
          <div class="mb-6">
            <ExpCard {...experience} />
          </div>
        {/each}
      </section>
      <section id="showcase">
        <SectionHeader text="Showcase" />
        <Showcase />
      </section>
      <section id="contact">
        <SectionHeader text="Get in touch" />
        <Contact />
      </section>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: var(--bg);
    color: var(--fg);
    transition: background-color 0.3s, color 0.3s;
  }
</style>
