<script>
    import { createEventDispatcher } from "svelte";


    const dispatch = createEventDispatcher();

    const handleStart = () => {
        dispatch('start');
    }
</script>


<div class="container">
    <div class="title">
        <span>Play</span>
    </div>
    <div class="button-cont">
        <button class="start" on:click={handleStart}>
             START
        </button>
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: scroll;
        padding: 0, 50px;
        border: 3px solid var(--primary-color);
        border-radius: 6px;
        background-color: var(--background-color-light);
        color: var(--text-color);

    }
    .button-cont{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .start{
        width: 400px;
        height: 200px;
        border-radius: 20px;
        background-color: var(--primary-color);
        color: white;
        font-size: 2rem;
        cursor: pointer;
        border: none;
    }

    .title{
        padding: 35px;
    }

    .title span{
        font-size: 2em;
        font-weight: 500;
    }
</style>