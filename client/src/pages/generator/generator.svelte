<script>

    import {onDestroy, onMount, tick} from "svelte";
    import {
        clearNNMelody, getNoteName,
        isPlaying, nnDelay,
        nnMelody,
        nnMelodyPosition,
        playNNMelody,
        stopPlaying,
    } from "../../store/playerStore.js";
    import Visualizer from "./Visualizer.svelte";
    import Button from "../../PlayerControles/Button.svelte";
    import {addToArchive} from "../../store/archiveStore.js";
    import {get} from "svelte/store";
    import {generateMelody, nVocab, temperature} from "../../store/NNStore.js";
    import Slider from "../../PlayerControles/Slider.svelte";
    import * as tf from "@tensorflow/tfjs";
    import toastr from "toastr"
    import {socket} from "../../store/socketStore.js";
    import {user} from "../../store/store.js";


    let model
    let isDisabled = false;

    onMount(async ()=>{
        model = await tf.loadLayersModel("model.json");
    })


    //This is kind of a hack but everything else didn't work for me
    async function handleGenerateFunction() {
        isDisabled = true;
        await tick(); // Update DOM before generating melody
        setTimeout(async () => {
            await genrateMelody() ;
            isDisabled = false;
            await tick(); // Update DOM after generating melody
        }, 50); // Delay of 50 milliseconds
    }
    async function genrateMelody() {
        // Generate melody based on random seed
        let randomSeed = Array.from({length: 50}, () => Math.floor(Math.random() * nVocab));
        let melody = await generateMelody(model, randomSeed)
        nnMelody.set(melody)
        $socket.emit("newMelodyMessage", melody)
        console.log("Sent message")
    }

    function saveMelody() {
        addToArchive(get(nnMelody))
        toastr.info("Saved NN melody!")
    }

    async function handlePlay() {
        await playNNMelody()
    }

    onDestroy(() => {
        clearNNMelody()
    })

</script>

<div>
    <div class={isDisabled ? '' : 'hidden'} id="progress">
        Generating a new melody ...
    </div>
    <div class="row">
        <!--<NNDelaySlider/>-->
        <p>Delay: {$nnDelay}</p>
        <Slider disabled={($isPlaying||isDisabled)} bind:value={$nnDelay} min={0} max={700} step={50} default_value={500} />

    </div>
    <br>
    <br>
    <!--<GenerateMelodyButton/>-->
    <p>Temperature: {$temperature}</p>
    <Slider disabled={($isPlaying||isDisabled)} bind:value={$temperature} min={0} max={2} step={0.1} default_value={1} />
    <Button disabled={isDisabled} color="blue" handleClick={handleGenerateFunction}>Generate random melody</Button>
    <!--<NNNoteLog/>-->
    <div class="melodyContainer">
        <h2>Generated Melody:</h2>
        <div class="melody">
            {#each $nnMelody as note, index}
                <p class:selected={$nnMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
        </div>
        <div class="row">
            <!--<PlayNNMelodyButton/>-->
            <Button disabled={($nnMelody.length === 0||$isPlaying)} color="dark-green" handleClick={handlePlay}>Play NN</Button>
            <!-- <StopButton/>-->
            <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
            <!--<SaveNNMelodyButton/>-->
            <Button disabled={($nnMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveMelody}>Save NN Melody</Button>
        </div>
        <!--<Visualizer/>-->
    <Visualizer source="nnMelody"/>

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

    #progress {
        position: fixed;
        top: 15vh;
        left: 5vw;
        width: 20vh;
        height: 5vh;
        background-color: #535bf2;
        color: white;
        z-index: 9999;
    }

    .hidden{
        display: none;
    }
</style>