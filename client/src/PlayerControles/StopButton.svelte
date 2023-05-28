<script>
    import Button from './Button.svelte';
    import {isPlaying, stopPlaying} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = (!$isPlaying);
</script>

<Button disabled={isDisabled} color="orange" handleClick={stopPlaying}>Stop</Button>
