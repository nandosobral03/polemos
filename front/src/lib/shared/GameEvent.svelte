<script lang="ts">
	import type { DayEvent,Event, Status } from "$lib/models/event";
    export let event: DayEvent
    export let events: Event[] = [];
    export let statuses:Status[] = [];

	const getMessage = (dayEvent: any) => {
		let event = events.find((event) => event.id === dayEvent.event_id)!;
		let message = event.description;
		for (let i = event.attacker_count + event.victim_count; i > 0; i--) {
			message = message.replaceAll(`p${i}`, dayEvent.players[i - 1].name);
		}
		return message;
	};

	const getStatus = (id: string) => {
		if (id === '1') return 'Normal';
		return statuses.find((status) => status.id === id)?.name;
	};

	const getStatusColor = (id: string) => {
		if (id === '1') return 'var(--text-color)';
		return statuses.find((status) => status.id === id)?.color;
	};
</script>


<div class="event">
    {getMessage(event)}
    {#each event.players as player}
        <div class="player">
            <img
                src={player.image}
                alt={player.name}
                class:dead={player.health <= 0}
                style:box-shadow={player.status != '1'
                    ? `0 0 5px 2px ${getStatusColor(player.status)}`
                    : ''}
            />
            <span class="player-name">{player.name}</span>
            <span
                class="player_health"
                class:positive={player.health > player.previousHealth}
                class:negative={player.health < player.previousHealth}
            >
                <span class="previous_health">{player.previousHealth}</span>
                <span class="arrow">➡</span>
                <span class="current_health">{player.health > 0 ? player.health : 0}</span>
            </span>
            {#if player.status != player.previousStatus}
                <span class="player_status">
                    <span class="previous_status" style:color={getStatusColor(player.previousStatus)}
                        >{getStatus(player.previousStatus)}</span
                    >
                    <span class="arrow">➡</span>
                    <span class="current_status" style:color={getStatusColor(player.status)}
                        >{getStatus(player.status)}</span
                    >
                </span>
            {/if}
        </div>
    {/each}
</div>


<style lang="scss">
    .event {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--background-color-light);
		border-radius: 8px;
		.player {
			display: flex;
			gap: 1rem;
			align-items: center;
			.player-name {
				font-weight: bold;
			}
		}

		&:hover {
			background-color: var(--background-color);
		}
	}

	img {
		width: 75px;
		height: 75px;
		border-radius: 8px;

		&.dead {
			filter: grayscale(100%);
		}
	}

	.positive {
		color: var(--green-color);
	}

	.negative {
		color: var(--red-color);
	}

	
</style>