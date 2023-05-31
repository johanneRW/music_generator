<script>
    import {onDestroy, onMount} from "svelte"
    import {
        clearLoadedMelody, getNoteName, isPlaying, loadedDelay,
        loadedMelody, loadedMelodyPosition, playLoadedMelody, stopPlaying,
    } from "../../store/playerStore.js"
    import {addToArchive} from "../../store/archiveStore.js"
    import {get} from "svelte/store"
    import Visualizer from "../generator/Visualizer.svelte"
    import Slider from "../../components/Slider.svelte"
    import Button from "../../components/Button.svelte"
    import {user} from "../../store/userStore.js"
    import toastr from "toastr"
    import {globalHistory} from "svelte-navigator"

    let from = globalHistory.location.state ? globalHistory.location.state.from : null
    let isFromArchive = from === "archive"

    onMount(() => {
        if (isFromArchive) {
            return
        }
        const melodyParam = sessionStorage.getItem("newMelody")
        if (melodyParam) {
            const melody = JSON.parse(melodyParam)
            loadedMelody.set(melody)
            // Remove the melody from session storage to avoid confusion.
            sessionStorage.removeItem("newMelody")
        }
    })

    async function handlePlayLoadedMelody() {
        await playLoadedMelody()
    }

    function saveMelody() {
        toastr.info("Saved melody!")
        addToArchive(get(loadedMelody))
    }

    onDestroy(() => {
        clearLoadedMelody()
    })
</script>

<p class="pageIntroduction">
    This page can be used to play a melody, either loaded from the archive, or received from another user.
</p>
<div>
    {#if $loadedMelody.length === 0}
        <p>There is no playable melody, please select a melody from your archive.</p>
    {:else}
        <!--Melody notelog for loaded melody-->
        <div class="melodyContainer">
            <h2>Loaded Melody:</h2>
            <div class="melody">
                {#each $loadedMelody as note, index}
                    <p class:selected={$loadedMelodyPosition === index} class=item>{getNoteName(note)}</p>
                {/each}
            </div>
        </div>
        <br>
        <!-- Delay-slider for loaded melody-->
        <label>
            Delay: {$loadedDelay}
            <Slider disabled={($isPlaying)} bind:value={$loadedDelay} min={0} max={700} step={50} default_value={500}/>
        </label>
        <div class="row">
            <!--Button for playing loaded melody-->
            <Button disabled={($loadedMelody.length === 0||$isPlaying)} color="green"
                    handleClick={handlePlayLoadedMelody}>Play
            </Button>
            <!--Button for stopping playing melody-->
            <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
            {#if !isFromArchive}
                <!--Button for saving loaded melody - not sowed if user loaded from archive-->
                <Button disabled={($loadedMelody.length === 0||!$user.isLoggedIn)} color="purple"
                        handleClick={saveMelody}>
                    Save Melody
                </Button>
            {/if}
        </div>
        <!--Visualizer for loaded melody-->
        <Visualizer source="loadedMelody"/>
    {/if}
</div>

<style>
    .row {
        display: flex;
    }

    .melodyContainer {
        padding: 4vh 4vw 8vh 2vw;
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

