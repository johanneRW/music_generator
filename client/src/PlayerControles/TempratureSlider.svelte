<script>
    import Slider from './Slider.svelte';
    let temperature = 1;

    //TODO bind til generator
</script>

<p>Temperature: {temperature}</p>
<Slider bind:value={temperature} min={0} max={2} step={0.1} default_value={1} />
