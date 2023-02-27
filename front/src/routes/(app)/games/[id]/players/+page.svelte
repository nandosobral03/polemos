<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data : PageServerData;

    const gotoPlayer = (id: string | undefined) => {
        window.location.href = `/games/${data.gameId}/players/${id}`;
    
    }

</script>

<div class="wrapper">
        {#each data.players as player}
            <div class="player" on:click={() => gotoPlayer(player.id)} on:keydown={(e) => e.key === 'Enter' && gotoPlayer(player.id)}>
                <img src={player.image} alt={player.name} />
                <div class="info">
                    <div class="name">{player.name}</div>
                    <div class="team">{player.team}</div>
                </div>
            </div>
        {/each} 
</div>


<style lang="scss">
    .wrapper{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        min-height: 100%;
        padding: 16px;
    }

    .player{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: calc(100% - 32px);
        padding: 16px;
        background-color: var(--background-color-light);
        border-radius: 8px;
        margin: 8px 0;
        gap: 1rem;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
        }

        img{
            width: 75px;
            height: 75px;
            border-radius: 8px;
        }
        .name{
            font-weight: 700;
            font-size: 1.5rem;
        }
        .team{
            font-weight: 300;
            color: var(--text-color);
        }
    }



   

</style>