<script>
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import GenerateMelodyButton from "../../PlayerControles/GenerateMelodyButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControles/PlayNNMelodyButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import SaveButton from "../../PlayerControles/SaveButton.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody} from "../../store/playerStore.js";
    import TempratureSlider from "../../PlayerControles/TempratureSlider.svelte";
    import DelaySlider from "../../PlayerControles/DelaySlider.svelte";


    onDestroy(()=>{
        clearNNMelody()
    })
</script>

<div>
    <div class="buttonsRow">
    <TempratureSlider/>
    <DelaySlider/>
    </div>
    <br>
    <br>
    <GenerateMelodyButton/>
    <NNNoteLog/>
    <div class="buttonsRow">
    <PlayNNMelodyButton/>
    <StopButton/>
    <SaveButton/>
    </div>
</div>

<style>

    .buttonsRow{
        display: flex;
    }

</style>