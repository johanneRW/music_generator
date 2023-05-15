<script>
    import { onMount } from "svelte";
    //export let playSound;
    export let pitch;
    

    const keyToPlaybackRate = {
        48: 0.5,   // C3
        49: 0.529, // C#3
        50: 0.561, // D3
        51: 0.595, // D#3
        52: 0.63,  // E3
        53: 0.667, // F3
        54: 0.707, // F#3
        55: 0.749, // G3
        56: 0.793, // G#3
        57: 0.84,  // A3
        58: 0.891, // A#3
        59: 0.944, // B3
        60: 1.00,  // C4
        61: 1.059, // C#4
        62: 1.122, // D4
        63: 1.189, // D#4
        64: 1.26,  // E4
        65: 1.335, // F4
        66: 1.414, // F#4
        67: 1.498, // G4
        68: 1.587, // G#4
        69: 1.682, // A4
        70: 1.782, // A#4
        71: 1.888, // B4
        72: 2.00,  // C5
        73: 2.118, // C#5
        74: 2.245, // D5
        75: 2.378, // D#5
        76: 2.52,  // E5
        77: 2.671, // F5
        78: 2.828, // F#5
        79: 2.997, // G5
        80: 3.175, // G#5
        81: 3.364, // A5
        82: 3.564, // A#5
        83: 3.776, // B5
    };

    let audioContext;
    let buffer;
  
    onMount(async () => {
      audioContext = new AudioContext();
      const response = await fetch("/lyd2.wav");
      const arrayBuffer = await response.arrayBuffer();
      buffer = await audioContext.decodeAudioData(arrayBuffer);
    });
  
    $: {
        if (pitch !== null) {
            playNoteSound(pitch);
        }
    }
  
  /*   export async function playNoteSound(pitch) {
  // Create a new BufferSource for each play
  const source = audioContext.createBufferSource();

  // Set the buffer and playbackRate
  source.buffer = buffer;
  source.playbackRate.value = keyToPlaybackRate[pitch];

  // Connect to the destination
  source.connect(audioContext.destination);

  // Start the source after a small delay
  //setTimeout(() => source.start(0), 10);
  source.start(0);

  // When the sound has finished playing, disconnect the source
  source.onended = function() {
    source.disconnect();
  };
}
 */
 export async function playNoteSound(pitch) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = keyToPlaybackRate[pitch];
        source.connect(audioContext.destination);
        source.start(0);
    }

</script>
