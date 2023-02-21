<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import eventStore from '$lib/stores/events.store';

	export let data: PageServerData;
	const { event, statuses } = data;
	let randomCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'
		.split('')
		.sort(() => Math.random() - 0.5)
		.join('');
	onMount(async () => {
		console.log(data);
	});
	$: status = statuses.find((status) => status.id === event.victim_status)!;

	const createDescriptionHTML = () => {
		let descHTML = event.description;
		for (let i = event.attacker_count + event.victim_count; i > event.attacker_count; i--) {
			descHTML = descHTML.replace(
				`p${i}`,
				`<span style="color: var(--red-color)">${randomCharacters + i}</span>`
			);
		}
		for (let i = event.attacker_count; i > 0; i--) {
			descHTML = descHTML.replace(
				`p${i}`,
				`<span style="color: var(--green-color)">${randomCharacters + i}</span>`
			);
		}
		return descHTML.replaceAll(randomCharacters, 'p');
	};

	const setAttackerCount = (e: Event) => {
		if ((e.target as HTMLInputElement).value === '') {
			event.attacker_count = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		const value = parseInt((e.target as HTMLInputElement).value);
		if (value > 10) {
			event.attacker_count = 10;
			(e.target as HTMLInputElement).value = '10';
			return;
		}
		if (value < 0) {
			event.attacker_count = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		event.attacker_count = value;
	};

	const setVictimCount = (e: Event) => {
		if ((e.target as HTMLInputElement).value === '') {
			event.victim_count = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		const value = parseInt((e.target as HTMLInputElement).value);
		if (value > 10) {
			event.victim_count = 10;
			(e.target as HTMLInputElement).value = '10';
			return;
		}
		if (value < 0) {
			event.victim_count = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		event.victim_count = value;
	};

	const setStatusOdds = (e: Event) => {
		if ((e.target as HTMLInputElement).value === '') {
			event.status_odds = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		const value = parseInt((e.target as HTMLInputElement).value);
		if (value > 100) {
			event.status_odds = 100;
			(e.target as HTMLInputElement).value = '100';
			return;
		}
		if (value < 0) {
			event.status_odds = 0;
			(e.target as HTMLInputElement).value = '0';
			return;
		}
		event.status_odds = value;
	};

	const save = async () => {
		await eventStore.update(event);
		// TODO  show success message
	};

    const deleteEvent = async () => {
        // TODO  show confirmation message
        await eventStore.remove(event.id);
        window.location.href = '/events';
        // TODO  show success message
    }
</script>

<div class="wrapper">
	<div class="actions">
		<button class="save" on:click={() => save()}>
			<span class="material-symbols-outlined">edit</span>
		</button>
		<button class="delete" on:click={() => deleteEvent()}>
			<span class="material-symbols-outlined">delete</span>
		</button>
	</div>

	<div class="info">
		<span style="color:var(--green-color)">
			<span class="title"> Attackers: </span>
			<input type="number" on:input={setAttackerCount} value={event.attacker_count} />
		</span>
		<span style="color:var(--red-color)">
			<span class="title"> Victims: </span>
			<input type="number" on:input={setVictimCount} value={event.victim_count} />
		</span>
		<span>
			<span class="title"> Status: </span>
			<select bind:value={event.victim_status}>
				{#each statuses as status}
					<option value={status.id} selected={status.id === event.victim_status}
						>{status.name}</option
					>
				{/each}
			</select>
			<input type="number" on:input={setStatusOdds} value={event.status_odds} />%
		</span>
		<span>
			<span class="title"> Direct Damage: </span>
			<input type="number" bind:value={event.direct_damage} />
		</span>
		<span>
			<span class="title"> Reflected Damage:</span>
			<input type="number" bind:value={event.reflected_damage} />
		</span>
		<span>
			<span class="title"> Event Type: </span> <span class="value"> {event.event_type} </span>
		</span>
		<div class="description">
			<span class="title">Description: </span>
			<textarea bind:value={event.description} />
		</div>
	</div>
	<div class="visualization">
		{#key event}
			<span class="value">
				{@html createDescriptionHTML()}
			</span>
			{#each Array.from({ length: event.attacker_count + event.victim_count }, (_, i) => i + 1) as i}
				{#if i <= event.attacker_count}
					<span class="damage-visualization">
						<span style="color:var(--green-color)">P{i}:</span> 100HP -> {100 -
							event.reflected_damage}HP
					</span>
				{:else}
					<span class="damage-visualization">
						<span style="color:var(--red-color)">P{i}:</span> 100HP -> {100 - event.direct_damage}HP
						{#if status.id != '1'}
							<span style={`color:${status.color}`}> {status.name} ({event.status_odds}%) </span>
						{/if}
					</span>
				{/if}
			{/each}
		{/key}
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.title {
		font-weight: bold;
	}

	.description {
		display: flex;
		flex-direction: column;
	}

	.damage-visualization {
		display: flex;
		gap: 1rem;
		:first-child {
			width: 2rem;
		}
	}

	.visualization {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--background-color);
		padding: 16px;
		.value {
			font-size: 20 px;
		}
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	}

	input[type='number'] {
		width: 3rem;
		text-align: center;
		background-color: transparent;
		border: none;
		border-bottom: 1px solid var(--highlight-color);
		color: var(--text-color);
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	input[type='number']:focus {
		outline: none;
	}

	select {
		background-color: transparent;
		border: none;
		border-bottom: 1px solid var(--highlight-color);
		color: var(--text-color);
	}

	select:focus {
		outline: none;
	}

	option {
		color: var(--text-color);
		background-color: var(--background-color);
	}

	textarea {
		background-color: transparent;
		border: none;
		border: 1px solid var(--highlight-color);
		color: var(--text-color);
		resize: none;
		height: 100px;
		padding: 8px;
		&:focus {
			outline: none;
		}
	}

	.actions {
		position: absolute;
		top: 8px;
		right: 8px;
		display: flex;

		.material-symbols-outlined {
			font-size: 16px;
			color: var(--text-color);
			&:hover {
				color: var(--highlight-color);
			}
		}

		button {
			appearance: none;
			background-color: transparent;
			border: none;
			cursor: pointer;
		}
	}
</style>
