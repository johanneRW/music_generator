<script>
    import NNNoteLog from "../../NoteLog/NNNoteLog.svelte";
    import GenerateMelodyButton from "../../PlayerControl/GenerateMelodyButton.svelte";
    import PlayNNMelodyButton from "../../PlayerControl/PlayNNMelodyButton.svelte";
    import StopButton from "../../PlayerControl/StopButton.svelte";
    import SaveButton from "../../PlayerControl/SaveButton.svelte";

</script>

<div>
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