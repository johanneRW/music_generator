<!--<script>
    export let color = '';
    export let handleClick = () => {};
</script>

<button class="button {color}" on:click={handleClick}>
    <slot />
</button>-->

<!-- Button.svelte -->

<script>
    export let color = '';
    export let handleClick = () => {};
    export let disabled = false;
</script>

<button class="button {color}" on:click={handleClick} {disabled}>
    <slot></slot>
</button>

<style>
    .button {
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }

    .button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .button.dark-green {
        background-color: rgb(11, 108, 11);
    }


    .button.orange{
        background-color: rgb(239, 75, 5);
    }

    .button.purple{
        background-color: rgb(98, 22, 189);}

    .button.green{
        background-color: rgb(40, 188, 40);}

    .button.blue {
        background-color: rgb(30, 127, 224);}

    .button.red {
        background-color: rgb(227, 18, 18);}

</style>
