<!--
<script>
    import Button from './Button.svelte';
    import { playNNMelody } from "../store/playerStore.js";

    async function handlePlay() {
        await playNNMelody()
    }
</script>

<Button color="dark-green" handleClick={handlePlay}>Play NN</Button>

-->
<script>
    import Button from './Button.svelte';
    import {playNNMelody, nnMelody, isPlaying} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($nnMelody.length === 0||$isPlaying);

    async function handlePlay() {
        await playNNMelody()
    }
</script>

<Button disabled={isDisabled} color="dark-green" handleClick={handlePlay}>Play NN</Button>