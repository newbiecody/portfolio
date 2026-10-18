<script lang="ts">
  import { base } from "$app/paths";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  const siteUrl = "https://dansonkang.com";
  const title = "Two minutes to under a second — a short note";
  const description =
    "How restructuring one CRM query to narrow its data before a join took an API from 1–2 minutes to under a second.";

  const stats = [
    { value: "1–2 min", label: "before" },
    { value: "<1 s", label: "after" },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/crm-query" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/crm-query" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page">
  <article class="page-col">
    <header>
      <a class="backlink" href="{base}/">← danson kang</a>
      <h1>Two minutes to under a second</h1>
      <p class="subtitle">
        A short note on one slow query in a CRM at DCS Card Center, and the
        rewrite that fixed it.
      </p>
    </header>

    <div class="stats">
      {#each stats as s (s.label)}
        <div class="stat">
          <div class="stat-value">{s.value}</div>
          <div class="stat-label">{s.label}</div>
        </div>
      {/each}
    </div>

    <section>
      <SectionHeader text="The problem" level={2} />
      <div class="prose">
        <p>
          Several processes in our CRM depended on one API call that fetched
          data from the database. That call took one to two minutes. The
          query joined two tables in full and only narrowed the result down
          afterwards, so the database built a large intermediate result and
          then discarded most of it.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="The fix: narrow first, join second" level={2} />
      <div class="prose">
        <p>
          I rewrote the query so a CTE first selects only the rows the process
          actually needs. The join then runs against that small subset instead
          of the whole table.
        </p>
      </div>
      <pre class="diagram">{`  before
  table A  (all rows) ─┐
                       ├─ JOIN ─▶ large result ─▶ narrow ─▶ few rows
  table B  (all rows) ─┘

  after
  table A ─▶ CTE: narrow ─▶ small subset ─┐
                                          ├─ JOIN ─▶ few rows
  table B ────────────────────────────────┘`}</pre>
      <div class="prose">
        <p>
          The work a join does grows with the number of rows going into it.
          Shrinking one side before the join cut that work, and the API went
          from one to two minutes to under a second.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="The lesson" level={2} />
      <div class="prose">
        <p>
          The win wasn't the <code>WITH</code> keyword itself. It was changing
          the order of the work. If the database had been narrowing the data
          before the join on its own, the original query would already have
          been fast. Restructuring the query made that order explicit. When a
          query is slow now, the first thing I check is how many rows reach
          each join.
        </p>
      </div>
    </section>
  </article>
</div>

<style>
  header h1 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 700;
    margin-top: 1.25rem;
  }
  .backlink {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    color: inherit;
    opacity: 0.55;
    transition: opacity 0.2s ease;
  }
  .backlink:hover {
    opacity: 1;
  }
  .subtitle {
    margin-top: 0.75rem;
    opacity: 0.7;
    line-height: 1.6;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .stat {
    background: var(--bg);
    padding: 1rem 0.75rem;
    text-align: center;
  }
  .stat-value {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
  }
  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.55;
    margin-top: 0.25rem;
  }
  .prose {
    opacity: 0.75;
    line-height: 1.7;
    font-size: 0.925rem;
  }
  .prose code {
    font-family: var(--font-mono);
    font-size: 0.85em;
  }
  .diagram {
    width: fit-content;
    max-width: 100%;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    line-height: 1.35;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    margin: 1rem auto;
    overflow-x: auto;
    opacity: 0.85;
  }
  section :global(.section-header) {
    margin-bottom: 0.75rem;
  }
</style>
