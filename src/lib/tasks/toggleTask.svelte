<script>
  import { gql } from "@apollo/client/core"
  import Icon from "@iconify/svelte"
  import { mutation } from "svelte-apollo"
  export let id
  export let status

  const TOGGLE_TASK = gql`
    mutation MyMutation($id: uuid = "", $complete: Boolean = false) {
      update_Tasks_by_pk(
        pk_columns: { id: $id }
        _set: { complete: $complete }
      ) {
        id
      }
    }
  `
  const toggleTask = mutation(TOGGLE_TASK)

  async function handleSubmit() {
    try {
      await toggleTask({ variables: { id, complete: !status } })
    } catch (error) {
      // TODO
    }
  }
</script>

{#if status}
  <button on:click={handleSubmit}>
    <Icon
      class="text-yellow-900 hover:text-yellow-700 active:text-yellow-300"
      icon="material-symbols:undo"
      width="32"
      height="32"
    />
  </button>
{:else}<button on:click={handleSubmit}>
    <Icon
      class="text-green-900 hover:text-green-700 active:text-green-300"
      icon="material-symbols:check-circle"
      width="32"
      height="32"
    />
  </button>
{/if}
