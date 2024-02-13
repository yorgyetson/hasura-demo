<script>
  import { createApolloClient } from "$lib/apolloClient"
  import { setClient } from "svelte-apollo"
  import { onMount } from "svelte"
  import "../app.pcss"
  const client = createApolloClient()
  setClient(client)
</script>

<div class="navbar bg-base-300">
  <div class="flex-1">
    <a class="btn btn-ghost text-2xl font-bold">Hasura Demo</a>
  </div>
  <div class="flex-none gap-4 p-2">
    <a href="/tasks">Tasks</a>
    <a href="/starwars">StarWars</a>
  </div>
</div>

<slot />
