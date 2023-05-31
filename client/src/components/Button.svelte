<script>
    export let color = ""
    export let handleClick = () => {
    }
    export let disabled = false

</script>

<button class="button {color}" on:click={handleClick} {disabled}>
    <slot></slot>
</button>

<style>
    .button {
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        max-height: 40px;
    }

    .button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .button.green {
        background-color: rgb(11, 108, 11);
        color: white;
    }


    .button.orange {
        background-color: rgb(239, 75, 5);
        color: white;
    }

    .button.purple {
        background-color: rgb(98, 22, 189);
        color: white;
    }

    .button.blue {
        background-color: rgb(30, 127, 224);
        color: white;
    }

    .button.red {
        background-color: rgb(227, 18, 18);
        color: white;
    }


    .logout-red {
        background-color: #c92e07;
        max-height: 40px;
        color: black;

    }

</style>
