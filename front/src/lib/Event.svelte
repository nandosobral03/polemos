<script>
  import statuses from "../data/status.js";
  
  export let roaster = [];
  export let event = {};

  const getName = (id) => {
    return roaster.find((player) => player.id == id)?.name || "no name";
  };
  const getImage = (id) => {
    return roaster.find((player) => player.id == id)?.img || "no image";
  };

  const getHpChange = (id) => {
    let player = roaster.find((player) => player.id == id);
    let diff = player.health - player.previousHealth;
    let color = diff > 0 ? "var(--green-color)" : diff < 0 ? "var(--red-color)" : "var(--text-highlight-color)";
    let element  = 
    `<span style="color: ${color}" class="hp-change-text">
    ${player.previousHealth > 0 ? player.previousHealth : 0}
    <span class="material-symbols-outlined">
      arrow_right_alt
    </span>
      ${
        player.health > 0 ? player.health : 0
      }
    </span>
      `;
    return element;
  };


  const getStatusChange = (id) => {
    let player = roaster.find((player) => player.id == id);
    if(player.previousStatus != player.status){
      let element  = 
      `<span class="hp-change-text">
        ${statuses[player.previousStatus].text}
      <span class="material-symbols-outlined">
        arrow_right_alt
      </span>
      ${statuses[player.status].text}
      </span>
      `;
      return element;
    }
    return "";
  };

  const getStatusShadow = (id) => {
    let player = roaster.find((player) => player.id == id);
      let status = statuses[player.status]
      return `box-shadow: 0px 0px 10px 5px ${status.color};`
  };

  const getImageClass = (id) => {
    let player = roaster.find((player) => player.id == id);
    if (player && player.health <= 0) {
      return "player-img-dead";
    }
    return "player-img";
  };

</script>

<div class="event-container">
  <p class="description">{event.message}</p>
  <div
    class={event.atk.length == 0 || event.def.length == 0
      ? "player-container-centered"
      : "player-container"}
  >
    {#if event.atk.length != 0}
      <div class="atk">
        {#each event.atk as atk}
        <div class="player-info">
          <img alt="player" class="{getImageClass(atk)}" src={getImage(atk)} />
          <div class="hp-change">
            <span>{@html getHpChange(atk)}</span>
            <span>{@html getStatusChange(atk)}</span>
          </div>
        
        </div>
        {/each}
      </div>
    {/if}
    {#if event.def.length != 0}
      <div class="atk">
        {#each event.def as def}
        <div class="player-info">
          <img alt="player" class="{getImageClass(def)}" src={getImage(def)} style="{getStatusShadow(def)}" />
          <div class="hp-change">
            <span >{@html getHpChange(def)}</span>
            <span>{@html getStatusChange(def)}</span>
          </div>
        </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .event-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: var(--background-color);
    color: white;
    margin: 0px 20px;
  }
  .player-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 100px);
    margin: 50px;
  }
  .player-container-centered {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: calc(100% - 100px);
    margin: 10px;
  }

  .atk {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    gap: 10px;
    width: 50%;
  }
  .player-img{
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 10%;
    }


  .player-img-dead {
      height: 120px;
      width: 120px;
      object-fit: cover;
      border-radius: 10%;
      filter: grayscale(100%);
  }

  .player-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 200px;
    gap: 5px;
    width: 200px;
  }

  .hp-change{
    display: flex;
    flex-direction: column;
    align-items: center;
  }



  .description{
    font-size: 1rem;
    margin:20px;
  }



</style>
