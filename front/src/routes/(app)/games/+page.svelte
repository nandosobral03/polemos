<script lang="ts">
	import GenericTable from "$lib/shared/GenericTable.svelte";
import type { PageData } from "./$types";
    export let data : PageData;
</script>

    <GenericTable 
        data={data.games}
        headers={[
            {key: 'days', label: 'Days', sortable:true},
            {key: 'date', label: 'Date', sortable:true},
        ]}
        onRowClick={
            (game) => {
                window.location.href = `/games/${game.id}`;
            }
        }
        displayData={
            [{
                key: 'days',
                transform: (days) => `${days} ${days == 1 ? 'day' : 'days'}`
            },
            {
                key: 'date',
                transform: (date) => new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })
            }
            ]
        }
         clickable={true}
    />


