<script lang="ts">
	import GenericTable from "$lib/shared/GenericTable.svelte";
import type { PageServerData } from "./$types";


    export let data: PageServerData;
    console.log(data);
</script>

<GenericTable
    data={data.players}
    headers={
        [
            {
                key: "image",
                label: "-",
            },
            {
                key: "name",
                label: "Name",
                sortable: true
            },
            {
                key: "team",
                label: "Team",
                sortable: true
            }
        ]
    }
    displayData={
        [
            {
                key: "image",
                transform(value) {
                    return `
                        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                            <img src="${value}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;"/>
                        </div>
                    `
                }
            },
            {
                key: "name",
            },
            {
                key: "team",
                transform(value) {
                    return value ? value : "No Team"; 
                },
            },
        ]
    }
    clickable={true}
    onRowClick={(data) => {
        window.location.href = `/players/${data.id}`;
    }}
    allowCreate={true}
    create={() => {
        window.location.href = "/players/new";
    }}
    />