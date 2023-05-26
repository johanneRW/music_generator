<script>
    import {clearUserMelody} from "../store/playerStore.js";


    function clearNoteLog() {
        clearUserMelody()
    }
</script>


<div>
    <button class="red-button" on:click={clearNoteLog}>Clear Note Log</button>
</div>

<style>
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
</style>