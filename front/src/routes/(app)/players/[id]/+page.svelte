<script lang="ts">
	import type { PageData } from "./$types";
    import playersStore from "$lib/stores/players.store";
	import teamStore from "$lib/stores/team.store";
    export let data : PageData;
    data.player.team = data.player.team || "No team";
    let oldPlayer = JSON.parse(JSON.stringify(data.player)); // Deep copy of player object
    let editing = false;
    let file: FileList|null = null;
    let uploader: HTMLInputElement | null = null;

    const discard = async () => {
        data.player = oldPlayer;
        editing = false;
    }

    const save = async () => {
        await playersStore.update({
            ...data.player,
            image : undefined
        });
        if(file !== null){
            await teamStore.updatePlayerImage(data.player.id, file[0]);
        }
        editing = false;
    }

    const remove = async() => {
        await playersStore.remove(data.player.id);
        window.location.href = "/players";
    }

    function handleImageUpload(e: Event, idx: number) {
		const target = e.target as HTMLInputElement;
		const file = target.files![0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const result = e.target?.result as string;
			data.player.image = result;
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
        {#if !editing}
            <button on:click={() => editing = !editing}><span class="material-symbols-outlined">edit</span></button>
            <button on:click={() => remove()}> <span class="material-symbols-outlined">delete</span></button>
        {:else}
            <button on:click={() => save()}><span class="material-symbols-outlined">save</span></button>
            <button on:click={() => discard()}><span class="material-symbols-outlined">cancel</span></button>
        {/if}
    </div>
    
    {#if editing}
        <img class="edit-image" src="{data.player.image}" alt="{data.player.name}" on:click={() => handleImageClick(0)} on:keydown={(e) => e.key === "Enter" && handleImageClick(0)}>
    {:else}
        <img src="{data.player.image}" alt="{data.player.name}">
    {/if}   
    <div class="info">
        {#if editing}
            <input type="text" class="name" bind:value={data.player.name}>
            <select class="team" bind:value={data.player.team_id} on:change={() => data.player.team = data.teams.find(team => team.id === data.player.team_id)?.name || "No teamnpm"}>
                <option value={null}>No team</option>
                {#each data.teams as team}
                    <option value="{team.id}">{team.name}</option>
                {/each}
            </select>
        {:else}
            <span class="name">{data.player.name}</span >
            <span class="team">{data.player.team}</span>
        {/if}
    </div>
    </div>
    <div class="stats">
        <span>Total wins: {data.player.total_wins}</span>
        <span>Total deaths: {data.player.total_deaths}</span>
        <span>Total kills: {data.player.total_kills}</span>
        <span class="kd">K/D: 
            {
                data.player.total_deaths === 0 ? 0 : Math.round((data.player.total_kills / data.player.total_deaths) * 100) / 100
            }
        </span>
        <span class="kd">Winrate: 
            <!-- Round to 2 decimal -->
            {data.player.total_deaths === 0 ? 0 : Math.round((data.player.total_wins / (data.player.total_wins + data.player.total_deaths)) * 100 * 100) / 100}%
        </span>
    </div>

<style lang="scss">
    .wrapper{
        position: relative;
        padding: 32px;
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
        .name{
            font-size: 2rem;
            font-weight: bold;
            
        }
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