<script>
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import GenerateMelodyButton from "../../PlayerControles/GenerateMelodyButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControles/PlayNNMelodyButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import SaveButton from "../../PlayerControles/NNSaveButton.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody} from "../../store/playerStore.js";
    import Visualizer from "./Visualizer.svelte";
    import NNDelaySlider from "../../PlayerControles/NNDelaySlider.svelte";
    import NNSaveButton from "../../PlayerControles/NNSaveButton.svelte";

    onDestroy(()=>{
        clearNNMelody()
    })
</script>

<div>
    <div class="row">
    <NNDelaySlider/>
    </div>
    <br>
    <br>
    <GenerateMelodyButton/>
    <NNNoteLog/>
    <div class="row">
    <PlayNNMelodyButton/>
    <StopButton/>
    <NNSaveButton/>
    </div>
    <Visualizer/>
</div>

<style>

    .row{
        display: flex;
    }

</style>