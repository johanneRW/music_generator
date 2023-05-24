<script>
    import {playNNMelody} from "../store/playerStore.js";

    async function handlePlay() {
        await playNNMelody()
    }

</script>

<!-- Knapper -->
<div>
    <button class="dark-green-button" on:click={handlePlay}>Play NN</button>

</div>

<style>
    .dark-green-button {
        background-color: rgb(11, 108, 11);
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


</style>