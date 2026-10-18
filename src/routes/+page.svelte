<script lang="ts">
  import ExpCard from "$lib/components/ExpCard.svelte";
  import { experiences } from "../constants";
  import SocialsBar from "$lib/components/SocialsBar.svelte";
  import Showcase from "$lib/components/Showcase.svelte";
  import PretextHero from "$lib/components/PretextHero.svelte";
  import SectionHeader from "$lib/components/SectionHeader.svelte";
  import SideNav from "$lib/components/SideNav.svelte";
  import Contact from "$lib/components/Contact.svelte";

  const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "ai", label: "AI workflow" },
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
      <section id="ai" class="rail">
        <SectionHeader text="How I build with AI" />
        <div class="rail-body opacity-70 space-y-3 leading-relaxed">
          <p>
            I do most of my development with AI agents: Claude Code day to day,
            and Amazon Bedrock at work. AI writes the first draft; tests, review
            and my own checks decide what ships.
          </p>
          <ul class="ai-list">
            <li>
              <strong>Tests first.</strong> I write the tests from the spec
              before the agent writes any code, so "done" means the tests pass,
              not that the agent says so. AI also reviews my diffs as a second
              pair of eyes.
            </li>
            <li>
              <strong>Grounded, not guessed.</strong> My agents are set up to ask
              when something is unclear and to back answers with docs and
              research, so I learn the context instead of trusting the output
              blindly. Hooks compact long sessions before the context grows
              large enough to cause drift, saving a checkpoint first.
            </li>
            <li>
              <strong>Cost-aware.</strong> Different agents run on different
              models: cheap ones for lookups and boilerplate, the strongest only
              for changes that span several parts of a system. A terse output
              mode cuts token use further.
            </li>
            <li>
              <strong>Internal tools at work.</strong> At Vistra I build internal
              tooling on Amazon Bedrock, including custom MCP servers that give
              coding agents access to our codebase.
            </li>
            <li>
              <strong>Verified in production.</strong> A deploy once reported
              success while the server kept running the old config. I caught it
              by checking the live site, not the agent's summary.
            </li>
            <li>
              <strong>Agents as pipeline stages.</strong> For a side project
              making short Singapore history videos, Claude Code writes scripts
              from my research notes and picks archive search terms; Node
              scripts fetch licensed images, render the video and add the
              voiceover. I approve every script and image by hand.
            </li>
          </ul>
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
  .rail-body {
    min-width: 0;
  }
  .ai-list {
    display: grid;
    gap: 0.75rem;
    padding-left: 1.1rem;
    list-style: disc;
  }
  .ai-list strong {
    font-weight: 600;
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
