<script lang="ts">
    import { onMount } from "svelte";
    let active:string;
    export let mobile : boolean = false;
    let open = false;
    const routes = [
        {name: 'Sponsors', path: '/sponsors'},
        {name: 'Players', path: '/players'},
        {name: 'Statuses', path: '/statuses'},
        {name: 'Events', path: '/events'},
        {name: 'Teams', path: '/teams'},
        {name: 'Games', path: '/games'},
        {name: 'Play', path: '/play'},
    ]

    onMount(() => {
        const path = window.location.pathname.split('/')[1]
        active = path
    })

    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

</script>

<div class="sidebar" class:mobile={mobile} class:closed={mobile && !open}>
    {#if mobile}
        <div class="handle" on:click={() => open = !open} on:keydown={() => open = !open}>
            <span class="material-symbols-outlined">
                {#if open}
                    chevron_left
                {:else}
                    chevron_right
                {/if}
            </span>
        </div>
    {/if}
    <div class="logo">
        <img src="/favicon.png" alt="logo" on:click={() => window.location.href = '/home'} on:keydown={() => window.location.href = '/home'}>
    </div>
    {#each routes as route}
          <div class="sidebar-item" on:click={() =>  window.location.href = route.path} class:active={active === route.name.toLowerCase()} on:keydown={() =>  window.location.href = route.path}>
            {route.name}
        </div>
    {/each}
    <div class="sidebar-item logout" on:click={logout} on:keydown={logout}>
        Logout
    </div>
</div>

<style lang="scss">
    .handle{
        position: absolute;
        top: calc(50% - 16px);
        bottom: auto;
        right: -24px;
        background-color: var(--background-color);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 32px;
        padding: 8px 0px;
        color: var(--highlight-color);
        transition: 0.5s;
    }

    .closed{
       transform: translateX(-100%);
        transition: transform 0.5s ease-in-out;
    }

    .sidebar{
        color: var(--text-color);
        width: 10%;
        min-width: 200px;
        background-color: #311d3f69;
        padding: 16px;
        gap: 8px;
        display: flex;
        flex-direction: column;
        transition: 0.5s;
    }

    .logo{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 50%;
            aspect-ratio: 1/1;
            cursor: pointer;
        }
        margin-bottom: 16px;
    }
    .active{
        background-color: var(--background-color);
        
    }
    .sidebar-item{
        padding: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
        height: 16px;
        line-height: 16px;
        transition: 0.5s;
        background-size: 200% auto;
        &:hover{
            background-color: var(--background-color-light);
            transition: all 0.2s ease-in-out;
        }
    }

    .logout{
        margin-top: auto;
    }

    
    .mobile{
        position: absolute;
        top: 0;
        left: 0;
        height: calc(100% - 32px);
        width: 50%;
        z-index: 100;
        background-color: var(--background-color-light);
    }


</style>