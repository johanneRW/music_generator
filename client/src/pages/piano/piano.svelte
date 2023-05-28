<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import UserNoteLog from "../../NoteLog/UserNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControles/PlayUserMelodyButton.svelte";
    import SaveButton from "../../PlayerControles/NNSaveButton.svelte";
    import StopButton from "../../PlayerControles/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControles/ClearNoteLogButton.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody, clearUserMelody} from "../../store/playerStore.js";
    import UserDelaySlider from "../../PlayerControles/UserDelaySlider.svelte";
    import UserSaveButton from "../../PlayerControles/UserSaveButton.svelte";

    let noteLimit = 100;
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
    <UserSaveButton/>
    <StopButton/>
    <ClearNoteLogButton/>
    </div>

</div>

<style>

    .row{
        display: flex;
    }

</style>