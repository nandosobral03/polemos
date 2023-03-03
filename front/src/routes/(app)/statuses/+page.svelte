<script lang="ts">
	import type { PageData } from "./$types";
    import GenericTable from "$lib/shared/GenericTable.svelte";

    export let data : PageData;
    console.log(data);

</script>

<GenericTable
    data={data.statuses}
    headers={
        [
            {
                key: "color",
                label: "-",
            },
            {
                key: "name",
                label: "Name",
                sortable: true
            },
            {
                key: "damage_reduction",
                label: "Damage Multiplier",
                sortable: true
            },
            {
                key:"health_increase",
                label: "Health Multiplier",
                sortable: true
            }
        ]
    }

displayData={
        [
            {
                key: "color",
                transform(value) {
                    return `
                        <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;" >
                            <div style="width: 48px; height: 48px; border-radius: 8px; background-color: ${value};"></div>
                        </div>
                    `
                }
            },
            {
                key: "name",
            },
            {
                key: "damage_reduction",
                transform(value) {
                    return `x${value}`;
                }
            },
            {
                key: "health_increase",
                transform(value) {
                    return `x${value}`;
                }
            },
        ]
    }
    clickable={true}
    onRowClick={(data) => {
        window.location.href = `/statuses/${data.id}`;
    }}
    allowCreate={true}
    create={() => {
        window.location.href = "/statuses/new";
    }}

/>
