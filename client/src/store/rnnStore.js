//Based on Python code from the elective course Machine Learning, translated to JavaScript.
import {get, writable} from "svelte/store"
import * as tf from "@tensorflow/tfjs"
import {foldNoteIntoInterval} from "./playerStore.js"

export const temperature = writable(1)

export const nVocab = 118
const int_to_note = {
    0: 0,
    1: 2,
    2: 4,
    3: 5,
    4: 7,
    5: 9,
    6: 11,
    7: 12,
    8: 14,
    9: 16,
    10: 17,
    11: 19,
    12: 20,
    13: 21,
    14: 22,
    15: 23,
    16: 24,
    17: 25,
    18: 26,
    19: 27,
    20: 28,
    21: 29,
    22: 30,
    23: 31,
    24: 32,
    25: 33,
    26: 34,
    27: 35,
    28: 36,
    29: 37,
    30: 38,
    31: 39,
    32: 40,
    33: 41,
    34: 42,
    35: 43,
    36: 44,
    37: 45,
    38: 46,
    39: 47,
    40: 48,
    41: 49,
    42: 50,
    43: 51,
    44: 52,
    45: 53,
    46: 54,
    47: 55,
    48: 56,
    49: 57,
    50: 58,
    51: 59,
    52: 60,
    53: 61,
    54: 62,
    55: 63,
    56: 64,
    57: 65,
    58: 66,
    59: 67,
    60: 68,
    61: 69,
    62: 70,
    63: 71,
    64: 72,
    65: 73,
    66: 74,
    67: 75,
    68: 76,
    69: 77,
    70: 78,
    71: 79,
    72: 80,
    73: 81,
    74: 82,
    75: 83,
    76: 84,
    77: 85,
    78: 86,
    79: 87,
    80: 88,
    81: 89,
    82: 90,
    83: 91,
    84: 92,
    85: 93,
    86: 94,
    87: 95,
    88: 96,
    89: 97,
    90: 98,
    91: 99,
    92: 100,
    93: 101,
    94: 102,
    95: 103,
    96: 104,
    97: 105,
    98: 107,
    99: 108,
    100: 110,
    101: 111,
    102: 112,
    103: 113,
    104: 114,
    105: 115,
    106: 116,
    107: 117,
    108: 118,
    109: 119,
    110: 120,
    111: 121,
    112: 122,
    113: 123,
    114: 124,
    115: 125,
    116: 126,
    117: 127,
}

export async function generateMelody(model, inputSequence, outputLength = 50) {

    let input = inputSequence

    // If your input is a list, you need to convert it to a Tensor.
    if (Array.isArray(input)) {
        input = tf.tensor(input)
    }

    let output = []
    let temp = get(temperature)

    for (let i = 0; i < outputLength; i++) {
        // Reshape input to [1, inputShape, 1]
        let inputBatch = input.reshape([1, input.shape[0], 1])

        // Normalize input
        inputBatch = inputBatch.div(tf.scalar(nVocab))

        // Predict next note
        let prediction = model.predict(inputBatch)

        // Apply temperature
        prediction = prediction.div(tf.scalar(temp))
        prediction = prediction.log()
        prediction = prediction.exp()
        prediction = prediction.div(prediction.sum())

        // Sample from the predicted distribution
        const predictedId = tf.multinomial(prediction.as1D(), 1).dataSync()[0]

        output.push(predictedId)

        // Remove the first note of the input sequence
        input = input.slice([1])

        // Add the new note to the input sequence
        input = input.concat(tf.tensor([predictedId]))
    }

    let mappedOutput = output.map(val => int_to_note[val] || 0)
    let foldedOutput = mappedOutput.map(val => foldNoteIntoInterval(val))

    return foldedOutput
}
