<script>
    import {userMelody, userMelodyPosition} from "../store/playerStore.js";
</script>

<!-- Log visning -->
<div class="container">
    <h2>User Melody:</h2>
    {#each $userMelody as note, index}
        <p class:selected={$userMelodyPosition === index} class=item>{note}</p>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .item {
        width: 30px;
        height: 30px;
        margin: 5px;
    }

    .container p.selected {
        background-color: yellow;
    }
</style>