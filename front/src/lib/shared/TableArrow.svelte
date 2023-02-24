<script lang="ts">
    export let direction: 'asc' | 'desc';
    export let active : boolean;

</script>

<div style:visibility={active ? 'visible' : 'hidden'}>
    {#if direction === 'asc'}
        <span class="material-symbols-outlined"> arrow_drop_up </span>
        {:else}
        <span class="material-symbols-outlined"> arrow_drop_down </span>
    {/if}
</div>

<style lang="scss">
</style>