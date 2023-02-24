<script lang="ts">
	import Loader from "$lib/shared/Loader.svelte";
	import { onMount } from "svelte";


	import Sidebar from "../lib/shared/Sidebar.svelte";
  let loading = true;

  onMount(() => {
    loading = false;
  });

</script>
<main>
  {#if loading}
  <div class="load">
    <Loader style="no"/>
  </div>
  {/if}
    <Sidebar />
    <div class="content">
        <slot />
    </div>
</main>

<style lang="scss">
    main{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;
      
    }

    .content{
      flex-grow: 1;
      padding: 16px;
      border-radius: 8px;
      background-image: linear-gradient(225deg, var(--background-color), var(--background-color-light) 50%, var(--background-color) 50%, var(--background-color-light));
      margin: 16px;
      color: var(--text-color);
      overflow-y: auto;
    }

    .load{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.137);
      position: absolute;
      z-index: 100;
    }
</style>


