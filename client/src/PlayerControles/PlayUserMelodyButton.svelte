<!--
<script>
    import Button from './Button.svelte';
    import {playUserMelody} from "../store/playerStore.js";

    async function handlePlay() {
        await playUserMelody()
    }
</script>

<Button color="green" handleClick={handlePlay}>Play</Button>
-->
<script>
    import Button from './Button.svelte';
    import {isPlaying, playUserMelody, userMelody} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($userMelody.length === 0||$isPlaying);

    async function handlePlay() {
        await playUserMelody()
    }
</script>

<Button disabled={isDisabled} color="green" handleClick={handlePlay}>Play</Button>