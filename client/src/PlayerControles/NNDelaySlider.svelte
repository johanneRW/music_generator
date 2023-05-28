<script>
    import Slider from './Slider.svelte';
    import {isPlaying, nnDelay} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($isPlaying);
</script>



<p>Delay: {$nnDelay}</p>
<Slider disabled={isDisabled} bind:value={$nnDelay} min={0} max={700} step={50} default_value={500} />

