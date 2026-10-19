<script lang="ts">
  import { base } from "$app/paths";
  import { experiences } from "../../constants";

  const siteUrl = "https://dansonkang.com";
  const title = "Danson Kang — Résumé";
  const description =
    "Résumé of Danson Kang, full-stack engineer in Singapore: experience, projects, skills and education.";

  const contacts = [
    { label: "dansonkang@gmail.com", href: "mailto:dansonkang@gmail.com" },
    { label: "dansonkang.com", href: siteUrl },
    { label: "github.com/newbiecody", href: "https://github.com/newbiecody" },
    {
      label: "linkedin.com/in/danson-kang-30829078",
      href: "https://www.linkedin.com/in/danson-kang-30829078/",
    },
  ];

  const projects = [
    {
      name: "Flatlas — Singapore HDB resale map",
      href: "https://flatlas.sg",
      stack: "Go · PostGIS · Martin · React · MapLibre GL · DuckDB · Docker",
      text: "Interactive map of every HDB resale since 1990, about a million sales across ten thousand blocks, with vector tiles served from PostGIS and a hedonic pricing model (test R² 0.94) that explains each block's price.",
    },
    {
      name: "Parking arrival prediction",
      href: "https://t.me/sgcarparkpredict_bot",
      stack: "TypeScript · Node · Postgres · grammY · Docker · GitHub Actions",
      text: "Telegram bot that logs every public carpark feed in Singapore every five minutes and predicts whether a lot will still be free on arrival; each carpark is backtested walk-forward before it may answer.",
    },
  ];

  const skills = [
    { group: "Frontend", items: "TypeScript, JavaScript, React, Next.js, Vue, Svelte" },
    { group: "Backend", items: "Node.js, Go, Java (Spring Boot), Python (FastAPI)" },
    { group: "Data", items: "PostgreSQL, PostGIS, MySQL, Redis, DuckDB" },
    { group: "Infra", items: "Docker, Caddy, GitHub Actions, Grafana, Prometheus" },
    { group: "AI tooling", items: "Amazon Bedrock, MCP, Claude Code" },
  ];

  const achievementText = (a: string | { text: string }) =>
    typeof a === "string" ? a : a.text;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/resume" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/resume" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
</svelte:head>

<div class="page">
  <article class="page-col resume">
    <div class="toolbar no-print">
      <a class="backlink" href="{base}/">← danson kang</a>
      <button type="button" class="print-btn" onclick={() => window.print()}>
        Save as PDF
      </button>
    </div>

    <header>
      <h1>Danson Kang</h1>
      <p class="role">Full-Stack Engineer · Singapore</p>
      <ul class="contacts">
        {#each contacts as c (c.href)}
          <li><a href={c.href}>{c.label}</a></li>
        {/each}
      </ul>
      <p class="summary">
        Full-stack engineer with 4+ years across TypeScript, Node.js, Go and
        Spring Boot. I care about query performance, security and verifying
        that things work in production, and I build with AI agents backed by
        test-driven development.
      </p>
    </header>

    <section>
      <h2>Experience</h2>
      {#each experiences as e (e.company + e.startDate)}
        <div class="entry">
          <div class="entry-head">
            <span class="entry-title">{e.title}, {e.company}</span>
            <span class="entry-date">{e.startDate} – {e.endDate ?? "Present"}</span>
          </div>
          <p class="entry-desc">{e.roleDesc}</p>
          {#if e.achievements?.length}
            <ul class="bullets">
              {#each e.achievements as a}
                <li>{achievementText(a)}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </section>

    <section>
      <h2>Projects</h2>
      {#each projects as p (p.name)}
        <div class="entry">
          <div class="entry-head">
            <a class="entry-title" href={p.href}>{p.name}</a>
          </div>
          <p class="entry-stack">{p.stack}</p>
          <p class="entry-desc">{p.text}</p>
        </div>
      {/each}
    </section>

    <section>
      <h2>Skills</h2>
      <dl class="skills">
        {#each skills as s (s.group)}
          <dt>{s.group}</dt>
          <dd>{s.items}</dd>
        {/each}
      </dl>
    </section>

    <section>
      <h2>Education</h2>
      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">
            Nanyang Technological University — B.Eng. (Hons) Computer Science
          </span>
          <span class="entry-date">Aug 2018 – Jun 2022</span>
        </div>
      </div>
    </section>
  </article>
</div>

<style>
  .resume {
    line-height: 1.7;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .backlink {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: inherit;
    opacity: 0.55;
  }
  .backlink:hover {
    opacity: 1;
  }
  .print-btn {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.4rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: 999px;
  }
  .print-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
  h1 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.1;
  }
  .role {
    margin-top: 0.25rem;
    opacity: 0.7;
  }
  .contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1.25rem;
    margin-top: 1rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }
  .contacts a {
    text-decoration: none;
  }
  .summary {
    margin-top: 1.5rem;
    opacity: 0.8;
  }
  h2 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  .entry + .entry {
    margin-top: 2rem;
  }
  .entry-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0 1rem;
  }
  .entry-title {
    font-weight: 600;
    text-decoration: none;
  }
  .entry-date,
  .entry-stack {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    opacity: 0.6;
  }
  .entry-stack,
  .entry-desc {
    margin-top: 0.35rem;
  }
  .entry-desc {
    opacity: 0.8;
  }
  .bullets {
    list-style: disc;
    padding-left: 1.1rem;
    margin-top: 0.75rem;
    display: grid;
    gap: 0.5rem;
    opacity: 0.8;
  }
  .skills {
    display: grid;
    grid-template-columns: 7rem 1fr;
    gap: 0.6rem 1rem;
  }
  .skills dt {
    font-weight: 600;
  }
  .skills dd {
    opacity: 0.8;
  }
  @media (max-width: 600px) {
    .skills {
      grid-template-columns: 1fr;
    }
    .skills dd {
      margin-bottom: 0.4rem;
    }
  }

  /* Print is the PDF: always light, no site chrome, tight enough for two pages. */
  @media print {
    @page {
      margin: 14mm 16mm;
    }
    :global(body),
    :global(body.dark-mode) {
      --bg: #fff;
      --fg: #121212;
      --accent: #9a3412;
      --border: rgba(0, 0, 0, 0.18);
      background: #fff;
      color: #121212;
    }
    :global(body::before),
    :global(.theme-toggle),
    .no-print {
      display: none !important;
    }
    :global(html) {
      font-size: 10pt;
    }
    :global(.page),
    .resume {
      padding: 0;
    }
    .resume {
      gap: 1.1rem;
      line-height: 1.5;
    }
    h2 {
      margin-bottom: 0.9rem;
    }
    .entry + .entry {
      margin-top: 1.1rem;
    }
    .bullets {
      margin-top: 0.35rem;
      gap: 0.25rem;
    }
    .skills {
      gap: 0.3rem 1rem;
    }
    h1 {
      font-size: 2rem;
    }
    .entry {
      break-inside: avoid;
    }
    h2 {
      break-after: avoid;
    }
  }
</style>
