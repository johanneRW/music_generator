<script>
    import Slider from './Slider.svelte';
    //TODO: bind til generator store
    let delay = 500;
</script>

<p>Delay: {delay}</p>
<Slider bind:value={delay} min={0} max={700} step={50} default_value={500} />

