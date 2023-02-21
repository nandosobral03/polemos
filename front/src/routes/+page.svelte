<script lang="ts">
    
</script>
    <div class="hero">
        Polemos
        <span class="sub">Text-based battle simulator</span>
    </div>  
  
<style lang="scss">
    .hero{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: clamp(5rem, 10vw, 10rem);
        background: linear-gradient(225deg, var(--primary-color), var(--primary-color) 50%, var(--highlight-color) 50%, var(--highlight-color));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 900;
        user-select: none;
        .sub{
            font-size: 2rem;
            font-weight: 400;
            color: var(--text-color);
        }
    }
</style>
