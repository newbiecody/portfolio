<script>
  import "../app.css";
</script>

<slot />

<style>
  /* Lives here, not on the home page: a scoped :global(body) rule only applies
     while that component is mounted, so a direct load of any other route left
     the body unpainted — black-on-black in a dark-scheme browser. */
  :global(body) {
    background-color: var(--bg);
    color: var(--fg);
    transition:
      background-color 0.3s,
      color 0.3s;
  }
</style>
