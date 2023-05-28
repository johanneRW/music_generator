<!--
<script>
    import Button from './Button.svelte';
    import {addToArchive} from "../store/archiveStore.js";
    import {userMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";


    function saveMelody() {
        addToArchive(get(userMelody))
    }
</script>

<Button color="purple" handleClick={saveMelody}>Save Melody</Button>
-->
<script>
    import Button from './Button.svelte';
    import {addToArchive} from "../store/archiveStore.js";
    import {userMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";

    let isDisabled = true;

    $: isDisabled = ($userMelody.length === 0);

    function saveMelody() {
        addToArchive(get(userMelody))
    }
</script>

<Button disabled={isDisabled}  color="purple" handleClick={saveMelody}>Save Melody</Button>