<script>
    import { onMount } from "svelte";
    export let pitch;

    /* const keyToPlaybackRate = {
        0: 0.004, // C-1
        1: 0.0042, // C#-1
        2: 0.0045, // D-1
        3: 0.0048, // D#-1
        4: 0.0051, // E-1
        5: 0.0054, // F-1
        6: 0.0057, // F#-1
        7: 0.006, // G-1
        8: 0.0064, // G#-1
        9: 0.0068, // A-1
        10: 0.0072, // A#-1
        11: 0.0076, // B-1
        12: 0.008, // C0
        13: 0.0085, // C#0
        14: 0.009, // D0
        15: 0.0095, // D#0
        16: 0.0101, // E0
        17: 0.0107, // F0
        18: 0.0113, // F#0
        19: 0.012, // G0
        20: 0.0127, // G#0
        21: 0.0134, // A0
        22: 0.0141, // A#0
        23: 0.015, // B0
        24: 0.016, // C1
        25: 0.017, // C#1
        26: 0.018, // D1
        27: 0.019, // D#1
        28: 0.02, // E1
        29: 0.021, // F1
        30: 0.022, // F#1
        31: 0.024, // G1
        32: 0.025, // G#1
        33: 0.027, // A1
        34: 0.028, // A#1
        35: 0.03, // B1
        36: 0.032, // C2
        37: 0.034, // C#2
        38: 0.036, // D2
        39: 0.038, // D#2
        40: 0.04, // E2
        41: 0.043, // F2
        42: 0.045, // F#2
        43: 0.048, // G2
        44: 0.05, // G#2
        45: 0.053, // A2
        46: 0.056, // A#2
        47: 0.06, // B2
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
        73: 2.118, // C#5
        74: 2.245, // D5
        75: 2.378, // D#5
        76: 2.52, // E5
        77: 2.671, // F5
        78: 2.828, // F#5
        79: 2.997, // G5
        80: 3.175, // G#5
        81: 3.364, // A5
        82: 3.564, // A#5
        83: 3.776, // B5
        84: 4.0, // C6
        86: 4.489, // D6
        87: 4.756, // D#6
        88: 5.04, // E6
        89: 5.342, // F6
        90: 5.657, // F#6
        91: 5.994, // G6
        92: 6.349, // G#6
        93: 6.728, // A6
        94: 7.127, // A#6
        95: 7.552, // B6
        96: 8.0, // C7
        97: 8.475, // C#7
        98: 8.978, // D7
        99: 9.513, // D#7
        100: 10.08, // E7
        101: 10.684, // F7
        102: 11.314, // F#7
        103: 11.988, // G7
        104: 12.699, // G#7
        105: 13.456, // A7
        106: 14.254, // A#7
        107: 15.104, // B7
        108: 16.0, // C8
        109: 16.951, // C#8
        110: 17.956, // D8
        111: 19.027, // D#8
        112: 20.16, // E8
        113: 21.367, // F8
        114: 22.627, // F#8
        115: 23.976, // G8
        116: 25.398, // G#8
        117: 26.912, // A8
        118: 28.508, // A#8
        119: 30.208, // B8
        120: 32.0, // C9
        121: 33.902, // C#9
        122: 35.911, // D9
        123: 38.054, // D#9
        124: 40.319, // E9
        125: 42.735, // F9
        126: 45.254, // F#9
        127: 47.952, // G9
    }; */

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
       
    };
    //let foldedNote = foldNoteIntoInterval(note, 47, 72);

    /* function foldNoteIntoInterval(note, min, max) {
    let interval_size = max - min + 1;
    while (note < min) {
        note += interval_size;
    }
    while (note > max) {
        note -= interval_size;
    }
    return note;
} */

    let audioContext;
    let buffer;

    let isReady = false;

    onMount(async () => {
        audioContext = new AudioContext();
        const response = await fetch("/lyd2.wav");
        const arrayBuffer = await response.arrayBuffer();
        buffer = await audioContext.decodeAudioData(arrayBuffer);
        isReady = true;
    });

    /*     $: {
        if (pitch !== null && isReady) {
            playNoteSound(pitch);
        }
    }

    async function playNoteSound(pitch) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = keyToPlaybackRate[pitch];
        source.connect(audioContext.destination);
        source.start(0);
    } */

    $: {
        if (pitch !== null && isReady) {
            let foldedPitch = foldNoteIntoInterval(pitch, 48, 72);
            playNoteSound(foldedPitch);
        }
    }

    async function playNoteSound(pitch) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = keyToPlaybackRate[pitch];
        source.connect(audioContext.destination);
        source.start(0);
    }
    //I musikteori er dette kendt som at "folde" toner inden for en bestemt oktav.
    function foldNoteIntoInterval(note, min, max) {
        let interval_size = max - min + 1;
        while (note < min) {
            note += interval_size;
        }
        while (note > max) {
            note -= interval_size;
        }
        return note;
    }
</script>
