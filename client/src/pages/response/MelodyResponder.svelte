<script>

    import Keyboard from "../../components/Keyboard/Keyboard.svelte"
    import {onDestroy, onMount, tick} from "svelte"
    import {
        clearNNMelody, clearUserMelody, getNoteName, isPlaying, nnDelay,
        nnMelody, nnMelodyPosition, playNNMelody, playUserMelody, stopPlaying,
        userDelay, userMelody, userMelodyPosition,
    } from "../../store/playerStore.js"
    import {generateMelody, temperature} from "../../store/rnnStore.js"
    import {addToArchive} from "../../store/archiveStore.js"
    import {get} from "svelte/store"
    import Slider from "../../components/Slider.svelte"
    import Button from "../../components/Button.svelte"
    import * as tf from "@tensorflow/tfjs"
    import toastr from "toastr"
    import {user} from "../../store/userStore.js"

    let model
    let isDisabled = false

    let noteLimit = 10

    function saveMelody() {
        toastr.info("Saved melody!")
        addToArchive(get(nnMelody))
    }

    async function handlePlayNNMelody() {
        await playNNMelody()
    }

    async function handlePlayUserMelody() {
        await playUserMelody()
    }

    function clearNoteLog() {
        clearUserMelody()
    }

    //The model was created in the elective course Machine Learning. The model is an RNN designed to predict melodies, trained on MIDI files.
    // The model was initially built in Google Colab using tensorflow.py and then converted to TensorFlow.js using the TensorFlow Converter.
    onMount(async () => {
        model = await tf.loadLayersModel("model.json")
    })

    //This is kind of a hack but everything else didn't work for me
    async function handleResponseFunction() {
        isDisabled = true
        await tick() // Update DOM before generating melody
        setTimeout(async () => {
            await generateResponse()
            isDisabled = false
            await tick() // Update DOM after generating melody
        }, 50) // Delay of 50 milliseconds
    }

    async function generateResponse() {
        // Generate melody based on user input
        let userInput = get(userMelody)
        while (userInput.length < 50) {
            userInput.push(0)  // Add 0 (or any other "dummy" value) until the length is 50
        }
        let melody = await generateMelody(model, userInput)
        nnMelody.set(melody)
    }

    onDestroy(() => {
        clearUserMelody()
        clearNNMelody()
    })

</script>
<p class="pageIntroduction">
    On this page, you can provide your own melody, and then ask the melody to generate a musical response.
    <br>
    You can use the "temperature" slider to adjust the "creativity" of the melody generator.
    (0 means little creativity and 2 means "be very creative".)
</p>
<div>
    <!--Keyboard-->
    <Keyboard bind:noteLimit={noteLimit}/>

    <!--User melody notelog-->
    <div class="melodyContainer">
        <h2>User Melody:</h2>
        <div class="melody">
            {#each $userMelody as note, index}
                <p class:selected={$userMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>
    <!-- Delay-slider for user melody-->
    <label>
        Delay: {$userDelay}
        <Slider disabled={($isPlaying)} bind:value={$userDelay} min={0} max={700} step={50} default_value={500}/>
    </label>
    <div class="row">
        <!--Button for playing user melody-->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlayUserMelody}>
            Play
        </Button>
        <!--Button for stopping playing melody-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        <!--Button for clearing user notelog -->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="red" handleClick={clearNoteLog}>Clear Note Log</Button>
    </div>
    <br>
    <!--Message box - enabled when generating melody-->
    <div class={isDisabled ? '' : 'hidden'} id="progress">
        Generating a response melody ...
    </div>
    <br>
    <!--Button for generating melody from user melody-->
    <div class="row-container">
        <Button disabled={isDisabled} color="blue" handleClick={handleResponseFunction}>Generate response</Button>
        <!--Slider for setting temperature in response-->
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
        <Button disabled={($nnMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlayNNMelody}>Play
        </Button>
        <!--Button for stopping playing melody-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        <!--Button for saving generated melody-->
        <Button disabled={($nnMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveMelody}>Save
            Melody
        </Button>
    </div>
</div>

<style>
    .row {
        display: flex;
    }

    .row-container {
        padding: 4vh 0 8vh 0;
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