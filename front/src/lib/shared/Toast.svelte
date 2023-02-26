<script lang="ts">
	import { toastStore, type Toast } from "$lib/stores/toast.store";
    let toasts:Toast[] = [];
    toastStore.subscribe((value) => {
        toasts = value;
    });



  

</script>

<div class="wrapper">
    {#each toasts as toast }
        <div class="toast  {toast.type}" id={toast.id}>
            <span>{toast.message}</span>
        </div>
    {/each}
</div>


<style lang="scss">
    .wrapper{
        position: absolute;
        top: 0;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;
        display: grid;
        place-items: center;
        margin-top: 8px;
        gap: 8px;
    }


    .toast{
        padding: 8px 32px;
        border-radius: 8px;
        color: white;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
        &.success{
            background-color: var(--success-color);
        }
        &.error{
            background-color: var(--error-color);
        }
        &.info{
            background-color: var(--info-color);
        }
    }


</style>