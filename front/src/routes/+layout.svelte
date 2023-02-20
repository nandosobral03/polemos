<script lang="ts">

	import Sidebar from "../lib/shared/Sidebar.svelte";
</script>
<main>
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
      background-color: var(--background-color-light);
      margin: 16px;
      color: var(--text-color);
    }
</style>


