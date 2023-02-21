<script lang="ts">
	import type { Sponsor, Team } from '$lib/models/team';
	import teamStore from '$lib/stores/team.store';
	import { onMount } from 'svelte';
	export let sponsors: Sponsor[];
	export let team: Team;
	let editing = false;
	let oldTeam: Team;
	let files: (FileList | null)[] = [null, null, null, null];
	let uploaders: (HTMLElement | null)[] = [null, null, null, null];
	let deleted = false;
	onMount(() => {
		oldTeam = JSON.parse(JSON.stringify(team));
	});

	function handleImageUpload(e: Event, idx: number) {
		const target = e.target as HTMLInputElement;
		const file = target.files![0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result as string;
			team.players[idx].image = result;
		};
		reader.readAsDataURL(file);
	}

	function handleImageClick(idx: number) {
		const target = uploaders[idx];
		target?.click();
	}

	const discard = () => {
		team = oldTeam;
		editing = false;
	};

	const save = async () => {
		editing = false;
		await teamStore.update(team);
		for (let player, i = 0; (player = team.players[i]); i++) {
			if (player.name !== oldTeam.players[i].name) {
				await teamStore.updatePlayer(player);
			}

			if (player.image?.startsWith('data:image')) {
				let fileList = files[i];
				await teamStore.updatePlayerImage(player.id!, fileList![0]);
			}
		}
	};

	const remove = async () => {
		await teamStore.remove(team.id);
		deleted = true;
	};
</script>

{#if !deleted}
	<input
		type="file"
		accept="image/*"
		bind:files={files[0]}
		on:change={(e) => handleImageUpload(e, 0)}
		style="display: none;"
		bind:this={uploaders[0]}
	/>
	<input
		type="file"
		accept="image/*"
		bind:files={files[1]}
		on:change={(e) => handleImageUpload(e, 1)}
		style="display: none;"
		bind:this={uploaders[1]}
	/>
	<input
		type="file"
		accept="image/*"
		bind:files={files[2]}
		on:change={(e) => handleImageUpload(e, 2)}
		style="display: none;"
		bind:this={uploaders[2]}
	/>
	<input
		type="file"
		accept="image/*"
		bind:files={files[3]}
		on:change={(e) => handleImageUpload(e, 3)}
		style="display: none;"
		bind:this={uploaders[3]}
	/>

	<div class="card">
		{#if !editing}
			<div class="card-header">
				<span class="sponsor">
					{sponsors.find((sponsor) => sponsor.id === team.sponsor)?.name}
				</span>
				<span class="name">
					{team.name}
				</span>
				<span class="actions">
					<button on:click={() => (editing = true)}
						><span class="material-symbols-outlined">edit</span></button
					>
					<button on:click={() => remove()}
						><span class="material-symbols-outlined">delete</span></button
					>
				</span>
			</div>
			<div class="players">
				{#each team.players as player}
					<div class="player">
						<img class="player-image" src={player.image} alt={player.name} />
						<div class="player-name">
							{player.name}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		{#if editing}
			<div class="card-header">
				<span class="sponsor">
					<select bind:value={team.sponsor}>
						{#each sponsors as sponsor}
							<option value={sponsor.id} selected={sponsor.id === team.sponsor}
								>{sponsor.name}</option
							>
						{/each}
					</select>
				</span>
				<span class="name">
					<input type="text" bind:value={team.name} />
				</span>
				<span class="actions">
					<button on:click={save}><span class="material-symbols-outlined">save</span></button>
					<button on:click={discard}><span class="material-symbols-outlined">close</span></button>
				</span>
			</div>
			<div class="players">
				{#each team.players as player, i}
					<div class="player">
						<img
							class="player-image image-edit"
							src={player.image}
							alt={player.name}
							on:click={() => handleImageClick(i)}
							on:keydown={(e) => e.key === 'Enter' && handleImageClick(i)}
						/>
						<div class="player-name">
							<input type="text" bind:value={player.name} />
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.card {
		background-color: var(--background-color);
		padding: 16px;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
		transition: background-color 0.2s ease-in-out;
		&:hover{
			background-color: var(--background-color-light);
		}


		user-select: none;
		gap: 32px;
		height: 300px;
		.card-header {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 8px;
			font-size: 24px;
			font-weight: 500;
			text-align: center;
			.name {
				flex-grow: 1;
				color: var(--red-color);
				font-weight: 300;
			}

			.sponsor {
				font-size: 16px;
				width: fit-content;
				background-color: var(--red-color);
				padding: 8px;
				border-radius: 8px;
				select {
					width: 100%;
					font-size: inherit;
					font-weight: inherit;
					border: none;
					background-color: transparent;
					color: var(--text-color);
					text-align: inherit;

					&:active,
					&:focus {
						outline: none;
					}

					option {
						background-color: var(--background-color);

						&:active,
						&:focus {
							outline: none;
						}

						&:hover {
							background-color: var(--highlight-color) !important;
						}
					}
				}
			}
		}

		.players {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			gap: 8px;

			.player {
				display: flex;
				align-items: center;
				width: 40%;
				gap: 8px;

				.player-image {
					width: 100px;
					height: 100px;
					border-radius: 8px;
					&.image-edit {
						cursor: pointer;
						&:hover {
							filter: brightness(0.7);
						}
					}
				}

				.player-name {
					font-size: 16px;
					font-weight: 500;
					width: 100%;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;

				}
			}
		}
	}

	input {
		font-size: inherit;
		font-weight: inherit;
		border: none;
		background-color: transparent;
		color: var(--text-color);
		text-align: inherit;
		width: 100%;
	}

	.actions {
		display: flex;
		flex-direction: row;
		gap: 8px;
		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: var(--text-color);
			&:hover {
				color: var(--highlight-color);
			}
		}
		.material-symbols-outlined {
			font-size: 16px;
		}
	}
</style>
