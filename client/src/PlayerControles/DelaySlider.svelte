<script>
    import Slider from './Slider.svelte';
    let delay = 500;
</script>

<p>Delay: {delay}</p>
<Slider bind:value={delay} min="0" max="700" step="50" />

