<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    let active = 'roaster'
    const handleChange = (e: string) => {
        dispatch(
            'change',
            {
                route: e
            }
        )   
        
        window.location.href = `/${e}`
    }

    onMount(() => {
        const path = window.location.pathname.split('/')[1]
        active = path
    })

</script>

<div class="sidebar">
    <div class="title"> Gurises Games</div>
    <div class="sidebar-item" class:active={active === 'roaster'} on:click={
      () =>  handleChange('roaster') 
    } on:keydown={e => e.key === 'Enter' && handleChange('roaster')}>Roaster</div>
     <div class="sidebar-item" class:active={active === 'play'} on:click={
        () =>  handleChange('play')
      } on:keydown={e => e.key === 'Enter' && handleChange('play')}>Play</div>
</div>

<style>
    .title{
        font-size: 1.5em;
        margin: 16px 0px;
    }
    .sidebar{
        color: var(--text-color);
        width: 10%;
        min-width: 200px;
        background-color : var(--background-color-light);
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
    }

    .sidebar-item:hover{
        background-color: var(--background-color);
        transition: all 0.2s ease-in-out;
    }
</style>