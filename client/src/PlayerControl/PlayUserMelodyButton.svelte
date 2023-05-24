<script>
    import {playUserMelody} from "../store/playerStore.js";

    async function handlePlay() {
        await playUserMelody()
    }


</script>

<!-- Knapper -->
<div>
    <button class="green-button" on:click={handlePlay}>Play</button>

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
</style>