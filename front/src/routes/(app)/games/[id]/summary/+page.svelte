<script lang="ts">
	import { browser } from "$app/environment";
    import type { PageData } from "./$types";
    export let data : PageData;
    let mobile = false;
    let width = 1200;
    $ : mobile = width < 768;
    if(browser){
        width = window ? window.innerWidth : 0;
        window?.addEventListener("resize", () => {
        width = window.innerWidth;
        });
    }
</script>

<div class="wrapper">
    {#if data.winner}
        <span >Winner</span>
        <img src={data.winner.image} alt={data.winner.name} />
        <div class="winner">
            <span class="name">{data.winner.name}</span>
            <span class="team">
                From {data.winner.sponsor}'s {data.winner.team}    
            </span>
        </div>
    {:else}
        <span >Everyone died</span>
    {/if}
        <div class="stats">
            <span >Most Kills</span>
            <div class="most-kills" class:mobile={mobile}>
                {#each data.mostKills as most}
                <div class="winner">
                    <img src={most.image} alt={most.name} />
                        <span class="name">{most.name}</span>
                        <span class="team">
                            {most.sponsor}'s {most.team}    
                        </span>
                        <span class="kills">{most.kills} kills</span>
                    </div>
                {/each}
            </div>
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
        min-height: 100%;
        *{
            user-select: none;
        }
       
        >span{
            font-size: 2rem;
            font-weight: bold;
        }

       img{
              width: 150px;
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
                font-size: 1.8rem;
                font-weight: bold;
            }
            .team{
                font-size: 1.2rem;
                font-weight: bold;
            }
           
        }

        .most-kills{
           

            img{
                width: 100px;
                aspect-ratio: 1/1;
                box-shadow: 0 0 10px 0 var(--red-color);
                &:hover{
                    box-shadow: 0 0 10px 0 var(--red-color), 0 0 20px 0 var(--red-color);
                }
            }
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 3rem;

            .name{
                font-size: 1.5rem;
                font-weight: bold;
                flex-grow: 1;
            }
            .team{
                font-size: 1rem;
                font-weight: bold;
            }
            .kills{
                font-size: 1rem;
                font-weight: bold;
            }


            &.mobile{
                flex-direction: column;
                gap: 1rem;
            }

        }
    }

    .stats{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        border-top: 1px solid var(--highlight-color);
        span{
                font-size: 1.5rem;
                font-weight: bold;
            }
        font-size: 1rem;
    }

    button{
        background-color: var(--highlight-color);
        border: none;
        border-radius: 8px;
        padding: 8px;
        cursor: pointer;
        &:hover{
            background-color: var(--background-color);
        }
        a{
            text-decoration: none;
            color: var(--text-color);
        }
    }

  

</style>