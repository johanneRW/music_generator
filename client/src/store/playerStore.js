import {writable} from "svelte/store"
import {get} from "svelte/store"
import {tick} from "svelte"

const keyToPlaybackRate = {
    48: 0.5, // C3
    49: 0.529, // C#3
    50: 0.561, // D3
    51: 0.595, // D#3
    52: 0.63, // E3
    53: 0.667, // F3
    54: 0.707, // F#3
    55: 0.749, // G3
    56: 0.793, // G#3
    57: 0.84, // A3
    58: 0.891, // A#3
    59: 0.944, // B3
    60: 1.0, // C4
    61: 1.059, // C#4
    62: 1.122, // D4
    63: 1.189, // D#4
    64: 1.26, // E4
    65: 1.335, // F4
    66: 1.414, // F#4
    67: 1.498, // G4
    68: 1.587, // G#4
    69: 1.682, // A4
    70: 1.782, // A#4
    71: 1.888, // B4
    72: 2.0, // C5
}

const minNote = 48
const maxNote = 72
const pitch_to_note_dict = {
    48: "C3",
    49: "C#3",
    50: "D3",
    51: "D#3",
    52: "E3",
    53: "F3",
    54: "F#3",
    55: "G3",
    56: "G#3",
    57: "A3",
    58: "A#3",
    59: "B3",
    60: "C4",
    61: "C#4",
    62: "D4",
    63: "D#4",
    64: "E4",
    65: "F4",
    66: "F#4",
    67: "G4",
    68: "G#4",
    69: "A4",
    70: "A#4",
    71: "B4",
    72: "C5",
}

let audioContext
let buffer
let isReady = false
let intervalId

async function initAudio() {
    audioContext = new AudioContext()
    const response = await fetch("/sound.wav")
    const arrayBuffer = await response.arrayBuffer()
    buffer = await audioContext.decodeAudioData(arrayBuffer)
    isReady = true
}

async function playMelody(melody, position, delay) {
    stopPlaying() // Stop any previous melodies

    isPlaying.set(true)
    position.set(-1)

    intervalId = setInterval(async () => {
        position.update((value) => {
            value++
            return value
        })

        if (get(position) < melody.length) {
            await tick()
            let note = melody[get(position)]
            await playNote(note)
        } else {
            stopPlaying()
            position.set(-1)
        }
    }, get(delay))
}

export const userMelody = writable([])
export const userMelodyPosition = writable(-1)
export const userDelay = writable(500)

export const nnMelody = writable([])
export const nnMelodyPosition = writable(-1)
export const nnDelay = writable(500)

export const loadedMelody = writable([])
export const loadedMelodyPosition = writable(-1)
export const loadedDelay = writable(500)

export const isPlaying = writable(false)

//In music theory, this is known as "folding" tones within a specific octave.
export function foldNoteIntoInterval(note) {
    let interval_size = maxNote - minNote + 1
    while (note < minNote) {
        note += interval_size
    }
    while (note > maxNote) {
        note -= interval_size
    }
    return note
}

export const addNote = (note, noteLimit) => {
    userMelody.update(items => {
        // Delete the first note if we reach the note limit
        if (items.length > noteLimit) {
            items.splice(0, 1)
        }

        // Add the new note
        items.push(note)

        return items
    })
}

export const clearUserMelody = () => {
    userMelody.update(items => {
        return []
    })
}

export const clearNNMelody = () => {
    nnMelody.update(items => {
        return []
    })
}

export const clearLoadedMelody = () => {
    loadedMelody.update(items => {
        return []
    })
}

export async function playNote(pitch) {

    if (!isReady) {
        await initAudio()
    }

    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.playbackRate.value = keyToPlaybackRate[pitch]
    source.connect(audioContext.destination)
    source.start(0)
}

export async function playUserMelody() {
    await playMelody(get(userMelody), userMelodyPosition, userDelay)
}

export async function playNNMelody() {
    await playMelody(get(nnMelody), nnMelodyPosition, nnDelay)
}

export async function playLoadedMelody() {
    await playMelody(get(loadedMelody), loadedMelodyPosition, loadedDelay)
}

export function stopPlaying() {
    isPlaying.set(false)
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null  // Reset intervalId
    }
}

export function getNoteName(midi_number) {
    let note_name = pitch_to_note_dict[midi_number]
    return note_name
}

