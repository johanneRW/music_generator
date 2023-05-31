<script>

    import Keyboard from "../../Keyboard/keyboard.svelte";
    import {onDestroy, onMount, tick} from "svelte";
    import {
        clearNNMelody,
        clearUserMelody, getNoteName, isPlaying, nnDelay,
        nnMelody,
        nnMelodyPosition, playNNMelody, playUserMelody, stopPlaying, userDelay,
        userMelody,
        userMelodyPosition
    } from "../../store/playerStore.js";
    import Button from "../../PlayerControles/Button.svelte";
    import {addToArchive} from "../../store/archiveStore.js";
    import {get} from "svelte/store";
    import Slider from "../../PlayerControles/Slider.svelte";
    import * as tf from "@tensorflow/tfjs";
    import toastr from "toastr"
    import {generateMelody, temperature} from "../../store/NNStore.js";
    import {user} from "../../store/store.js";

    let model
    let isDisabled = false;

    //$: isDisabled = ($nnMelody.length === 0 || $isPlaying);
    let noteLimit = 10;

    function saveMelody() {
        toastr.info("Saved NN melody!")
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

    onMount(async () => {
        model = await tf.loadLayersModel("model.json");
    })

    //This is kind of a hack but everything else didn't work for me
    async function handleResponseFunction() {
        isDisabled = true;
        await tick(); // Update DOM before generating melody
        setTimeout(async () => {
            await generateResponse();
            isDisabled = false;
            await tick(); // Update DOM after generating melody
        }, 50); // Delay of 50 milliseconds
    }

    async function generateResponse() {
        // Generate melody based on user input
        let userInput = get(userMelody);
        while (userInput.length < 50) {
            userInput.push(0);  // Add 0 (or any other "dummy" value) until the length is 50
        }
        let melody = await generateMelody(model, userInput)
        nnMelody.set(melody)
    }
    onDestroy(() => {
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>

    <!--<UserNoteLog/>-->
    <div class="melodyContainer">
        <h2>User Melody:</h2>
        <div class="melody">
            {#each $userMelody as note, index}
                <p class:selected={$userMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>


    <div class="row">
       <!-- <UserDelaySlider/>-->
        <p>Delay: {$userDelay}</p>
        <Slider disabled={($isPlaying)}  bind:value={$userDelay} min={0} max={700} step={50} default_value={500} />

    </div>
    <div class="row">
        <!--<PlayUserMelodyButton/>-->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlayUserMelody}>Play</Button>
        <!--<StopButton/>-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        <!--<ClearNoteLogButton/>-->
        <Button disabled={($userMelody.length === 0)} color="red" handleClick={clearNoteLog}>Clear Note Log</Button>
    </div>
    <br>
    <br>
    <!--<GenerateResponseButton/>-->
    <p>Temperature: {$temperature}</p>
    <Slider disabled={($isPlaying||isDisabled)} bind:value={$temperature} min={0} max={2} step={0.1} default_value={1} />

    <Button disabled={isDisabled} color="blue" handleClick={handleResponseFunction}>Generate response</Button>
    <div class="row">
        <!--<NNDelaySlider/>-->
        <p>Delay: {$nnDelay}</p>
        <Slider disabled={($isPlaying||isDisabled)} bind:value={$nnDelay} min={0} max={700} step={50} default_value={500} />
    </div>

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
            <Button disabled={($nnMelody.length === 0||$isPlaying)} color="dark-green" handleClick={handlePlayNNMelody}>Play NN</Button>
            <!--<StopButton/>-->
            <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
            <!--<SaveNNMelodyButton/>-->
            <Button disabled={($nnMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveMelody}>Save NN Melody</Button>
        </div>
    </div>

<style>
    .row {
        display: flex;
        /*justify-content: space-between;*/
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