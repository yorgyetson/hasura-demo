<script lang="ts">
  import AddTask from "$lib/tasks/addTask.svelte"
  import { gql } from "@apollo/client/core"
  import { onMount } from "svelte"

  import { query } from "svelte-apollo"
  // onMount(() => {
  const movies_by_char = gql`
    query MyQuery {
      StarWars {
        allPeople {
          edges {
            node {
              name
              filmConnection {
                films {
                  title
                }
              }
            }
          }
        }
      }
    }
  `

  const characters = query(movies_by_char, {
    variables: {},
  })

  $: console.log($characters)
  // })
</script>

{#if $characters.loading}
  <span class="loading loading-spinner loading-lg"></span>
{:else}
  <div class="flex flex-wrap text-center">
    {#each $characters.data.StarWars.allPeople.edges as { node }, index}
      <div class="card w-1/4 bg-base-100 shadow-xl">
        <figure></figure>
        <div class="card-body">
          <h1 class="text-center">{node.name}</h1>
          <ul>
            {#each node.filmConnection.films as film}
              <li>{film.title}</li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  h1 {
    @apply text-2xl font-bold;
  }
</style>
