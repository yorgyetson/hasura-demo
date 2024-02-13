<script>
  import { gql } from "@apollo/client/core"

  import { mutation } from "svelte-apollo"
  let name = ""
  let description = ""

  const ADD_TASK = gql`
    mutation MyMutation($name: String = "", $description: String = "") {
      insert_Tasks_one(object: { name: $name, description: $description }) {
        id
      }
    }
  `
  const addTask = mutation(ADD_TASK)

  async function handleSubmit() {
    try {
      await addTask({ variables: { name, description } })
      name = ""
      description = ""
    } catch (error) {
      // TODO
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="form-control w-full">
  <div class="flex flex-col">
    <div class="flex flex-col">
      <label class="label" for="name">
        <span class="label-text">Name</span>
      </label>
      <input
        type="text"
        id="name"
        bind:value={name}
        class="input input-bordered w-full max-w-xs"
        placeholder="Task name"
      />
    </div>
    <div class="flex flex-col">
      <label class="label" for="description">
        <span class="label-text">Description</span>
      </label>
      <textarea
        class="textarea textarea-bordered"
        bind:value={description}
        placeholder="Task Description"
      ></textarea>
    </div>
  </div>
  <button type="submit" class="btn btn-primary mt-4">Add Task</button>
</form>

<style>
  /* Additional styles can go here if needed, using Tailwind's utility classes */
</style>
