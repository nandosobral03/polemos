<script lang="ts">
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
	import EventTable from "./EventTable.svelte";
    export let data : PageServerData;
    
    onMount(async () => {
        console.log(data);
    });

</script>

<div class="events-list">
    <EventTable events={data.events} />
</div>

<style lang="scss">


</style>