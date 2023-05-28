<script>
    import Slider from './Slider.svelte';
    import {isPlaying, userDelay} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($isPlaying);
</script>

<p>Delay: {$userDelay}</p>
<Slider disabled={isDisabled}  bind:value={$userDelay} min={0} max={700} step={50} default_value={500} />

