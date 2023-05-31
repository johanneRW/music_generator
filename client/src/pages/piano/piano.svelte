<script>
    import Keyboard from "../../Keyboard/keyboard.svelte";
    import {onDestroy} from "svelte";
    import {
        clearNNMelody,
        clearUserMelody, getNoteName, isPlaying, playUserMelody, stopPlaying, userDelay,
        userMelody,
        userMelodyPosition
    } from "../../store/playerStore.js";
    import Button from "../../PlayerControles/Button.svelte";
    import {addToArchive} from "../../store/archiveStore.js";
    import {get} from "svelte/store";
    import Slider from "../../PlayerControles/Slider.svelte";
    import {user} from "../../store/store.js";
    import toastr from "toastr"

    async function handlePlayUserMelody() {
        await playUserMelody()
    }
    function clearNoteLog() {
        clearUserMelody()
    }

    function saveUserMelody() {
        toastr.info("Saved user melody!")
        addToArchive(get(userMelody))
    }
    let noteLimit = 100;
    onDestroy(()=>{
        clearUserMelody()
        clearNNMelody()
    })
</script>
<div>
    <Keyboard bind:noteLimit={noteLimit}/>
 <!--<UserNoteLog/>-->
    <div class="melodyContainer">
        <h2>User Melody:</h2>
        <div class="melody">
            {#each $userMelody as note, index}
                <p class:selected={$userMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>

    <div class="row">
    <!--<UserDelaySlider/>-->
        <p>Delay: {$userDelay}</p>
        <Slider disabled={($isPlaying)}  bind:value={$userDelay} min={0} max={700} step={50} default_value={500} />
    </div>
    <div class="row">
    <!--<PlayUserMelodyButton/>-->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlayUserMelody}>Play</Button>
    <!--<UserSaveButton/>-->
        <Button disabled={($userMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveUserMelody}>Save Melody</Button>
        <!--<StopButton/>-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
    <!--<ClearNoteLogButton/>-->
        <Button disabled={($userMelody.length === 0)} color="red" handleClick={clearNoteLog}>Clear Note Log</Button>
    </div>

</div>

<style>

    .row{
        display: flex;
    }

    .melodyContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .melody {
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
    }



    .item {
        width: 30px;
        height: 30px;
        margin: 5px;
        text-align: center;
    }


    .melodyContainer p.selected {
        background-color: rgb(255, 206, 43);
        border-radius: 20px;
    }

</style>