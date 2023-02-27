<script lang="ts">
	import { goto } from '$app/navigation';
    import userStore from '$lib/stores/user.store';
    let username = '';
    let password = '';

    const login = async () => {
        const {token} = await userStore.login(username,password);
        localStorage.setItem('token', token);
        goto('/events');        
    }

    const guestLogin = async () => {
        const {token} = await userStore.guestLogin();
        localStorage.setItem('token', token);
        goto('/events');        
    }

</script>

<div class="wrapper">
    <div class="login">
        <img src="/favicon.png" alt="logo" />
        <input type="text" placeholder="Username"  bind:value={username}>
        <input type="password" placeholder="Password"  bind:value={password}>
        <button type="button" on:click={login}>Login</button>
        <button type="button" on:click={guestLogin} disabled>Play as guest</button>
    </div>
</div>

<style lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    img{
        width: 100px;
        height: 100px;
        margin-bottom: 16px;
    }

    .login{
        width: clamp(300px, 80svw, 450px);
        background-color: var(--background-color);
        color: var(--text-color);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px;
        gap: 8px;
        input{
            line-height: 1.2rem;
            width: 80%;
            margin: 8px 0;
            padding: 8px;
            border: none;
            border-radius: 5px;
            background-color: var(--background-color);
            color: var(--text-color);
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            &:focus{
                outline: 1px solid var(--highlight-color);
            }
        }
        button{
            cursor: pointer;
            width: 80%;
            margin: 8px 0;
            font-size: 1.2rem;
            padding: 16px;
            border: none;
            border-radius: 5px;
            background-color: var(--highlight-color);
            color: var(--text-color);
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            &:focus{
                outline: none;
            }
        }
    }
</style>