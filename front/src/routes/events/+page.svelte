<script lang="ts">
	import GenericTable from "$lib/shared/GenericTable.svelte";
import type { PageServerData } from "./$types";
    export let data : PageServerData;
    
</script>

    <GenericTable 
        data={data.events}
        headers={[
            {key: 'attacker_count', label: '#Attacker' , sortable:true},
            {key: 'victim_count', label: '#Victim' , sortable:true},
            {key: 'description', label: 'Description' , sortable:true},
            {key: 'direct_damage', label: 'Direct Damage' , sortable:true},
            {key: 'reflected_damage', label: 'Reflected Damage' , sortable:true},
            {key: 'event_type', label: 'Event Type' , sortable:true},
        ]}
        
        onRowClick={(event) => window.location.href = `/events/${event.id}`}
        displayData={[
            {
                key: 'attacker_count',
            },
            {
                key: 'victim_count',
            },
            {
                key: 'description',
            },
            {
                key: 'direct_damage',
            },
            {
                key: 'reflected_damage',
            },
            {
                key: 'event_type',
            }
        ]}
         clickable={true}
         allowCreate={true}
        create={() => {
            window.location.href = `/events/new`;
        }}
        />
