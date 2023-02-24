<script lang="ts">
	import type { PageServerData } from "./$types";
	import GameTable from "./GameTable.svelte";
    export let data : PageServerData;
    console.log(data);
</script>

<div class="events-list">
    <GameTable games={data.games} />
</div>

