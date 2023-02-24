<script lang="ts">
	import type { PageServerData } from "./$types";
	import EventTable from "./EventTable.svelte";
    export let data : PageServerData;
    
</script>

<div class="events-list">
    <EventTable events={data.events} />
</div>

