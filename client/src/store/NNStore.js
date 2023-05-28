import {get, writable} from 'svelte/store';
import * as tf from '@tensorflow/tfjs';
import {tick} from "svelte";
import {foldNoteIntoInterval} from "./playerStore.js";

export const temperature = writable(1);


export const nVocab = 118

const int_to_note = {0: 0, 1: 2, 2: 4, 3: 5, 4: 7, 5: 8, 6: 9, 7: 11, 8: 12, 9: 14, 10: 15, 11: 16, 12: 17, 13: 19, 14: 20, 15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26, 21: 27, 22: 28, 23: 29, 24: 30, 25: 31, 26: 32, 27: 33, 28: 34, 29: 35, 30: 36, 31: 37, 32: 38, 33: 39, 34: 40, 35: 41, 36: 42, 37: 43, 38: 44, 39: 45, 40: 46, 41: 47, 42: 48, 43: 49, 44: 50, 45: 51, 46: 52, 47: 53, 48: 54, 49: 55, 50: 56, 51: 57, 52: 58, 53: 59, 54: 60, 55: 61, 56: 62, 57: 63, 58: 64, 59: 65, 60: 66, 61: 67, 62: 68, 63: 69, 64: 70, 65: 71, 66: 72, 67: 73, 68: 74, 69: 75, 70: 76, 71: 77, 72: 78, 73: 79, 74: 80, 75: 81, 76: 82, 77: 83, 78: 84, 79: 85, 80: 86, 81: 87, 82: 88, 83: 89, 84: 90, 85: 91, 86: 92, 87: 93, 88: 94, 89: 95, 90: 96, 91: 97, 92: 98, 93: 99, 94: 100, 95: 101, 96: 102, 97: 103, 98: 104, 99: 105, 100: 106, 101: 107, 102: 108, 103: 109, 104: 110, 105: 112, 106: 113, 107: 114, 108: 115, 109: 116, 110: 117, 111: 119, 112: 122, 113: 125, 114: 126, 115: 127}

export async function generateMelody(model, inputSequence, outputLength=50) {


    let input = inputSequence;

    // Hvis dit input er en liste, skal du konvertere det til en Tensor
    if (Array.isArray(input)) {
        input = tf.tensor(input);
    }

    let output = [];
    let temp = get(temperature)

    console.log("temperature", temp)

    for (let i = 0; i < outputLength; i++) {
        // Reshape input to [1, inputShape, 1]
        let inputBatch = input.reshape([1, input.shape[0], 1]);

        // Normalize input
        inputBatch = inputBatch.div(tf.scalar(nVocab));

        // Predict next note
        let prediction = model.predict(inputBatch);

        // Apply temperature
        prediction = prediction.div(tf.scalar(temp));
        prediction = prediction.log();
        prediction = prediction.exp();
        prediction = prediction.div(prediction.sum());

        // Sample from the predicted distribution
        const predictedId = tf.multinomial(prediction.as1D(), 1).dataSync()[0];

        output.push(predictedId);

        // Remove the first note of the input sequence
        input = input.slice([1]);

        // Add the new note to the input sequence
        input = input.concat(tf.tensor([predictedId]));
    }

    let mappedOutput = output.map(val => int_to_note[val] || 0);
    let foldedOutput=mappedOutput.map(val=>foldNoteIntoInterval(val))

    return foldedOutput;
}
