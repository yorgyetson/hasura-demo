<script lang="ts">
  import AddTask from "$lib/tasks/addTask.svelte"
  import TaskTable from "$lib/tasks/taskTable.svelte"
  import { gql } from "@apollo/client/core"

  import { subscribe } from "svelte-apollo"

  const TASKS = gql`
    subscription Tasks {
      Tasks {
        id
        name
        description
        created_at
        complete
      }
    }
  `

  const tasks = subscribe(TASKS, {
    variables: {},
  })

  $: console.log($tasks)
</script>

<div class="flex w-full">
  <ul class="menu p-4 w-1/4 h-screen min-h-full text-base-content">
    <AddTask />
  </ul>
  <div class="overflow-x-auto m-2 w-full rounded p-2 shadow-xl">
    <h1>Pending Tasks</h1>
    {#if $tasks.loading}
      <span class="loading loading-spinner loading-lg"></span>
    {:else}
      <TaskTable tasks={$tasks} />
    {/if}
  </div>
  <div class="overflow-x-auto m-2 w-full rounded p-2 shadow-xl">
    <h1>Finished Tasks</h1>
    {#if $tasks.loading}
      <span class="loading loading-spinner loading-lg"></span>
    {:else}
      <TaskTable tasks={$tasks} complete={true} />
    {/if}
  </div>
</div>

<style>
  h1 {
    @apply text-2xl font-bold;
  }
</style>
