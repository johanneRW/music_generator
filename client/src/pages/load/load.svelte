<script>
    import {onDestroy} from "svelte";
    import {
        clearLoadedMelody, getNoteName, isPlaying, loadedDelay,
        loadedMelody,
        loadedMelodyPosition, nnDelay, nnMelody, playLoadedMelody, stopPlaying, userMelody,
    } from "../../store/playerStore.js";
    //import StopButton from "../../PlayerControles/StopButton.svelte";
    import Visualizer from "../generator/Visualizer.svelte";
    //import PlayLoadMelodyButton from "../../PlayerControles/PlayLoadMelodyButton.svelte";

    //import LoadSaveButton from "../../PlayerControles/LoadSaveButton.svelte";
    import {globalHistory} from "svelte-navigator";
    //import LoadDelaySlider from "../../PlayerControles/LoadDelaySlider.svelte";
    import Button from "../../PlayerControles/Button.svelte";
    import {addToArchive} from "../../store/archiveStore.js";
    import {get} from "svelte/store";
    import Slider from "../../PlayerControles/Slider.svelte";
    import {user} from "../../store/store.js";


    let from = globalHistory.location.state ? globalHistory.location.state.from : null;
    let isFromArchive = from === 'archive';

    async function handlePlayLoadedMelody() {
        await playLoadedMelody()
    }

    function saveMelody() {
        addToArchive(get(loadedMelody))
    }

    onDestroy(() => {
        clearLoadedMelody()
    })
</script>

<div>
    <div class="row">
        <!--<LoadDelaySlider/>-->
        <p>Delay: {$loadedDelay}</p>
        <Slider disabled={($isPlaying)} bind:value={$loadedDelay} min={0} max={700} step={50} default_value={500} />

    </div>
    <br>
    <!--<LoadNoteLog/>-->
    <div class="melodyContainer">
        <h2>Loaded Melody:</h2>
        <div class="melody">
            {#each $loadedMelody as note, index}
                <p class:selected={$loadedMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>
    <br>
    <div class="row">
        <!--<PlayLoadMelodyButton/>-->
        <Button disabled={($loadedDelay.length === 0||$isPlaying)} color="dark-green" handleClick={handlePlayLoadedMelody}>Play loaded button
        </Button>
        <!--<StopButton/>-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        {#if !isFromArchive}
            <!--<LoadSaveButton/>-->
            <Button disabled={($loadedMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveMelody}>Save loadMelody Melody</Button>
        {/if}
    </div>
    <!--<Visualizer/>-->
    <Visualizer {loadedMelody}{loadedMelodyPosition} />
</div>

<style>
    .row {
        display: flex;
    }

    .melodyContainer {
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

    .melodyContainer p.selected {
        background-color: rgb(255, 206, 43);
        border-radius: 20px;
    }

</style>

