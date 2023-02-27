<script lang="ts">
	import Loader from "$lib/shared/Loader.svelte";
	import Toast from "$lib/shared/Toast.svelte";
	import Sidebar from "$lib/shared/Sidebar.svelte";
	import { onMount } from "svelte";


  let loading = true;

  onMount(() => {
    loading = false;
  });

</script>
<main>
  <!-- {#if loading}
  <div class="load">
    <Loader style="no"/>
  </div> -->
  <!-- {/if} -->
  <Sidebar />
  <div class="content">
      <slot />
  </div>
  <Toast/>
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
      padding: 8px;
      color: var(--text-color);
      background-color: #311d3f69;
      overflow-y: auto;
      margin: clamp(8px, 1%, 12px);
      border-radius: 8px;
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


