<script lang="ts">
	import GameEvent from '$lib/shared/GameEvent.svelte';
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


</script>

<div class="event-list">
	{#if day_events.length === 0}
		<div class="no-events">No events today</div>
	{:else}
	<div class="events">
		{#each day_events as event}
			<GameEvent {event} {events} {statuses} />
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
				background-color: var(--background-color);
			}
		}
	}
</style>
