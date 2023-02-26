<script lang="ts">
    import GameEvent from "$lib/shared/GameEvent.svelte";
import type { PageServerData } from "./$types";
    export let data : PageServerData;
    const statuses = data.status;
    const player = data.players.find((p) => p.id === data.playerId)!;
	const events = data.events.map((event) => {
        const {id,players,current_players, ...rest} = event;
        return {
            ...rest,
            players: current_players.map(
                (player) => {
                    const playerData = data.players.find((p) => p.id === player.id)!;
                    return {
                        ...player,
                        ...playerData,
                    };
                }
            ),
            id,
            event_id: id,
        };
        } );

</script>

<div class="wrapper">
    <div class="events">
		{#each events as event}
			<GameEvent {event} {events} {statuses} />
		{/each}
        {#if data.isWinner}
            <div class="winner">
                <span>Winner</span>
                <div class="player">
                    <img src={player.image} alt={player.name} />
                    <div class="info">
                        <div class="name">{player.name}</div>
                        <div class="team">{player.team}</div>
                    </div>
                </div>
            </div>
        {/if}
	</div>
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



    .events{
		display: flex;
		flex-direction: column;
		gap: 1rem;
        width: 100%;
	}

    .winner{
        > span{
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--highlight-color);
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--background-color-light);
        border-radius: 8px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        margin: 8px 0;
        &:hover{
            background-color: var(--background-color);
        }

        img{
            width: 150px;
            height: 150px;
            border-radius: 8px;
        }
        .info{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            .name{
                font-weight: 700;
            }
        }
    }
   

</style>