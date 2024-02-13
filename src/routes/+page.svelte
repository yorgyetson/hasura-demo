<script lang="ts">
  import AddTask from "$lib/tasks/addTask.svelte"
  import { gql } from "@apollo/client/core"
  import { onMount } from "svelte"

  import { query } from "svelte-apollo"
  // onMount(() => {
  const TASKS = gql`
    query Tasks {
      Tasks {
        id
      }
    }
  `

  const tasks = query(TASKS, {
    variables: {},
  })

  $: console.log($tasks)
  // })
</script>

<div class="navbar bg-base-300">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        ></path></svg
      >
    </button>
  </div>
</div>

<AddTask />
