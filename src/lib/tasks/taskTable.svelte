<script>
  import DeleteTask from "./deleteTask.svelte"
  import ToggleTask from "./toggleTask.svelte"
  import dayjs from "dayjs"
  import { formatDistanceToNow } from "date-fns"

  export let tasks
  export let complete = false
</script>

<table class="table table-zebra">
  <!-- head -->
  <thead>
    <tr>
      <!-- <th>ID</th> -->
      <th>Name</th>
      <th>Description</th>
      <th class="text-center">Created At</th>
      <th class="text-center"
        >{complete ? "Mark Incomplete" : "Mark Complete"}</th
      >
      <th class="text-center">Delete Task</th>
    </tr>
  </thead>

  <tbody>
    {#each tasks.data.Tasks as task}
      {#if task.complete == complete}
        <tr>
          <td>{task.name}</td>
          <td>{task.description}</td>
          <td class="text-center"
            >{formatDistanceToNow(task.created_at, {
              addSuffix: true,
            })}</td
          >
          <td class="text-center"
            ><ToggleTask id={task.id} status={task.complete} /></td
          >
          <td class="text-center"><DeleteTask id={task.id} /></td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>
