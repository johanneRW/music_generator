
<script>
    import Button from './Button.svelte';
    import {isPlaying, loadedDelay, playLoadedMelody} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($loadedDelay.length === 0||$isPlaying);

    async function handlePlay() {
        await playLoadedMelody()
    }
</script>

<Button disabled={isDisabled} color="dark-green" handleClick={handlePlay}>Play loaded button</Button>