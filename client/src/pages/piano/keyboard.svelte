<script>
    import { createEventDispatcher } from "svelte";
    import { tick } from 'svelte';
    import { onMount } from "svelte";
    import Key from "../piano/key.svelte";
    import Player from "../Player/player.svelte";
    import playNoteSound from "../Player/player.svelte";

    export let octaves = 2;
    export let middleC = 60;
    export let keysPressed = [];
    
    let generatedMelody = []

    let noteLog = [];
    $: {
  if (noteLog.length > 10) {
    noteLog.splice(0, 1);
  }

}


    let keys;
    $: keys = [...Array(octaves * 12 + 1).keys()].map(
        (i) => i + (middleC - Math.floor(octaves / 2) * 12)
    );

    let pitch;


    const dispatch = createEventDispatcher();

    let idCounter = 0;


 function noteOn(event) {
    dispatch("noteon", event.detail);
    pitch = null; // reset pitch
    // Use nextTick to ensure that the resetting of the pitch is registered
    tick().then(() => {
        pitch = event.detail;
        noteLog = [{id: idCounter++, note: event.detail}, ...noteLog];
        if (noteLog.length > 10) {
            noteLog = noteLog.slice(0, 10);
        }
    });
}


    function noteOff(event) {
        dispatch("noteoff", event.detail);
    }

    async function handlePlay() {
    let delay = 0;  // start delay at 0
    const delayIncrement = 500; // delay between each note in milliseconds

    // Make a copy of noteLog and reverse it
    let reversedNoteLog = [...noteLog].reverse();

    // Go through each note in reversedNoteLog
    reversedNoteLog.forEach((noteObj) => {
        // Set timeout to play note after delay
        setTimeout(() => {
            pitch = null;
            tick().then(() => {
                pitch = noteObj.note;
            });
        }, delay);

        // Increase delay for next note
        delay += delayIncrement;
    });
}

    function genrateResponse() {
        console.log("Function button pressed");
       /*  fetch(
            "http://localhost:5000/", 
            { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteLog)
            }
        ).then(response => {

            response.json().then(
                data => { 
                    generatedMelody = data

                    let delay = 0;  // start delay at 0
                    const delayIncrement = 500; // delay between each note in milliseconds

                    data.forEach((val) => {
                    // Set timeout to play note after delay
                    setTimeout(() => {
                        pitch = null;
                        tick().then(() => {
                            pitch = val
                        });
                    }, delay);

                        // Increase delay for next note
                        delay += delayIncrement;
                    });
                }
            )
        }) */
        
        generatedMelody = [23, 23, 44, 34, 34, 41, 44, 47, 38, 45, 42, 40, 34, 37, 45, 49, 46, 49, 45, 45, 47, 40, 40, 44, 50, 45, 52, 49, 45, 48, 48, 50, 50, 50, 50, 57, 54, 54, 59, 62, 71, 68, 70, 72, 82, 59, 71, 77, 73, 62]

        let delay = 0;  // start delay at 0
        const delayIncrement = 450; // delay between each note in milliseconds

        generatedMelody.forEach((val) => {
        // Set timeout to play note after delay
        setTimeout(() => {
            pitch = null;
            tick().then(() => {
               /*  if (val > 84)
                    val -= 12
                if (val < 48)
                    val += 24 */
                pitch = val
            });
        }, delay);

            // Increase delay for next note
            delay += delayIncrement;
        });
    }
    function clearNoteLog() {
    noteLog = [];
  }


</script>

<div class="keyboard">
    <div>
        {#each keys as note}
            <Key
                noteNum={note}
                on:noteon={noteOn}
                on:noteoff={noteOff}
                pressed={keysPressed.includes(note)}
            />
        {/each}
    </div>
</div>
<Player {pitch} />
<!-- Log visning -->
<div class="container">
    <h2>Note Log:</h2>
    {#each [...noteLog].reverse() as note (note.id)}
        <p class="item">{note.note}</p>   
    {/each}
</div>

<div class="container">
    {#each generatedMelody as note}
        <p class="item">{note}</p>   
    {/each}
</div>


<!-- Knapper -->
<div>
    <button class="green-button" on:click={handlePlay}>Play</button>
    <button class="blue-button" on:click={genrateResponse}>Generate response</button>
    <button class="red-button" on:click={clearNoteLog}>Clear Note Log</button>
    <!-- <button class="red-button" on:click={stopPlaying}>Stop</button> -->
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
    /*  .controls {
        margin-top: 20px;
    }
    input {
        margin-right: 10px;
    } */

    .green-button {
        background-color: rgb(40, 188, 40);
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
    .red-button {
        background-color: rgb(227, 18, 18);
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }

    .blue-button {
        background-color: rgb(30, 127, 224);
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .item {
        width: 30px;
        height: 30px;
        margin: 5px;
    }
</style>
