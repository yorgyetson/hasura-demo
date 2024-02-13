<script>
  import { gql } from "@apollo/client/core"
  import Icon from "@iconify/svelte"
  import { mutation } from "svelte-apollo"
  export let id

  const DELETE_TASK = gql`
    mutation MyMutation($id: uuid = "") {
      delete_Tasks_by_pk(id: $id) {
        id
      }
    }
  `
  const deleteTask = mutation(DELETE_TASK)

  async function handleSubmit() {
    try {
      await deleteTask({ variables: { id } })
    } catch (error) {
      // TODO
    }
  }
</script>

<button on:click={handleSubmit}>
  <Icon
    class="text-red-900 hover:text-red-700 active:text-red-300"
    icon="material-symbols:delete"
    width="32"
    height="32"
  />
</button>
