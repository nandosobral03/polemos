<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data : PageServerData;
    const statuses = data.status;
	const events = data.events;

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

<div class="wrapper">
     
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

    .player{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: calc(100% - 32px);
        padding: 16px;
        background-color: var(--background-color);
        border-radius: 8px;
        margin: 8px 0;
        gap: 1rem;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
            scale: 1.01;
        }

        img{
            width: 75px;
            height: 75px;
            border-radius: 8px;
        }
        .name{
            font-weight: 700;
            font-size: 1.5rem;
        }
        .team{
            font-weight: 300;
            color: var(--text-color);
        }
    }



   

</style>