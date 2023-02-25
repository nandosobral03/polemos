<script lang="ts">
    import { onMount } from "svelte";
    let active:string;
    const routes = [
        {name: 'Teams', path: '/teams'},
        {name: 'Players', path: '/players'},
        {name: 'Events', path: '/events'},
        {name: 'Play', path: '/play'},
        {name: 'Games', path: '/games'},
    ]

    onMount(() => {
        const path = window.location.pathname.split('/')[1]
        active = path
    })

</script>

<div class="sidebar">
      {#each routes as route}
        <div class="sidebar-item" on:click={() =>  window.location.href = route.path} class:active={active === route.name.toLowerCase()} on:keydown={() =>  window.location.href = route.path}>
            {route.name}
        </div>
      {/each}
</div>

<style lang="scss">
    .title{
        font-size: 2em;
        margin: 16px 0px;
        font-weight: 900;
        user-select: none;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .sidebar{
        color: var(--text-color);
        width: 10%;
        min-width: 200px;
        background-image: linear-gradient(225deg, var(--background-color), var(--background-color-light) 50%, var(--background-color) 50%, var(--background-color-light));
        padding: 16px;
        gap: 8px;
        display: flex;
        flex-direction: column;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        margin: 16px 0px;
    }
    .active{
        background-color: var(--primary-color);
    }
    .sidebar-item{
        padding: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
        height: 16px;
        line-height: 16px;
    }

    .sidebar-item:hover{
        background-color: var(--background-color);
        transition: all 0.2s ease-in-out;
    }
</style>