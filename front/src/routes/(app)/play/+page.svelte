<script lang="ts">
	import Loader from "$lib/shared/Loader.svelte";
    import gameStore from "$lib/stores/game.store";
    import type { PageData } from "./$types";
    let loading = false;
    let loadingText = "Loading";
    let loadingTexts = [
        "Simulating Game",
        "Cleaning the arena",
        "Calculating damage",
        "Rolling dice",
        "Generating map",
        "Writing the events",
        "Generating teams",
        "Generating players",
    ]
    const generateGame =  async() => {
        loading = true;
        setInterval(() => {
            const dotCount = loadingText.split(".").length - 1;
            if(dotCount < 3){
                loadingText += ".";
            }else{
                loadingText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
            }
        }, 400);


        const {id} = await gameStore.start();
        window.location.href = "/games/" + id + "/1";
    }

 

</script>
<div class="wrapper">
    {#if loading}
        <div class="loader-wrapper">
            <Loader />
            <div>
                {loadingText}
            </div>
        </div>
    {:else}
        <button class="play" on:click={() => generateGame()}>
            Start Game
        </button>
    {/if}
</div>

<style lang="scss">
    .wrapper{
        display: grid;
        place-items: center;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .play{
        background-color: var(--background-color);
        border: none;
        border-radius: 16px;
        padding: 60px 80px;
        font-size: 4rem;
        color: var(--text-color);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover{
            transform: scale(1.1);
            box-shadow: 0 0 15px 5px var(--primary-color);
        }
    }

    .loader-wrapper{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        div{
            font-size: 2rem;
            color: var(--text-color);
            margin-top: 20%;
        }
    }

</style>