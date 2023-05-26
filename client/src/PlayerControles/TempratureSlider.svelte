<script>
    import Slider from './Slider.svelte';
    let temperature = 1;
</script>

<p>Temperature: {temperature}</p>
<Slider bind:value={temperature} min="0" max="2" step="0.1" />
