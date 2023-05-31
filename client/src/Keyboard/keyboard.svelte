<script>
    // source:https://svelte.dev/repl/d0db1849a7f24d22a8dcc5b5a1a2b1bf?version=3.46.2

    import Key from "./key.svelte";
    import {addNote, playNote} from "../store/playerStore.js";

    export let octaves = 2;
    export let middleC = 60;
    export let keysPressed = [];
    export let noteLimit = 10

    let keys;
    $: keys = [...Array(octaves * 12 + 1).keys()].map(
        (i) => i + (middleC - Math.floor(octaves / 2) * 12)
    );

    function noteOn(event) {
        addNote(event.detail, noteLimit)
        playNote(event.detail)
    }

</script>

<div class="keyboard">
    <div>
        {#each keys as note}
            <Key
                    noteNum={note}
                    on:noteon={noteOn}
                    pressed={keysPressed.includes(note)}
            />
        {/each}
    </div>
</div>

<style>
    .keyboard {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .keyboard > div {
        display: flex;
        overflow: auto;
        padding: 8px;
        height: 192px;
    }
</style>
