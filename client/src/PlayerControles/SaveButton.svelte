<script>
    import Button from './Button.svelte';
    import {addToArchive} from "../store/archiveStore.js";


    function saveMelody() {
        addToArchive()
        //TODO:tilføj funktionalitet
    }
</script>

<Button color="purple" handleClick={saveMelody}>Save Melody</Button>

<!--
<script>

    import {addToArchive} from "../store/archiveStore.js";

    function saveMelody() {
        addToArchive()

    }


</script>

<div>

    <button class="purple-button" on:click={saveMelody}>Save Melody</button>

</div>

<style>

    .purple-button {
        background-color: rgb(98, 22, 189);
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
</style>-->

