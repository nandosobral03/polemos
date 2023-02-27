<script lang="ts">
	import type { PageServerData } from "./$types";
    import playersStore from "$lib/stores/players.store";
	import teamStore from "$lib/stores/team.store";
    export let data : PageServerData;
    let file: FileList|null = null;
    let uploader: HTMLInputElement | null = null;
    const player = {
        name : "",
        // default placeholder image
        image : "https://via.placeholder.com/150",
        team_id : null,
        team : "No team",
        total_wins : 0,
        total_deaths : 0,
        total_kills : 0
    }
    const discard = async () => {
        window.location.href = "/players";
    }

    const save = async () => {
        verify()
        const d = await playersStore.create({
            ...player,
            image : undefined
        });
        if(file !== null){
            await teamStore.updatePlayerImage(d.player.id, file[0]);
        }
        setTimeout(() => {
            window.location.href = `/players/${d.player.id}`
        }, 1000)
    }

    const verify = () => {
        if(player.name === ""){
            // todo: add error message
            throw new Error("Name cannot be empty")
        }
    }


    function handleImageUpload(e: Event, idx: number) {
		const target = e.target as HTMLInputElement;
		const file = target.files![0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result as string;
			player.image = result;
		};
		reader.readAsDataURL(file);
	}
	function handleImageClick(idx: number) {
		const target = uploader as HTMLInputElement;
		target?.click();
	}

</script>

<input
		type="file"
		accept="image/*"
		bind:files={file}
		on:change={(e) => handleImageUpload(e, 0)}
		style="display: none;"
		bind:this={uploader}
	/>

    


<div class="wrapper">
    <div class="actions"> 
        <button on:click={() => save()}><span class="material-symbols-outlined">save</span></button>
        <button on:click={() => discard()}><span class="material-symbols-outlined">cancel</span></button>
    </div>

    <img class="edit-image" src="{player.image}" alt="{player.name}" on:click={() => handleImageClick(0)} on:keydown={(e) => e.key === "Enter" && handleImageClick(0)}>

    <div class="info">
        <input type="text" class="name" bind:value={player.name} placeholder="Name" />
        <select class="team" bind:value={player.team_id} on:change={() => player.team = data.teams.find(team => team.id === player.team_id)?.name || ""}>
            <option value={null}>No team</option>
                {#each data.teams as team}
                    <option value="{team.id}">{team.name}</option>
                {/each}
            </select>
    </div>
    </div>
    <div class="stats">
        <span>Total wins: {player.total_wins}</span>
        <span>Total deaths: {player.total_deaths}</span>
        <span>Total kills: {player.total_kills}</span>
        <span class="kd">K/D: 
            {
                player.total_deaths === 0 ? 0 : Math.round((player.total_kills / player.total_deaths) * 100) / 100
            }
        </span>
        <span class="kd">Winrate: 
            <!-- Round to 2 decimal -->
            {Math.round((player.total_wins / (player.total_wins + player.total_deaths)) * 100 * 100) / 100}%
        </span>
    </div>

<style lang="scss">
    .wrapper{
        position: relative;
        padding: 16px;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        img{
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }
    }

    .info{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .team{
            font-size: 1.5rem;
        }
    }

    input{
        border: none;
        border-bottom: 1px solid var(--highlight-color);
        background: none;
        color: var(--text-color);
        font-size: 1.5rem;
        font-weight: bold;
        &:focus{
            outline: none;
        }
    }
    
    .stats{
        border-top: 1px solid var(--highlight-color);
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        span{
            font-size: 1.5rem;
        }
        .kd{
            font-weight: bold;
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

    .edit-image{
        cursor: pointer;
        &:hover{
            filter: brightness(0.8);
        }
    }

</style>