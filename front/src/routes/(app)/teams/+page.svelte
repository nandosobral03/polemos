<script lang="ts">
    import { onMount } from "svelte";
	import type { PageData } from "../teams/$types";
	import TeamCard from "./TeamCard.svelte";
    import NewTeamCard from "./NewTeamCard.svelte";

    export let data : PageData;
    let adding = false;
    let changed = false;

</script>
    
    <div class="teams">
        {#key changed}
            {#each data.roaster as team}
                <TeamCard {team} sponsors={data.sponsors} on:deleted={() => {
                    data.roaster = data.roaster.filter((t) => t.id !== team.id)
                    changed = !changed;
                    }}
                />
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
        display: grid;
        // 2 columns of 50% width
        grid-template-columns: 50% 50%;
        grid-gap: 16px;
        padding: 16px;
        overflow-y: auto;
        overflow-x: hidden;
        place-items: center;
        
    }

    @media only screen and (max-width: 1400px) {
        .teams{
            grid-template-columns: 100%;
        }
    }

    button{
        background-color: var(--background-color-light);
		padding: 16px;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);

        border: none;
        box-sizing: content-box;
        color: var(--highlight-color);
        font-size: 32px;
        height: 300px;
        
        transition: background-color 0.2s ease-in-out;


        cursor: pointer;
        &:hover{
            background-color: var(--background-color);
        }


    }

</style>