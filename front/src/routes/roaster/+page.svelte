<script lang="ts">
    import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
	import TeamCard from "./TeamCard.svelte";
    import NewTeamCard from "./NewTeamCard.svelte";

    export let data : PageServerData;
    let adding = false;
    let changed = false;
    onMount(async () => {
        console.log(data);
    });
</script>
    
    <div class="teams">
        {#key changed}
            {#each data.roaster as team}
                <TeamCard {team} sponsors={data.sponsors} />
            {/each}
        {/key}
        
        {#if adding}
            <NewTeamCard sponsors={data.sponsors} on:saved={(e) => {
                data.roaster.push(e.detail);
                changed = !changed;
                adding = false;
            }}
            on:discard={() => adding = false} />
        {:else}
            <button on:click={() => adding = true}>Add Team</button>
        {/if}
    </div>

<style lang="scss">
    .teams{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex-grow: 1;
        overflow-y: auto;
    }

    button{
        background-color: var(--background-color);
        border: 1px solid var(--highlight-color);
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 24px;
        font-weight: 500;
        color: var(--highlight-color);
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
            color: var(--background-color);
        }
    }

</style>