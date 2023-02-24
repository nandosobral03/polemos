<script lang="ts">
    import type { Game } from "$lib/models/game";
	import TableArrow from "../../lib/shared/TableArrow.svelte";
    export let games:Game[];
    let currentSort = '';
    let currentDirection:'desc'|'asc' = 'desc';
    const sortBy = (key:string) => {
        if(currentSort === key) {
            games = games.reverse();
            currentDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            return;
        }else{
            currentDirection = 'desc';
        }
        currentSort = key;
        games = games.sort((a,b) => {
                if((a as any)[key] > (b as any)[key]) return -1;
                if((a as any)[key] < (b as any)[key]) return 1;
                return 0;
        });
    }

</script>

<table>
    <thead>
        <tr>
            <th class:active = {currentSort == "days"} on:click={() => sortBy("days")}>  <span> Days        <TableArrow direction={currentDirection}  active={currentSort == "days" } /></span>   </th>
            <th class:active = {currentSort == "date"} on:click={() => sortBy("date")}>      <span> Date       <TableArrow direction={currentDirection}  active={currentSort == "date" } /> </span>  </th>
        </tr>
    </thead>
    <tbody>
        {#each games as game}
            <tr on:click={() => window.location.href = `/games/${game.id}`} on:keydown={(e) => { if(e.key === 'Enter') window.location.href = `/games/${game.id}`}}>
                <td>{game.days} {game.days == 1 ? 'day' : 'days'}</td>
                <td>{new Date(game.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</td>
            </tr>
        {/each}
    </tbody>
</table>

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