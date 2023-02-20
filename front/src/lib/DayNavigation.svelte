<script>
  import { createEventDispatcher } from "svelte";


    export let currentDay = 0;
    export let days = [];
  $: currentNavigationDays = getNavigationDays(currentDay);
  const getNavigationDays = (currentDay) => {
    let navigationDays = [];
    for (let i = currentDay-1; i < currentDay+2; i++) {
      navigationDays.push(i);
    }
    navigationDays =navigationDays.filter((day) => day >= 0 && day < days.length);
    if(currentDay != 0 && navigationDays[0] != 0){
      navigationDays.unshift(0);
      }
    if(currentDay != days.length-1 && navigationDays[navigationDays.length-1] != days.length-1){
      navigationDays.push(days.length-1);
    }
    return navigationDays;
  }
  const dispatch = createEventDispatcher();

  const handleNavigation = (day) => {
    let currentDay = day
    dispatch("navigation", {currentDay});
  };

</script>


<div class="navigation">
    {#if currentDay < 3}
      {#each currentNavigationDays.slice(0, currentNavigationDays.length-1) as day}
        <button class="start" on:click={() => handleNavigation(day)}  class:active={day == currentDay}>{day+1}</button>
      {/each}
      <p>...</p>
      <button class="start" on:click={() => handleNavigation(days.length-1)}  class:active={days.length-1 == currentDay}>{days.length}</button>
    {:else if currentDay > currentNavigationDays[currentNavigationDays.length-1]-3}
      <button class="start" on:click={() => handleNavigation(0)}  class:active={0 == currentDay}>1</button>
      <p>...</p>
      {#each currentNavigationDays.slice(1, currentNavigationDays.length) as day}
        <button class="start" on:click={() => handleNavigation(day)}  class:active={day == currentDay}>{day+1}</button>
      {/each}  
      {#if currentDay == days.length-1}
        <button class="start" on:click={() => handleNavigation(days.length)}>End</button>
      {/if}
    {:else}
      <button class="start" on:click={ () => handleNavigation(0) }  class:active={0 == currentDay}>1</button>
      <p>...</p>
      {#each currentNavigationDays.slice(1, currentNavigationDays.length-1) as day}
        <button class="start" on:click={() => handleNavigation(day)}  class:active={day == currentDay}>{day+1}</button>
      {/each}
      <p>...</p>
      <button class="start" on:click={() => handleNavigation(days.length-1)}  class:active={days.length-1 == currentDay}>{days.length}</button>
      {/if}

  </div>

  <style>
     .navigation{
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px;
  }
  .active{
    background-color: var(--highlight-color)!important;
    color: var(--text-color);
  }
  .start {
    width: 50px;
    height: 50px;
    border-radius: 6px;
    background-color: var(--primary-color);
    color: var(--text-color);
    font-size: 1rem;
    cursor: pointer;
    border: none;
  }
  </style>