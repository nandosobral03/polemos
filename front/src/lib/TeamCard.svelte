<script>
    export let team;

</script>

<div class="team-container">
    <div class="title">
        <span>{team.title}</span>
    </div>
    <div class="team">
        {#each team.players as player}
            <div class="player">
                <img src={player.image} alt="" class="player-image">
                <div class="name">
                    <p>{player.name}</p>
                </div>
            </div>
        {/each}
    </div>

</div>

<style>
    .title{
        padding: 15px;
    }

    .title span{
        font-size: 1.3em;
        font-weight: 500;
    }
    .team-container{
        display: flex;
        flex-direction: column;
        background-color: var(--background-color);
        margin: 15px;
        padding: 15px;
        border-radius: 5px;
        /* box shadow */
        -webkit-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.75);
        box-shadow: 1px 1px 5px 1px rgba(255, 255, 255, 0.75);
        width: 80%;
    }
    
    .team{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 25px;
        padding: 10px;
    }

    .player{
        flex-basis: 45%;
        display: flex;

    }

    .player-image{
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 10%;
        /*shadow */
        -webkit-box-shadow: 0px 0px 5px 0px var(--highlight-color);
        box-shadow: 2px 2px 5px -1px var(--highlight-color);
    }

    .name{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
</style>