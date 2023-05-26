import {derived, get, writable} from "svelte/store";
import {userMelody, userMelodyPosition} from "./playerStore.js";

const noteMin = 48;  // C3
const noteMax = 72;  // C5

function randomPosition() {
    return Math.floor(Math.random() * 100);  // Return a random position between 0 and 100
}

function noteToSize(note) {
    return ((note - noteMin) / (noteMax - noteMin) * 20) + 10;  // Map note value to a size between 10 and 30
}

function noteToColor(note) {
    let colorValue = ((note - noteMin) / (noteMax - noteMin) * 255);  // Map note value to a color between 0 and 255
    return `hsl(${colorValue}, 100%, 50%)`;  // Convert the color value to a HSL color string
}
export const bubbles = writable([]);

userMelodyPosition.subscribe($position => {
    if ($position >= 0) { // Check if a valid position
        const note = get(userMelody)[$position];
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

/*

export const bubbles = derived(
    userMelody,
    $userMelody => {
        let bubbles = [];
        for(let i=0; i<$userMelody.length; i++) {
            let note = $userMelody[i];
            let bubble = {
                id: i,
                position: randomPosition(),
                size: noteToSize(note),
                color: noteToColor(note)
            };
            bubbles.push(bubble);
        }
        return bubbles
    }
);*/
