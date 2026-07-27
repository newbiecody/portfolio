<script lang="ts">
  import { base } from "$app/paths";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  const siteUrl = "https://newbiecody.github.io/portfolio";
  const title = "Flatlas — a case study";
  const description =
    "How Flatlas maps every Singapore HDB resale transaction since 1990: PostGIS vector tiles, a Go API, a hedonic pricing model, and the engineering problems in between.";

  const stats = [
    { value: "~1M", label: "resale transactions" },
    { value: "~10k", label: "blocks geocoded" },
    { value: "98.6%", label: "geocode match rate" },
    { value: "0.94", label: "hedonic model test R²" },
    { value: "5.6%", label: "median abs. price error" },
    { value: "36 yrs", label: "of data, 1990–present" },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/flatlas" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/flatlas" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex justify-center w-full p-4">
  <article class="flex flex-col w-[36rem] max-w-full space-y-12 py-10">
    <header>
      <a class="backlink" href="{base}/">← danson kang</a>
      <h1>Flatlas</h1>
      <p class="subtitle">
        An interactive map of every Singapore HDB resale transaction since 1990
        — <a href="https://flatlas.sg" target="_blank" rel="noopener noreferrer"
          >live at flatlas.sg</a
        >. This page is the engineering story.
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
      <SectionHeader text="What it is" level={2} />
      <div class="prose">
        <p>
          Singapore publishes every public-housing resale transaction as open
          data, but as CSV files spanning five dataset eras with inconsistent
          schemas. Flatlas turns that into something you can actually reason
          with: a map where prices resolve through three zoom tiers — town
          choropleth, per-block dots, and 3D buildings extruded from their real
          footprints — with a time slider that replays 36 years of the market
          in inflation-adjusted or nominal dollars, and a pricing model that
          explains <em>why</em> a given block costs what it does.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Architecture" level={2} />
      <div class="prose">
        <p>
          The core decision: two channels, one database. Vector tiles are for
          <em>drawing</em>; a JSON API is for <em>interacting</em>. They never
          mix.
        </p>
      </div>
      <pre class="diagram">{`            ┌─────────────────────────────┐
            │   PostGIS  (source of truth) │
            │   transactions · blocks ·    │
            │   matviews · model coefs     │
            └──────┬───────────────┬──────┘
                   │               │
        MVT tiles  │               │  SQL (bbox, windowed)
                   ▼               ▼
            ┌────────────┐   ┌────────────┐
            │   Martin    │   │   Go API    │
            │ tile server │   │ txn history │
            └──────┬─────┘   └──────┬─────┘
                   │  render         │  interact
                   ▼                 ▼
            ┌─────────────────────────────┐
            │   React + MapLibre GL        │
            │   3 zoom tiers · 1 price ramp│
            └─────────────────────────────┘`}</pre>
      <div class="prose">
        <p>
          Tiles come straight out of PostGIS as Mapbox Vector Tiles via
          <code>ST_AsMVT</code>, served by Martin. Anything you click — a
          block's transaction history, the price explanation — hits a small Go
          API that runs viewport-bounded, per-block-windowed queries. One
          gotcha that shaped the API: a global <code>LIMIT</code> on a bounding-box
          query silently drops entire blocks at dense zoom levels, so the cap is
          applied per block with a window function instead.
        </p>
        <p>
          The whole stack — database, tile server, API, ETL — runs in Docker on
          a single small VM. Nothing here needs more than that, and refusing
          bigger infrastructure kept every decision honest.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Problem 1 — geocoding without lying" level={2} />
      <div class="prose">
        <p>
          The data has addresses, not coordinates. The obvious move — geocode a
          million rows — is also wrong twice over. First, only the ~10k unique
          blocks need coordinates, so those are geocoded once and cached
          permanently. Second, and more dangerous: Singapore's official
          geocoder fuzzy-matches street names. Query "JALAN BATU" and you can
          get "JALAN JAMBU BATU" — a confident hit that puts a Kallang block
          eight kilometres away in Bukit Timah, with no error to catch.
        </p>
        <p>
          The fix is defensive: every hit is validated against the block number
          and road name before it's accepted, unresolvable blocks are skipped
          and logged rather than forced to a wrong coordinate, and a second
          pass flags any block landing more than 5&nbsp;km from its town's
          centroid and re-geocodes it, preferring the candidate nearest the
          centroid. Match rate: 98.6% of blocks, with the misses accounted for
          — mostly demolished blocks — instead of silently misplaced.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Problem 2 — what should 'real prices' mean?" level={2} />
      <div class="prose">
        <p>
          A 1995 flat that sold for $180k did not cost "$180k" in any sense a
          2026 buyer understands, so the map defaults to inflation-adjusted
          prices. The subtle question is <em>which</em> index to deflate by.
          The first version used HDB's own Resale Price Index — and produced
          nonsense: deflating housing prices by a housing price index strips
          out the market appreciation itself, so 1990s flats read as expensive
          as today's. The index has risen roughly 8× since 1990; general
          consumer prices, about 1.9×.
        </p>
        <p>
          The rebuild deflates by CPI (All Items) instead, which answers the
          question people are actually asking — "what is that in today's
          purchasing power?" — and produces the intuitive curve. Both nominal
          and real prices are precomputed in the ETL and shipped together, so
          the toggle flips instantly with no refetch. Because the choice is
          baked into a million rows, getting the definition right mattered more
          than any rendering decision in the project.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Problem 3 — explaining a price, honestly" level={2} />
      <div class="prose">
        <p>
          The "why this price" panel is a hedonic regression: log-price on
          flat attributes (area, storey, remaining lease), location features
          (distance to MRT and CBD, plot ratio, nearby commercial/industrial
          land use), and month fixed effects, with spline terms where the
          relationship is genuinely non-linear. Current vintage: test R² 0.94,
          median absolute error 5.6%, with 84% of held-out sales predicted
          within 10%.
        </p>
        <p>
          Two disciplines kept it honest. Every candidate feature had to earn
          its place in a controlled out-of-sample test — several plausible ones
          (walking-route distance instead of straight-line, relative floor
          height, town×year interactions) were rejected because they didn't
          improve held-out accuracy, and the rejections are recorded so they
          don't get re-litigated. And the serving path is audited against the
          fitting path: one bug — an unqualified column in a correlated
          PostGIS subquery, valid SQL that computed every block's MRT distance
          as zero — skewed the explanation endpoint by the full MRT premium.
          It was caught by measuring the endpoint's residual bias over random
          blocks, a check that now runs whenever the model ships.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Stack" level={2} />
      <div class="prose">
        <p class="stack-line">
          PostGIS · Martin · Go · DuckDB ETL · Python · React · TypeScript ·
          MapLibre GL · Caddy · Docker
        </p>
        <p>
          <a href="https://flatlas.sg" target="_blank" rel="noopener noreferrer"
            >Open Flatlas →</a
          >
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
    grid-template-columns: repeat(3, 1fr);
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
  .prose p + p {
    margin-top: 0.85rem;
  }
  .prose a {
    color: var(--accent);
    text-decoration: none;
  }
  .prose a:hover {
    text-decoration: underline;
  }
  .prose code {
    font-family: var(--font-mono);
    font-size: 0.85em;
  }
  .diagram {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    line-height: 1.35;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1rem;
    margin: 1rem 0;
    overflow-x: auto;
    opacity: 0.85;
  }
  .stack-line {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  section :global(h2) {
    margin-bottom: 0.75rem;
  }
</style>
