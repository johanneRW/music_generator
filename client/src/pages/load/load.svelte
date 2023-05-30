<script>


    import {onDestroy} from "svelte";
    import {clearNNMelody} from "../../store/playerStore.js";
    import NNDelaySlider from "../../PlayerControles/NNDelaySlider.svelte";
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import PlayNNMelodyButton from "../../PlayerControles/PlayNNMelodyButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import NNSaveButton from "../../PlayerControles/NNSaveButton.svelte";
    import Visualizer from "../generator/Visualizer.svelte";

    onDestroy(()=>{
        clearNNMelody()
    })
</script>

<div>
    <div class="row">
        <NNDelaySlider/>
    </div>
    <br>
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
    }  </style>