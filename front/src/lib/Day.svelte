<script>
  import DayNavigation from "./DayNavigation.svelte";
import Event from "./Event.svelte";
  export let currentDay = 0;
  export let days;
  console.log(days[currentDay] || "no days");
  const handleNavigation = (event) => {
    currentDay = event.detail.currentDay;
    document.getElementById("title").scrollIntoView();
    console.log(
      currentDay > 0 &&
        days &&
        !days[currentDay] &&
        (days[currentDay - 1].alive.length == 1 ||
          days[currentDay - 1].alive.length == 0)
    );
  };

 
</script>

<div class="container">
  <div class="title" id="title">
    <span>Day {currentDay + 1}</span>
  </div>
  <div class="event-list">
    {#if currentDay > 0 && days && !days[currentDay] && (days[currentDay - 1].alive.length == 1 || days[currentDay - 1].alive.length == 0)}
      <div class="finished">
        <p class="gameover">Game Over</p>
        <div class="winner">
          {#if days[currentDay - 1].alive.length == 1}
            <img src="{days[currentDay - 1].alive[0].img}" alt="winner" class="winner-img" />
            <p >
              {days[currentDay - 1].alive[0].name} wins! with {days[
                currentDay - 1
              ].alive[0].kills} {days[currentDay - 1].alive[0].kills == 1
                ? "kill"
                : "kills"}
            </p>
          {:else}
            <p >Everyone died</p>
          {/if}
        </div>
        <div class="button-cont">
          {#if currentDay > 0}
            <button class="start" on:click={() => handleNavigation({detail:{currentDay:currentDay-1}})}>Previous Day</button>
          {/if}
          <button class="start" on:click={() => window.location.reload()}
            >Restart</button
          >
        </div>
      </div>
    {:else}
      {#if days[currentDay]}
        {#each days[currentDay].eventMessages as event}
          <Event
            {event}
            roaster={days[currentDay].alive.concat(days[currentDay].dead)}
          />
        {/each}
      {/if}
        <DayNavigation {currentDay} {days} on:navigation={handleNavigation} />
    {/if}
  </div>
</div>

<style>
 
 
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    padding: 0, 50px;
    border: 3px solid var(--primary-color);
    border-radius: 6px;
    background-color: var(--background-color-light);
    color: var(--text-color);
    justify-content: space-between;
  }
  .title {
    padding: 35px;
  }

  .title span {
    font-size: 2em;
    font-weight: 500;
  }
  .button-cont {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px;
    max-height: 100px;
  }
  .start {
    width: 150px;
    height: 50px;
    border-radius: 6px;
    background-color: var(--primary-color);
    color: var(--text-color);
    font-size: 1rem;
    cursor: pointer;
    border: none;
  }

  .event-list {
    gap: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .finished{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .gameover{
    font-size: 2.5em;
    font-weight: 500;
  }

  .winner{
    font-size: 1.5em;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .winner-img{
    width: 250px;
    height: 250px;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 var(--highlight-color);
    -webkit-box-shadow: 0 0 10px 0 var(--highlight-color);

  }
</style>
