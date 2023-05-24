<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import NoteLog from "../../NoteLog/UserNoteLog.svelte";
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import PlayUserMelodyButton from "../../PlayerControl/PlayUserMelodyButton.svelte";
    import StopButton from "../../PlayerControl/StopButton.svelte";
    import ClearNoteLogButton from "../../PlayerControl/ClearNoteLogButton.svelte";
    import GenerateResponseButton from "../../PlayerControl/GenerateResponseButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControl/PlayNNMelodyButton.svelte";
    import SaveButton from "../../PlayerControl/SaveButton.svelte";

    let noteLimit = 10;
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>
    <NoteLog/>
    <div class="buttonsRow">
    <PlayUserMelodyButton/>
    <StopButton/>
    <GenerateResponseButton/>
    <ClearNoteLogButton/>
    </div>
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
        /*justify-content: space-between;*/
    }

</style>