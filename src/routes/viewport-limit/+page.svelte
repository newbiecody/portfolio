<script lang="ts">
  import { base } from "$app/paths";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  const siteUrl = "https://dansonkang.com";
  const title = "The LIMIT that hid part of the map — a short note";
  const description =
    "How a row cap ordered by date silently dropped whole blocks from Flatlas's map, and the one-line ranking fix that kept every block visible.";

  const stats = [
    { value: "262 / 371", label: "blocks returned, before" },
    { value: "371 / 371", label: "blocks returned, after" },
    { value: "1,270 → 518 ms", label: "8,213-block view" },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/viewport-limit" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/viewport-limit" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="page">
  <article class="page-col">
    <header>
      <a class="backlink" href="{base}/">← danson kang</a>
      <h1>The LIMIT that hid part of the map</h1>
      <p class="subtitle">
        A short note on a row cap in <a href="{base}/flatlas">Flatlas</a> that
        returned the right number of rows and the wrong set of blocks.
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
      <SectionHeader text="The setup" level={2} />
      <div class="prose">
        <p>
          When you panned the map, the API fetched recent resale transactions
          for every HDB block inside the viewport. The query found the blocks
          with a spatial index, then used a <code>LATERAL</code> join to pull
          each block's newest sales, up to 100 per block. A per-block limit was
          deliberate: one global <code>LIMIT</code> lets busy blocks crowd out
          quiet ones.
        </p>
        <p>
          On top of that sat a <code>LIMIT 5000</code> backstop, so a
          zoomed-out view couldn't send a multi-megabyte response. It was
          ordered by sale month, newest first.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="The bug" level={2} />
      <div class="prose">
        <p>
          The backstop reintroduced the problem the per-block limit was meant
          to prevent. Ordered by month alone, the newest 5,000 rows all came
          from blocks with recent sales. A block whose latest sale was a few
          years old had every row below the cutoff, so it vanished from the
          map without an error. In one dense viewport of 371 blocks, the
          response covered only 262.
        </p>
      </div>
      <pre class="diagram">{`  ORDER BY sale_month DESC  LIMIT 5000

  block A   2026-09  2026-08  2026-08  …   ┐
  block B   2026-09  2026-07  …            ├─ newest 5,000 rows
  block C   2026-08  2026-06  …            ┘
  ─────────────────────────────── cutoff ───────
  block D   2022-03  2021-11  …            ✗ every row cut
  block E   2021-08  …                     ✗ every row cut`}</pre>
    </section>

    <section>
      <SectionHeader text="The fix: rank first, then date" level={2} />
      <div class="prose">
        <p>
          Inside the <code>LATERAL</code>, each block's rows get a rank with
          <code>row_number()</code>, newest first. The backstop then orders by
          that rank before the date:
        </p>
      </div>
      <pre class="diagram">{`  ORDER BY rn, sale_month DESC  LIMIT 5000

  rn = 1   newest row of every block     ← all kept first
  rn = 2   second-newest of every block
  …
  rn = k   cutoff lands here: trims old rows evenly`}</pre>
      <div class="prose">
        <p>
          Every block's newest sale is now in the first rows of the result, so
          a block can only disappear once a single viewport holds more than
          5,000 blocks. The cap still applies, but it now trims each block's
          oldest rows instead of removing whole blocks. It was faster too: an
          8,213-block view went from 1,270 ms to 518 ms.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="The lesson" level={2} />
      <div class="prose">
        <p>
          A <code>LIMIT</code> raises two questions: how many rows, and which
          rows. The second question decides whether results are correct, and
          a cap ordered only by date is a filter on age. Now, whenever a query
          returns groups, I check what a cap removes from each group, and I
          test against the densest view instead of a typical one. The bug
          never threw an error. It only showed up when I counted blocks.
        </p>
        <p>
          A postscript: a week later the frontend stopped calling the
          viewport endpoint altogether, and I removed it. It had become the
          API's slowest query, and nothing used it. Deleting a query is the
          surest way to make it fast.
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
  .subtitle a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  @media (max-width: 600px) {
    .stats {
      grid-template-columns: 1fr;
    }
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
    display: grid;
    gap: 0.75rem;
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
