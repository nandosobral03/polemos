<script lang="ts">
    import gameStore from "$lib/stores/game.store";
    let loading = false;
    const generateGame =  async() => {
        loading = true;
        await gameStore.start();
        loading = false;
        window.location.href = "/";

    }

</script>
<div class="wrapper">
    <button class="play" on:click={() => generateGame()}>
        Start Game
    </button>
</div>

<style lang="scss">
    .wrapper{
        display: grid;
        place-items: center;
        height: 100%;
        width: 100%;
    }

    .play{
        background-color: var(--highlight-color);
        border: none;
        border-radius: 8px;
        padding: 30px 80px;
        font-size: 4rem;
        color: var(--text-color);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover{
            transform: scale(1.05);
            background-color: var(--primary-color);
            box-shadow: 0 0 10px 0 var(--primary-color);


        }
    }

</style>