<script lang="ts">
    import type { PageServerData } from "./$types";
    export let data : PageServerData;
    console.log(data);
</script>

<div class="wrapper">
        <img src={data.winner.image} alt={data.winner.name} />
        <div class="winner">
            <span class="name">{data.winner.name}</span>
            <span class="team">
                {data.winner.sponsor}'s {data.winner.team}    
            </span>
            
        </div>
    <button>
        <a href={`/games/${data.gameId}`}>Back to game</a>
    </button>
</div>

<style lang="scss">
    .wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        height: 100%;
        *{
            user-select: none;
        }
       

       img{
              width: 30%;
              aspect-ratio: 1/1;
              border-radius: 16px;
              box-shadow: 0 0 10px 0 var(--highlight-color);
              &:hover{
                  box-shadow: 0 0 10px 0 var(--highlight-color), 0 0 20px 0 var(--highlight-color);
                }
       }
       .winner{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .name{
                font-size: 2rem;
                font-weight: bold;
            }
            .team{
                font-size: 1.5rem;
                font-weight: bold;
            }
           
        }
    }

    button{
        background-color: var(--highlight-color);
        border: none;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        &:hover{
            background-color: var(--red-color);
        }
        a{
            text-decoration: none;
            color: var(--text-color);
        }
    }

</style>