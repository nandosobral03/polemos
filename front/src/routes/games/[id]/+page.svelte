<script lang="ts">
	import type { PageServerData } from "./$types";
    export let data : PageServerData;

    export let days = data.game.days;

    const gotoDay = (day : number) => {
        window.location.href = `/games/${data.game.id}/${day}`;
    }

</script>

<div class="day-list">
    {#each days as day}
        <div on:click={() => gotoDay(day.number)}  on:keydown={(e) => e.key === "Enter" && gotoDay(day.number)} >
            <span class="day">Day {day.number}</span>
            <div>
                <span> Events: {day.events}</span> <span>Deaths: {day.dead}</span>
            </div>
        </div>
    {/each}

</div>


<style lang="scss">
    .day-list{
        display: flex;
        flex-direction: column;
        > div{
            padding: 16px;
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            &:nth-child(odd){
                background-color: var(--background-color);
            }
            cursor: pointer;
            &:hover{
                background-color: var(--highlight-color);
            }

            .day{
                font-weight: bold;
                margin-right: 1rem;
            }
            div{
                display: flex;
                gap: 2rem;  
                span{
                    width: 5rem;
                }
            }
        }
    }
</style>