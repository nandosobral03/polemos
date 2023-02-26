<script lang="ts">
	import type { Sponsor, Team } from '$lib/models/team';
	import { createEventDispatcher } from 'svelte';
	import { env } from '$lib/env';
	import teamStore from '$lib/stores/team.store';
	export let sponsors: Sponsor[];
	let url = env.API_URL;
	let team: Team = {
		id: '',
		name: '',
		sponsor: sponsors[0].id,
		players: []
	};
    const dispatch = createEventDispatcher();

    const save = async () => {
		try {
			verify();   
            const data = await teamStore.create(team);
			team.id = data.team.id;
			dispatch('saved', team);
            reset();
		} catch (e) {
        }
	};

    const reset= () => {
        team = {
            id: '',
            name: '',
            sponsor: sponsors[0].id,
            players: [1, 2, 3, 4].map((i) => ({
                name: '',
                image: `${url}/static/default.png`
            }))
        };
    }

	const verify = () => {
       
    };
	const discard = () => {
		reset();
        dispatch('discard');
    };


</script>


<div class="card">
	<div class="card-header">
		<span class="sponsor">
			<select bind:value={team.sponsor}>
				{#each sponsors as sponsor}
					<option value={sponsor.id} selected={sponsor.id === team.sponsor}>{sponsor.name}</option>
				{/each}
			</select>
		</span>
		<span class="name">
			<input type="text" bind:value={team.name} placeholder="Team Name" />
		</span>
		<span class="actions">
			<button on:click={save}><span class="material-symbols-outlined">save</span></button>
			<button on:click={discard}><span class="material-symbols-outlined">close</span></button>
		</span>
	</div>
	
</div>

<style lang="scss">
	.card {
		background-color: var(--background-color-light);
		padding: 16px;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 8px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
		transition: background-color 0.2s ease-in-out;
		&:hover{
			background-color: var(--background-color);
		}


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
			}

			.sponsor {
				font-size: 16px;
				width: fit-content;
				background-color: var(--background-color);
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
