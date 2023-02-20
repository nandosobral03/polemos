<script lang="ts">
    import TeamCard from "$lib/TeamCard.svelte";
    export let all = [];
    let teams = [];

    for(let player of all){
        const team = teams.find(team => team.id == player.teamId);
        if(team){
            team.players.push({
                    name: player.name,
                    image: player.img
            });
        }else{
            teams.push({
                id: player.teamId,
                title: player.team,
                players: [{
                    name: player.name,
                    image: player.img
                }]
            })
        }
        
    }
</script>


    <div class="title">
        <span>Roaster</span>
    </div>
    <div class="roaster">
        {#each teams as team}
            <TeamCard team={team}/>
        {/each}
    </div>

<style>
    .title{
        padding: 16px;
    }

    .title span{
        font-size: 2em;
        font-weight: 500;
    }

    .roaster{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex-grow: 1;
    }
</style>