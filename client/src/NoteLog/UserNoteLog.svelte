<script>
    import {getNoteName, userMelody, userMelodyPosition} from "../store/playerStore.js";
</script>

<!-- Log visning -->
<div class="container">
    <h2>User Melody:</h2>
    <div class="melody">
    {#each $userMelody as note, index}
        <p class:selected={$userMelodyPosition === index} class=item>{getNoteName(note)}</p>
    {/each}
    </div>
</div>

<style>
    container {
       display: flex;
       flex-wrap: wrap;
    }

    .melody {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
    }

    .item {
        width: 30px;
        height: 30px;
        margin: 5px;
        text-align: center;
    }

    .container p.selected {
        background-color: rgb(255, 206, 43);
        border-radius: 20px;
    }
</style>