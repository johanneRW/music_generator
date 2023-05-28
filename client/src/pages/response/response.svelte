<script>

    import Keyboard from "../../Keyboard/keyboard.svelte";
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControles/PlayUserMelodyButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControles/ClearNoteLogButton.svelte";
    import GenerateResponseButton from "../../PlayerControles/GenerateResponseButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControles/PlayNNMelodyButton.svelte";
    import UserNoteLog from "../../NoteLog/UserNoteLog.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody, clearUserMelody} from "../../store/playerStore.js";
    import UserDelaySlider from "../../PlayerControles/UserDelaySlider.svelte";
    import NNDelaySlider from "../../PlayerControles/NNDelaySlider.svelte";
    import NNSaveButton from "../../PlayerControles/NNSaveButton.svelte";

    let noteLimit = 10;

    onDestroy(()=>{
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>

    <UserNoteLog/>
    <div class="row">
    <UserDelaySlider/>
    </div>
    <div class="row">
        <PlayUserMelodyButton/>
        <StopButton/>
        <ClearNoteLogButton/>
    </div>
<br>
    <br>
    <GenerateResponseButton/>
    <div class="row">
        <NNDelaySlider/>
    </div>

    <NNNoteLog/>
    <div class="row">
        <PlayNNMelodyButton/>
        <StopButton/>
        <NNSaveButton/>
    </div>
</div>

<style>
    .row {
        display: flex;
        /*justify-content: space-between;*/
    }
</style>