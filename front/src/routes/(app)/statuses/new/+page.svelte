<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import statusStore from "$lib/stores/status.store";
	import type { PageData } from "./$types";
    let status = {
        id: "",
        name: "",
        color: "#000000",
        damage_reduction: 0,
        health_increase: 0
    }

    let mobile = false;
    let width = 1200;
    let currentColor = status.color;
    $ : mobile = width < 768;
    $ : currentColor = status.color;

    if(browser){
        width = window ? window.innerWidth : 0;
        window?.addEventListener("resize", () => {
        width = window.innerWidth;
        });
    }

    const save = async () => {
        verify();
        console.log(status);
        const {id} = await statusStore.create(status);
        goto(`/statuses/${id}`);
    }

    const discard = () => {
       goto("/statuses");
    }

    const verify = () => {
        if(status.name == ""){
            alert("Name is required");
            return;
        }
        if(status.damage_reduction  && status.damage_reduction < 0){
            alert("Damage reduction is required");
            return;
        }
        if(status.health_increase && status.health_increase < 0){
            alert("Health increase is required");
            return;
        }
    }

</script>


<div class="wrapper" class:mobile={mobile}>
    <div class="actions"> 
            <button on:click={() => save()}><span class="material-symbols-outlined">save</span></button>
            <button on:click={() => discard()}><span class="material-symbols-outlined">cancel</span></button>
    </div>
    <div class="info">
        <input type="color" bind:value={status.color} class="color"/>
        <input type="text" bind:value={status.name} placeholder="Name" />
        <input type="number" step="0.1" bind:value={status.damage_reduction} placeholder="Damage reduction" />
        <input type="number" step="0.1" bind:value={status.health_increase} placeholder="Health increase" />   
    </div>

</div>

<style lang="scss">
    .wrapper{
        position: relative;
        padding: 32px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        &.mobile{
            flex-direction: column;
            align-items: center;
           
        }
    }

    .color{
        width: 128px;
        height: 128px;
        border-radius: 8px;
        margin-bottom: 16px;
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

    .info{
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        max-width: 100%;

    }


    input{
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 8px;
        font-size: 1.5rem;
        background-color: var(--background-color);
        color: var(--text-color);
        &:focus{
            outline: none;
        }
    }
</style>