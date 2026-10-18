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

  const siteUrl = "https://dansonkang.com";
  const title = "Danson Kang — Software Engineer";
  const description =
    "Full-stack engineer in Singapore. Builder of Flatlas (flatlas.sg), an interactive map of every HDB resale transaction since 1990. TypeScript, Go, PostgreSQL, PostGIS.";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/" />
  <meta name="theme-color" content="#1a1a1a" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{siteUrl}/images/og.png" />
</svelte:head>

<SideNav items={navItems} />

<div class="page" style="z-index: 2;">
  <div class="theme-toggle">
    {#if $isDarkMode}
      <Button icon={faMoon} buttonAction={toggleColorMode} />
    {:else}
      <Button icon={faSun} buttonAction={toggleColorMode} />
    {/if}
  </div>
  <div>
    <div class="page-col">
      <div class="relative">
        <PretextHero name="Danson" subtitle="Software Engineer" />
        <SocialsBar />
      </div>
      <section id="about" class="rail">
        <SectionHeader text="About me" />
        <div class="rail-body opacity-70 space-y-3 leading-relaxed">
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
      <section id="work" class="rail">
        <SectionHeader text="Work experience" />
        <div class="rail-body">
          {#each experiences as experience (experience.company)}
            <div class="mb-6">
              <ExpCard {...experience} />
            </div>
          {/each}
        </div>
      </section>
      <section id="showcase" class="rail">
        <SectionHeader text="Showcase" />
        <div class="rail-body">
          <Showcase />
        </div>
      </section>
      <section id="contact" class="rail">
        <SectionHeader text="Get in touch" />
        <div class="rail-body">
          <Contact />
        </div>
      </section>
    </div>
  </div>
</div>



<style>
  .theme-toggle {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 3;
  }
  .rail-body {
    min-width: 0;
  }
  @media (min-width: 900px) {
    .rail {
      display: grid;
      grid-template-columns: 14rem minmax(0, 1fr);
      gap: 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border);
    }
    .rail :global(.section-header) {
      position: sticky;
      top: 1.5rem;
      align-self: start;
      border-bottom: none;
      padding-bottom: 0;
    }
  }
</style>
