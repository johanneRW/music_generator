<script>
    import {clearUserMelody, playUserMelody, stopPlaying} from "../store/playerStore.js";

    async function handlePlay() {
        await playUserMelody()
    }

    function genrateResponse() {
        // TODO: get NN melody from store
    }

    function clearNoteLog() {
        clearUserMelody()
    }
</script>

<!-- Knapper -->
<div>
    <button class="green-button" on:click={handlePlay}>Play</button>
    <button class="blue-button" on:click={genrateResponse}>Generate response</button>
    <button class="red-button" on:click={clearNoteLog}>Clear Note Log</button>
    <button class="red-button" on:click={stopPlaying}>Stop</button>
</div>

<style>
    .green-button {
        background-color: rgb(40, 188, 40);
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

    .red-button {
        background-color: rgb(227, 18, 18);
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

    .blue-button {
        background-color: rgb(30, 127, 224);
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