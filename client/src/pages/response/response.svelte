<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControles/PlayUserMelodyButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControles/ClearNoteLogButton.svelte";
    import GenerateResponseButton from "../../PlayerControles/GenerateResponseButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControles/PlayNNMelodyButton.svelte";
    import SaveButton from "../../PlayerControles/SaveButton.svelte";
    import UserNoteLog from "../../NoteLog/UserNoteLog.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody, clearUserMelody} from "../../store/playerStore.js";
    import DelaySlider from "../../PlayerControles/DelaySlider.svelte";
    import TempratureSlider from "../../PlayerControles/TempratureSlider.svelte";

    let noteLimit = 10;
    onDestroy(()=>{
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>

    <UserNoteLog/>
    <div class="buttonsRow">
    <DelaySlider/>
    </div>
    <div class="buttonsRow">
        <PlayUserMelodyButton/>
        <StopButton/>
        <ClearNoteLogButton/>
    </div>
<br>
    <br>
    <GenerateResponseButton/>
    <div class="buttonsRow">
        <TempratureSlider/>
        <DelaySlider/>
    </div>

    <NNNoteLog/>
    <div class="buttonsRow">
        <PlayNNMelodyButton/>
        <StopButton/>
        <SaveButton/>
    </div>
</div>


<style>

    .buttonsRow {
        display: flex;
        /*justify-content: space-between;*/
    }

</style>