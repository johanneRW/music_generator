<!--
<script>
    import Button from './Button.svelte';
    import {isPlaying, nnMelody, userMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";
    import {generateMelody} from "../store/NNStore.js";
    import {onMount} from "svelte";
    import * as tf from "@tensorflow/tfjs";

    let model
    let isDisabled = false

    $: isDisabled = (isDisabled);

    onMount(async () => {
        model = await tf.loadLayersModel("model.json");
    })

    function genrateResponse() {
        // Generate melody based on user input
        isDisabled = true
        let userInput = get(userMelody)
        while (userInput.length < 50) {
            userInput.push(0);  // Tilføj 0 (eller en anden "dummy"-værdi) indtil længden er 50
        }
        generateMelody(model, userInput).then(
            melody => {
                nnMelody.set(melody)
                isDisabled = false
            }
        );
    }
</script>
<p>isDisabled: {isDisabled}</p>
<Button disabled={isDisabled} color="blue" handleClick={genrateResponse}>Generate response</Button>
-->
<!--
<script>
    import Button from './Button.svelte';
    import {isPlaying, nnMelody, userMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";
    import {generateMelody, nnIsWorking} from "../store/NNStore.js";
    import {onMount} from "svelte";
    import * as tf from "@tensorflow/tfjs";

    let model
    let isDisabled = false;
    $: isDisabled = $nnIsWorking

    onMount(async () => {
        model = await tf.loadLayersModel("model.json");
    })

    function genrateResponse() {
        // Generate melody based on user input
        let userInput = get(userMelody)
        while (userInput.length < 50) {
            userInput.push(0);  // Tilføj 0 (eller en anden "dummy"-værdi) indtil længden er 50
        }
        generateMelody(model, userInput).then(
            melody => {
                nnMelody.set(melody)
            }
        );
    }
</script>

<p>nnIsWorking: {$nnIsWorking}</p>
<Button disabled={isDisabled} color="blue" handleClick={genrateResponse}>Generate response</Button>
-->
<script>
    import Button from './Button.svelte';
    import {nnMelody, userMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";
    import {generateMelody, temperature} from "../store/NNStore.js";
    import {onMount} from "svelte";
    import * as tf from "@tensorflow/tfjs";
    import {tick} from 'svelte';
    import Slider from "./Slider.svelte";

    let model
    let isDisabled = false;

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
        await generateMelody(model, userInput).then(
            melody => {
                nnMelody.set(melody);
            }
        );
    }
</script>

<p>Temperature: {$temperature}</p>
<Slider disabled={isDisabled} bind:value={$temperature} min={0} max={2} step={0.1} default_value={1} />

<Button disabled={isDisabled} color="blue" handleClick={handleResponseFunction}>Generate response</Button>