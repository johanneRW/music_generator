<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import UserNoteLog from "../../NoteLog/UserNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControles/PlayUserMelodyButton.svelte";
    import SaveButton from "../../PlayerControles/SaveButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControles/ClearNoteLogButton.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody, clearUserMelody} from "../../store/playerStore.js";
    import DelaySlider from "../../PlayerControles/DelaySlider.svelte";
    import Visulaizer from "../../Visulaizer.svelte";


    let noteLimit = 100;
    onDestroy(()=>{
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>
    <UserNoteLog/>
    <Visulaizer/>
    <div class="buttonsRow">
    <DelaySlider/>
    </div>
    <div class="buttonsRow">
    <PlayUserMelodyButton/>
    <SaveButton/>
    <StopButton/>
    <ClearNoteLogButton/>
    </div>

</div>

<style>

    .buttonsRow{
        display: flex;
    }

</style>