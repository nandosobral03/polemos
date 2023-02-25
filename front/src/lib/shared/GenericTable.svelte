<script lang="ts">
	import TableArrow from "../../lib/shared/TableArrow.svelte";
    export let data:any[];
    let currentSort = '';
    let currentDirection:'desc'|'asc' = 'desc';
    export let allowCreate = false;
    export let create = () => {};
    export let clickable = false;
    export let onRowClick = (data:any) => {};
    export let headers:{key:string, label:string, sortable?:boolean}[] = [];
    export let displayData : {
        key:any,
        transform?:(value:any) => string,
    }[] = [];
    const sortBy = (key:string) => {
        if(currentSort === key) {
            data = data.reverse();
            currentDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            return;
        }else{
            currentDirection = 'desc';
        }
        currentSort = key;
        data = data.sort((a,b) => {
                if((a as any)[key] > (b as any)[key]) return -1;
                if((a as any)[key] < (b as any)[key]) return 1;
                return 0;
        });
    }

</script>

<table>
    <thead>
        <tr>
            {#each headers as header}
                {#if header.sortable}
                    <th class:active = {currentSort == header.key} on:click={() => sortBy(header.key)}>  <span> {header.label}        <TableArrow direction={currentDirection}  active={currentSort == header.key } /></span>   </th>
                {:else}
                    <th class="unsortable"> {header.label} </th>
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each data as value}
            

            <tr on:click={() => onRowClick(value)} on:keydown={(e) => { if(e.key === 'Enter') onRowClick(value)}} tabindex={clickable ? 0 : -1} class:clickable={clickable}>
                {#each displayData as display}
                    <td> 
                        {@html  display.transform ? display.transform((value)[display.key]) : (value)[display.key]}
                {/each}            
            </tr>
        {/each}
    </tbody>
</table>
{#if allowCreate}
    <button class="add" on:click={create}>
        <span class="material-symbols-outlined">add</span>
    </button>
{/if}


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
      
        &.clickable{
            cursor: pointer;
            &:hover{
                background-color: var(--highlight-color);
            }
        }
    }

    thead{
        tr{
            cursor: inherit;
            &:hover{
                background-color: inherit;
            }
            .unsortable{
                cursor: inherit;
                &:hover{
                    background-color: inherit;
                }
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