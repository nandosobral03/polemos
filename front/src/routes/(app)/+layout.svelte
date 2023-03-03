<script lang="ts">
	import Loader from "$lib/shared/Loader.svelte";
	import Toast from "$lib/shared/Toast.svelte";
	import Sidebar from "$lib/shared/Sidebar.svelte";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
  let width = 1200;
  let loading = true;
  if(browser){
    width = window ? window.innerWidth : 0;
    window?.addEventListener("resize", () => {
      width = window.innerWidth;
    });
  }


  onMount(() => {
    loading = false;

  });

</script>
<main>
  {#if loading}
    <div class="load">
      <Loader/>
    </div>
  {:else}
  {#if width > 768}
    <Sidebar/>
  {:else}
    <Sidebar mobile={true}/>
  {/if}
  <div class="content">
      <slot />
  </div>
  {/if}
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


