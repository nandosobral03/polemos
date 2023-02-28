<script lang="ts">
    import { onMount } from "svelte";
    let active:string;
    const routes = [
        {name: 'Sponsors', path: '/sponsors'},
        {name: 'Players', path: '/players'},
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

<div class="sidebar">
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
    .sidebar{
        color: var(--text-color);
        width: 10%;
        min-width: 200px;
        background-color: #311d3f69;
        padding: 16px;
        gap: 8px;
        display: flex;
        flex-direction: column;

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
</style>