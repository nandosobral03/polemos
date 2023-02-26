<script lang="ts">
	import type { Sponsor } from "$lib/models/team";
    import sponsorStore from "$lib/stores/sponsor.store";
	import { createEventDispatcher } from "svelte";
    export let sponsor:Sponsor;
    let oldSponsor = JSON.parse(JSON.stringify(sponsor));
    let editing = false;

    const dispatch = createEventDispatcher();

    const save = async () => {
        await sponsorStore.update(sponsor);
        oldSponsor = JSON.parse(JSON.stringify(sponsor));
        editing = false;
    }

    const cancel = () => {
        sponsor = oldSponsor;
        editing = false;
    }

    const remove = async () => {
        await sponsorStore.remove(sponsor.id);
        dispatch("remove");
    }   

</script>

<div class="sponsor">
    {#if editing}
        <input type="text" bind:value={sponsor.name} />
    {:else}
        <span class="name">{sponsor.name}</span>
    {/if}
    
    <div class= "actions">
       {#if editing}
                <span class="material-symbols-outlined" on:click={save} on:keydown={save}>save</span>
                <span class="material-symbols-outlined" on:click={cancel} on:keydown={cancel}>cancel</span>
        {:else}
            <span class="material-symbols-outlined" on:click={() => editing = true} on:keydown={() => editing = true}>edit</span>
            <span class="material-symbols-outlined" on:click={remove} on:keydown={remove}>delete</span>
        {/if}
    </div>           
</div>

<style lang="scss">
    .sponsor {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background-color: var(--background-color-light);
        border-radius: 4px;
        &:hover {
            background-color: var(--background-color);
        }
    }

    .name {
        font-size: 1rem;
    }   

    .actions {
        display: flex;
        flex-direction: row;
        gap: 8px;
    }

    .material-symbols-outlined {
        font-size: 1rem;
        cursor: pointer;
        &:hover {
            color: var(--highlight-color);
        }
    }

    input{
        width: 90%;
        font-size: 1rem;
        border: none;
        background-color: transparent;
        color: var(--text-color);
        border-bottom: 1px solid var(--highlight-color);
        &:focus {
            outline: none;
        }
    }
</style>
