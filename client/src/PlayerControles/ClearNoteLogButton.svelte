<!--
<script>
    import Button from './Button.svelte';
    import {clearUserMelody} from "../store/playerStore.js";

    function clearNoteLog() {
        clearUserMelody()
    }
</script>

<Button color="red" handleClick={clearNoteLog}>Clear Note Log</Button>
-->
<!--

<script>

    import Button from './Button.svelte';
    import {clearUserMelody, userMelody} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($userMelody.length === 0);

    function clearNoteLog() {
        clearUserMelody()
    }
</script>

<Button color="red" handleClick={clearNoteLog} disabled={isDisabled}>Clear Note Log</Button>
-->

<script>
    import Button from './Button.svelte';
    import {clearUserMelody, userMelody} from "../store/playerStore.js";

    let isDisabled = true;

    $: isDisabled = ($userMelody.length === 0);

    function clearNoteLog() {
        clearUserMelody()
    }
</script>

<Button disabled={isDisabled} color="red" handleClick={clearNoteLog}>Clear Note Log</Button>


