import {get, writable} from "svelte/store";

export const bubbles = writable([]);

/*import {nnMelody, nnMelodyPosition} from "./playerStore.js";

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
}*/



/*
nnMelodyPosition.subscribe($position => {
    if ($position >= 0) { // Check if a valid position
        const note = get(nnMelody)[$position];
        bubbles.update($bubbles => {
            return [...$bubbles, {
                id: $position,
                position: randomPosition(),
                size: noteToSize(note),
                color: noteToColor(note)
            }];
        });
    }
});

*/
