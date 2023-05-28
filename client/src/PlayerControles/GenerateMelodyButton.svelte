<script>
    import Button from './Button.svelte';
    import {onMount, tick} from "svelte";
    import * as tf from "@tensorflow/tfjs";
    import {nnMelody} from "../store/playerStore.js";
    import {generateMelody, nVocab, temperature} from "../store/NNStore.js";
    import Slider from "./Slider.svelte";

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
    function genrateMelody() {
        // Generate melody based on random seed
        let randomSeed = Array.from({length: 50}, () => Math.floor(Math.random() * nVocab));
        generateMelody(model, randomSeed).then(
            melody => { nnMelody.set(melody) }
        );
    }
</script>
<p>Temperature: {$temperature}</p>
<Slider disabled={isDisabled} bind:value={$temperature} min={0} max={2} step={0.1} default_value={1} />
<Button disabled={isDisabled} color="blue" handleClick={handleGenerateFunction}>Generate random melody</Button>

