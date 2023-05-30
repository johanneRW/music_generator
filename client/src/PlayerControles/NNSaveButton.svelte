<!--
<script>
    import Button from './Button.svelte';
    import {addToArchive} from "../store/archiveStore.js";
    import {nnMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";


    function saveMelody() {
        addToArchive(get(nnMelody))
    }
</script>

<Button color="purple" handleClick={saveMelody}>Save NN Melody</Button>
-->
<script>
    import Button from './Button.svelte';
    import {addToArchive} from "../store/archiveStore.js";
    import {nnMelody} from "../store/playerStore.js";
    import {get} from "svelte/store";
    import {user} from "../store/store.js";

    let isDisabled = true;

    $: isDisabled = ($nnMelody.length === 0||!$user.isLoggedIn);

    function saveMelody() {
        addToArchive(get(nnMelody))
    }
</script>

<Button disabled={isDisabled} color="purple" handleClick={saveMelody}>Save NN Melody</Button>