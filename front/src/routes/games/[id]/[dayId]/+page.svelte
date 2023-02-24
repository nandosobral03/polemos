<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const statuses = data.status;
	const day_players = data.day.current_players;
	const events = data.events;
	const players = data.teams
		.map((team) =>
			team.players.map((player) => {
				const dayPlayer = day_players.find((dayPlayer) => dayPlayer.id === player.id)!;
				return {
					...player,
					...dayPlayer
				};
			})
		)
		.flat();

	const getPlayer = (id: string) => {
		return players.find((player) => player.id === id)!;
	};

	const day_events = data.day.events.map((event) => {
		return {
			...event,
			players: event.players.map((p) => getPlayer(p))
		};
	});

	const getMessage = (dayEvent: any) => {
		let event = events.find((event) => event.id === dayEvent.event_id)!;
		let message = event.description;
		for (let i = event.attacker_count + event.victim_count; i > 0; i--) {
			message = message.replaceAll(`p${i}`, dayEvent.players[i - 1].name);
		}
		return message;
	};

	for (let player of players) {
		if (player.status) {
			if (player.status != '1') {
				console.log(player);
			}
			if (player.status != player.previousStatus) {
				console.log(player);
			}
		}
	}

	const getStatus = (id: string) => {
		if (id === '1') return 'Normal';
		return statuses.find((status) => status.id === id)?.name;
	};

	const getStatusColor = (id: string) => {
		if (id === '1') return 'var(--text-color)';
		return statuses.find((status) => status.id === id)?.color;
	};
</script>

<div class="event-list">
	{#if day_events.length === 0}
		<div class="no-events">No events today</div>
	{:else}
	<div class="events">
		{#each day_events as event}
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
		{/each}
	</div>
	{/if}
	<div class="buttons">
		{#if data.dayNumber > 1}
			<button
				on:click={() => {
					window.location.href = `/games/${data.game.id}/${data.dayNumber - 1}`;
				}}>Previous</button
			>
		{/if}
		{#if data.dayNumber < data.game.days.length}
			<button
				on:click={() => {
					window.location.href = `/games/${data.game.id}/${data.dayNumber + 1}`;
				}}>Next</button
			>
		{:else}
			<button
				on:click={() => {
					window.location.href = `/games/${data.game.id}/summary`;
				}}>Finish</button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.event-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 0;
        min-height: calc(100% - 2rem);
	}

	.event {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--background-color);
		border-radius: 8px;
		.player {
			display: flex;
			gap: 1rem;
			align-items: center;
			.player-name {
				font-weight: bold;
			}
			.player-status {
				font-weight: bold;
			}
		}

		&:hover {
			background-color: var(--background-color-light);
			scale: 1.01;
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

	.buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
		button {
			cursor: pointer;
			padding: 8px 16px;
			border-radius: 8px;
			border: none;
			background-color: var(--highlight-color);
			color: var(--text-color);
			&:hover {
				background-color: var(--red-color);
			}
		}
	}
    
    .no-events {
        font-size: 2rem;
        font-weight: bold;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .events{
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
