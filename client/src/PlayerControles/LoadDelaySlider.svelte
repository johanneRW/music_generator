<script>
    import Slider from './Slider.svelte';
    import {isPlaying, loadedDelay} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($isPlaying);
</script>

<p>Delay: {$loadedDelay}</p>
<Slider disabled={isDisabled} bind:value={$loadedDelay} min={0} max={700} step={50} default_value={500} />

