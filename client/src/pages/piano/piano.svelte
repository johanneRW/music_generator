<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import NoteLog from "../../NoteLog/NoteLog.svelte";
    import PlayerControl from "../../PlayerControl/PlayerControl.svelte";

    let noteLimit = 100;
</script>
<div class="keyboard">
    <Keyboard bind:noteLimit={noteLimit}/>
    <NoteLog/>
    <PlayerControl/>
</div>
