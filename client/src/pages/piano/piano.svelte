<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import UserNoteLog from "../../NoteLog/UserNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControl/PlayUserMelodyButton.svelte";
    import SaveButton from "../../PlayerControl/SaveButton.svelte";
    import StopButton from "../../PlayerControl/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControl/ClearNoteLogButton.svelte";
    import {onDestroy} from "svelte";
    import {clearNNMelody, clearUserMelody} from "../../store/playerStore.js";


    let noteLimit = 100;
    onDestroy(()=>{
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>
    <UserNoteLog/>
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