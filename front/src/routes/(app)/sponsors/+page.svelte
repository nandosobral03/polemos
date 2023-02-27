<script lang="ts">
	import type { PageData } from "./$types";
	import Sponsor from "./Sponsor.svelte";
    import sponsorStore from "$lib/stores/sponsor.store";
    export let data : PageData;
    let sponsors = data.sponsors;
    let update = false;
    const create = async () => {
        const data = await sponsorStore.create("New Sponsor");
        const id = data.sponsor.id;
        const sponsor = {id, name: "New Sponsor"}
        sponsors.push(sponsor);
        update = !update;
    }

</script>


<div class="wrapper">
    {#key update}
        {#each sponsors as sponsor}
            <Sponsor {sponsor} on:remove={() => sponsors = sponsors.filter(s => s.id !== sponsor.id)} />
        {/each }
    {/key}
    <button class="add" on:click={create}>
        <span class="material-symbols-outlined">add</span>
    </button>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: calc(100% - 16px);
        padding: 8px;
        gap: 8px;
    }

    .add{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 50px;
        right: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--background-color);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
        }
    }
</style>