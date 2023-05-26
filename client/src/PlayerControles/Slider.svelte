<script>
    //TODO:bind til store

    export let value = 1;
    export let min = 0;
    export let max = 2;
    export let step = 0.1;
    export let default_value = 1;


    function reset() {
        value = default_value;
    }
</script>

<label>
    <input type="range" bind:value={value} {min} {max} {step} />
    <button on:click={reset}>Reset</button>
</label>
