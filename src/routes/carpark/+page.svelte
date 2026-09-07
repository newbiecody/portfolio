<script lang="ts">
  import { base } from "$app/paths";
  import SectionHeader from "$lib/components/SectionHeader.svelte";

  const siteUrl = "https://newbiecody.github.io/portfolio";
  const title = "Predicting parking — a case study";
  const description =
    "A Singapore parking predictor that answers whether you'll get a lot when you arrive, and refuses to answer for carparks it can't predict accurately: profile models, walk-forward calibration, and a Telegram bot.";

  const stats = [
    { value: "5 min", label: "sampling interval" },
    { value: "3", label: "live feeds ingested" },
    { value: "15–60 min", label: "prediction horizon" },
    { value: "≥85%", label: "accuracy bar to serve" },
    { value: "<5%", label: "wrong-yes ceiling" },
    { value: "6 wks", label: "profile window" },
  ];
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="{siteUrl}/carpark" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="{siteUrl}/carpark" />
  <meta property="og:image" content="{siteUrl}/images/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex justify-center w-full p-4">
  <article class="flex flex-col w-[36rem] max-w-full space-y-12 py-10">
    <header>
      <a class="backlink" href="{base}/">← danson kang</a>
      <h1>Predicting parking</h1>
      <p class="subtitle">
        Every parking app in Singapore shows how many lots are free
        <em>now</em>. After a thirty-minute drive that number is fiction. This
        one predicts whether a lot will be there when you
        <em>arrive</em> — and stays quiet about the carparks it can't predict
        well enough to be worth trusting.
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
      <SectionHeader text="The problem with the live number" level={2} />
      <div class="prose">
        <p>
          Singapore publishes carpark availability as open data, and several
          apps render it faithfully: here are the lots free right now. The
          trouble is that nobody parks right now. You look before leaving, drive
          for twenty to forty minutes, and arrive into a completely different
          distribution — one that the app never showed you, because by then it
          is showing a fresh number to somebody else.
        </p>
        <p>
          So the product question isn't "how many lots are there?" but "will
          there be one when I arrive?", which is a forecasting problem with a
          badly asymmetric cost function. That asymmetry ended up shaping almost
          every decision in the system.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Architecture" level={2} />
      <div class="prose">
        <p>
          Three processes, one database. The logger never stops, the calibrator
          runs on a schedule, and the bot only ever reads.
        </p>
      </div>
      <pre class="diagram">{`   LTA DataMall ─┐
   data.gov.sg  ─┼─► ingest (cron, 5 min) ─► Postgres
   NEA rainfall ─┘                             │
                                               │
                     nightly / monthly         │
                   calibration sweep ◄─────────┤
                   (walk-forward backtest)     │
                          │                    │
                   per-carpark config          │
                   model + yes-floor + gate    │
                          │                    │
                          ▼                    ▼
                       serving ──────────► Telegram bot
                   predict(carpark,          cards · watches
                           arrival)          feedback loop`}</pre>
      <div class="prose">
        <p>
          The whole thing runs in Docker on one small VM, sharing a Postgres
          instance with another project of mine rather than paying for a second
          one. Deploys go out through GitHub Actions on a push to a
          <code>prod</code> branch, with migrations run as a one-shot container
          before either service starts — a lesson from a release that added a
          column the bot read and the logger created, where whichever container
          won the race decided whether the bot crashed.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader
        text="Problem 1 — a wrong yes costs twenty minutes"
        level={2}
      />
      <div class="prose">
        <p>
          A wrong "no" costs the user one tap: they scroll to the next carpark.
          A wrong "yes" sends them across the island to a full carpark, and that
          is the error that makes someone delete the thing. The two mistakes are
          not worth the same, so the model does not treat them the same.
        </p>
        <p>
          The prediction is a time-of-week profile blended with today's
          deviation from that profile, decaying as the horizon lengthens —
          today's information is worth a lot at fifteen minutes and very little
          at an hour. The expected number of lots is computed from the profile's
          median, but the <em>banding</em> — the green/amber/red call the user
          actually reads — runs off the lower quartile instead. The headline
          number is the honest estimate; the traffic light is deliberately
          pessimistic.
        </p>
        <p>
          That wasn't enough on its own. The static threshold for calling
          something "likely" was a flat rule — twenty lots, or eight percent of
          capacity. On one 51-lot carpark in the backtest the model's own mean
          absolute error was about thirteen lots, which sits under that
          threshold: it produced a confident yes that was wrong four times in
          five. Now every carpark carries a threshold calibrated on held-out
          data, defined as the smallest value that would have produced no
          dangerous yes-calls on the validation week.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader
        text="Problem 2 — some carparks should not be predicted at all"
        level={2}
      />
      <div class="prose">
        <p>
          Carparks behave differently enough that one model is the wrong shape.
          A stable office carpark repeats its weekly pattern almost exactly, and
          the profile alone wins. Others swing week to week, and there simple
          persistence — "what it is right now is what it'll be" — beats any
          profile at short horizons. So three candidates compete per carpark per
          fold, chosen by error on a validation week that sits inside the
          training window and is never test data.
        </p>
        <p>
          The more useful decision was admitting that some carparks lose anyway.
          Each one is backtested walk-forward and has to clear a bar — at least
          85% band accuracy with fewer than 5% dangerous calls, across the
          fifteen- to sixty-minute horizons — before it is allowed to answer.
          One that fails is switched off at serving time and returns "not enough
          signal" instead of a guess, and the card says so rather than hiding
          it.
        </p>
        <p>
          It costs coverage, which felt wrong to build and right to ship. A
          product that is quiet where it is weak can be trusted where it speaks;
          one that always answers teaches people to check it against reality,
          and then they stop checking.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader
        text="Problem 3 — the flow was losing people, not the model"
        level={2}
      />
      <div class="prose">
        <p>
          The first version of the bot asked for a destination, then asked when
          you would arrive, then answered. Reasonable, and wrong: it put a
          question between the user and any value, and that question was where
          conversations went quiet.
        </p>
        <p>
          Now a resolved destination answers immediately for "leaving now", and
          the arrival times are a row of buttons on the card itself — re-timing
          is a correction to an answer you already have, not a toll you pay
          before seeing one. Stale and foreign button taps got the same
          treatment: they used to dismiss silently, which reads as a dead bot,
          and now say what happened.
        </p>
        <p>
          The temptation was to chase the drop-off with a reminder ping. I
          didn't, because silence after a card is usually success — the user
          tapped Navigate and drove off — and a prediction that decays in
          minutes makes for a useless nudge ten minutes later. Instead each
          query records how far it got, including destinations that never
          geocoded, which turned the guesswork into a number: the searches that
          fail are now visible before a user has to complain about them.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="What it doesn't do yet" level={2} />
      <div class="prose">
        <p>
          Capacity is the honest limitation. The open feeds publish total lots
          for public housing carparks but not for most private ones, and without
          capacity there is no denominator, so malls and much of the CBD
          currently fall into the "not enough signal" bucket by construction
          rather than by judgement. The fix — inferring capacity from the
          observed ceiling of months of readings — is the next thing on the
          list, and until it ships the product's honest pitch is heartland, not
          malls.
        </p>
        <p>
          Rainfall is ingested and not yet used: the hypothesis that rain fills
          carparks faster is plausible, cheap to test, and will only ship if it
          improves held-out accuracy rather than because it sounds good. The
          thumbs-up/thumbs-down asked after each predicted arrival is quietly
          the most valuable part of the system — it is the only labelled outcome
          data anyone has for this problem, and no amount of open data
          substitutes for it.
        </p>
      </div>
    </section>

    <section>
      <SectionHeader text="Stack" level={2} />
      <div class="prose">
        <p class="stack-line">
          TypeScript · Node · Postgres · grammY · Docker · GitHub Actions ·
          LTA DataMall · data.gov.sg · OneMap
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
