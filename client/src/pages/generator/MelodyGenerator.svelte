<script>

    import {onDestroy, onMount, tick} from "svelte"
    import {
        clearNNMelody, getNoteName,
        isPlaying, nnDelay,
        nnMelody,
        nnMelodyPosition,
        playNNMelody,
        stopPlaying,
    } from "../../store/playerStore.js"
    import {addToArchive} from "../../store/archiveStore.js"
    import {get} from "svelte/store"
    import {generateMelody, nVocab, temperature} from "../../store/rnnStore.js"
    import Visualizer from "./Visualizer.svelte"
    import Button from "../../components/Button.svelte"
    import Slider from "../../components/Slider.svelte"
    import * as tf from "@tensorflow/tfjs"
    import toastr from "toastr"
    import {socket} from "../../store/socketStore.js"
    import {user} from "../../store/userStore.js"

    let model
    let isDisabled = false

    //The model was created in the elective course Machine Learning. The model is an RNN designed to predict melodies, trained on MIDI files.
    //The model was initially built in Google Colab using tensorflow.py and then converted to TensorFlow.js using the TensorFlow Converter.
    onMount(async () => {
        model = await tf.loadLayersModel("model.json")
    })

    //This is kind of a hack but everything else didn't work for me
    async function handleGenerateFunction() {
        isDisabled = true
        await tick() // Update DOM before generating melody
        setTimeout(async () => {
            await genrateMelody()
            isDisabled = false
            await tick() // Update DOM after generating melody
        }, 50) // Delay of 50 milliseconds
    }

    async function genrateMelody() {
        // Generate melody based on random seed
        let randomSeed = Array.from({length: 50}, () => Math.floor(Math.random() * nVocab))
        let melody = await generateMelody(model, randomSeed)
        nnMelody.set(melody)
        $socket.emit("newMelodyMessage", melody)
    }

    function saveMelody() {
        addToArchive(get(nnMelody))
        toastr.info("Saved melody!")
    }

    async function handlePlay() {
        await playNNMelody()
    }

    onDestroy(() => {
        clearNNMelody()
    })

</script>
<p class="pageIntroduction">
    Use this page to generate a completely new melody, without providing user input.
    <br>
    You can use the "temperature" slider to adjust the "creativity" of the melody generator.
    (0 means little creativity and 2 means "be very creative".)
</p>
<div>
    <!--Message box - enabled when generating melody-->
    <div class={isDisabled ? '' : 'hidden'} id="progress">
        Generating a new melody ...
    </div>
    <br>
    <!--Button for generating random melody-->
    <div class="row-container">
        <Button disabled={isDisabled} color="blue" handleClick={handleGenerateFunction}>Generate random melody</Button>
        <label>
            Temperature: {$temperature}
            <Slider disabled={($isPlaying||isDisabled)} bind:value={$temperature} min={0} max={2} step={0.1}
                    default_value={1}/>
        </label>
    </div>
    <!--Notelog for generated melody-->
    <div class="melodyContainer">
        <h2>Generated Melody:</h2>
        <div class="melody">
            {#each $nnMelody as note, index}
                <p class:selected={$nnMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>
    <div class="row">
        <!--Delay-slider for generated melody-->
        <label>
            Delay: {$nnDelay}
            <Slider disabled={($isPlaying||isDisabled)} bind:value={$nnDelay} min={0} max={700} step={50}
                    default_value={500}/>
        </label>
    </div>
    <div class="row">
        <!--Button for playing generated melody-->
        <Button disabled={($nnMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlay}>Play
        </Button>
        <!--Button for stopping playing melody-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        <!--Button for saving generated melody-->
        <Button disabled={($nnMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveMelody}>Save
            Melody
        </Button>
    </div>
    <!--Visualizer for generated melody-->
    <Visualizer source="nnMelody"/>

</div>
<style>
    .row {
        display: flex;
    }

    .row-container {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        gap: 6vw;
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

    #progress {
        color: white;
        text-align: center;
        padding-top: 9vh;
        position: fixed;
        top: 20vh;
        left: 5vw;
        width: 50vh;
        height: 15vh;
        background-image: linear-gradient(to bottom, #535bf2, #6569c9);
        border: #535bf2 solid 6px;
        border-radius: 4px;
        z-index: 9999;
    }

    .hidden {
        display: none;
    }
</style>