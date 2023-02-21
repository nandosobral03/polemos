<script lang="ts">
    import type { Event } from "$lib/models/event";
	import TableArrow from "./TableArrow.svelte";
    export let events:Event[];
    let currentSort = '';
    let currentDirection:'desc'|'asc' = 'desc';
    const sortBy = (key:string) => {
        if(currentSort === key) {
            events = events.reverse();
            currentDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            return;
        }else{
            currentDirection = 'desc';
        }
        currentSort = key;
        events = events.sort((a,b) => {
                if((a as any)[key] > (b as any)[key]) return -1;
                if((a as any)[key] < (b as any)[key]) return 1;
                return 0;
        });
    }

</script>

<table>
    <thead>
        <tr>
            <th class:active = {currentSort == "attacker_count"} on:click={() => sortBy("attacker_count")}>  <span> #Attacker        <TableArrow direction={currentDirection}  active={currentSort == "attacker_count" } /></span>   </th>
            <th class:active = {currentSort == "victim_count"} on:click={() => sortBy("victim_count")}>    <span> #Victim          <TableArrow direction={currentDirection}  active={currentSort == "victim_count" } />  </span> </th>
            <th class:active = {currentSort == "description"} on:click={() => sortBy("description")}>     <span> Description      <TableArrow direction={currentDirection}  active={currentSort == "description" } /> </span>  </th>
            <th class:active = {currentSort == "direct_damage"} on:click={() => sortBy("direct_damage")}>   <span> Direct Damage    <TableArrow direction={currentDirection}  active={currentSort == "direct_damage" } /> </span>  </th>
            <th class:active = {currentSort == "reflected_damage"} on:click={() => sortBy("reflected_damage")}><span> Reflected Damage <TableArrow direction={currentDirection}  active={currentSort == "reflected_damage" } /> </span>  </th>
            <th class:active = {currentSort == "event_type"} on:click={() => sortBy("event_type")}>      <span> Event Type       <TableArrow direction={currentDirection}  active={currentSort == "event_type" } /> </span>  </th>
        </tr>
    </thead>
    <tbody>
        {#each events as event}
            <tr on:click={() => window.location.href = `/events/${event.id}`} on:keydown={(e) => { if(e.key === 'Enter') window.location.href = `/events/${event.id}`}}>
                <td>{event.attacker_count}</td>
                <td>{event.victim_count}</td>
                <td>{event.description}</td>
                <td>{event.direct_damage}</td>
                <td>{event.reflected_damage}</td>
                <td>{event.event_type}</td>
            </tr>
        {/each}
    </tbody>
</table>
<button class="add" on:click={() => window.location.href = `/events/new`}>
    <span class="material-symbols-outlined">add</span>
</button>


<style lang="scss">
    *{
        user-select: none;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    th, td{
        padding: 12px 15px;
    }

    tr{
        border-radius: 8px;

        &:nth-child(even){
            background-color: var(--background-color-light);
        }
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
        }
    }

    thead{
        tr{
            cursor: inherit;
            &:hover{
                background-color: inherit;
            }
            background-color: var(--background-color-light);
            th{
                &:hover{
                    background-color: var(--highlight-color);
                }
                cursor: pointer;
                span{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                &:global(.active){
                    color: var(--red-color);
                }
            }
        }
        
    }
    .add{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 50px;
        right: 50px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--red-color);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        &:hover{
            background-color: var(--highlight-color);
        }
    }
</style>