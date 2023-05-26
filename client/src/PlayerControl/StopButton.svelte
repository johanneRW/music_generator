<script>
    import {stopPlaying} from "../store/playerStore.js";

</script>


<div>
    <button class="orange-button" on:click={stopPlaying}>Stop</button>
</div>

<style>

    .orange-button {
        background-color: rgb(239, 75, 5);
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