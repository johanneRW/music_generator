<script>
    //import {bubbles} from "../../store/VisualzerStore.js";
    //import {get, writable} from "svelte/store";
    import {nnMelody, nnMelodyPosition, loadedMelody, loadedMelodyPosition} from "../../store/playerStore.js";
    import {onMount} from "svelte";
    import {get} from "svelte/store";
    import {bubbles} from "../../store/VisualzerStore.js";

    export let source = ''

    let sourceMelody
    let sourceMelodyPosition

    const noteMin = 48;  // C3
    const noteMax = 72;  // C5

    function randomPosition() {
        return Math.floor(Math.random() * 60) + 20;  // Return a random position between 20 and 80
    }

    function noteToSize(note) {
        return ((note- noteMin) / (noteMax - noteMin) * 40) + 20;  // Map note value to a size between 20 and 60
    }

    function noteToColor(note) {
        const normalizedNote = (note - noteMin) / (noteMax - noteMin);  // Normalize note value between 0 and 1
        const r = Math.floor(128 * Math.sin(normalizedNote * 2 * Math.PI) + 128);
        const g = Math.floor(128 * Math.sin(normalizedNote * 2 * Math.PI + 2/3 * Math.PI) + 128);
        const b = Math.floor(128 * Math.sin(normalizedNote * 2 * Math.PI + 4/3 * Math.PI) + 128);
        return `${r}, ${g}, ${b}`;
    }

    onMount(() => {
        if (source === 'loadedMelody') {
            sourceMelody = loadedMelody
            sourceMelodyPosition = loadedMelodyPosition
        } else if (source === 'nnMelody') {
            sourceMelody = nnMelody
            sourceMelodyPosition = nnMelodyPosition
        } else {
            console.error("unknown source", source)
            return
        }

        sourceMelodyPosition.subscribe(position => {
            if (position >= 0) { // Check if a valid position
                const note = get(sourceMelody)[position];
                bubbles.update($bubbles => {
                    return [...$bubbles, {
                        id: position,
                        position: randomPosition(),
                        size: noteToSize(note),
                        color: noteToColor(note)
                    }];
                });
            }
        });
    })

</script>

<div class="bubbles">
    {#each $bubbles as bubble (bubble.id)}
        <div class="bubble"
             style={`left: ${bubble.position}%; bottom: ${bubble.position}%; background: radial-gradient(circle, rgba(${bubble.color},1) 0%, rgba(${bubble.color},0.8) 40%, rgba(${bubble.color},0.6) 70%, rgba(${bubble.color},0) 100%); width: ${bubble.size}px; height: ${bubble.size}px;`}
             on:animationend={() => {
        bubbles.update($bubbles => $bubbles.filter(b => b.id !== bubble.id));
    }}
        >
        </div>
    {/each}
</div>




<style>

    .bubbles {
        background-color: rgba(13, 40, 68);
        position: relative;
        height: 300px;
        width: 100%;
        overflow: hidden;
        border: 2px solid rgb(11, 108, 11);
    }
    .bubble {
        position: absolute;
        border-radius: 50%;
        animation: fadeOut 2s ease-out forwards;
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
</style>