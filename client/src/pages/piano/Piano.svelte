<script>
    import Keyboard from "../../components/Keyboard/Keyboard.svelte"
    import {onDestroy} from "svelte"
    import {
        clearNNMelody, clearUserMelody, getNoteName, isPlaying, playUserMelody, stopPlaying,
        userDelay, userMelody, userMelodyPosition,
    } from "../../store/playerStore.js"
    import {addToArchive} from "../../store/archiveStore.js"
    import {get} from "svelte/store"
    import Slider from "../../components/Slider.svelte"
    import Button from "../../components/Button.svelte"
    import {user} from "../../store/userStore.js"
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

    let noteLimit = 100
    onDestroy(() => {
        clearUserMelody()
        clearNNMelody()
    })
</script>
<p class="pageIntroduction">
    Use this page to create your own melodies, without involving the melody generator. Be creative!
</p>
<div>
    <!--Keyboard-->
    <Keyboard bind:noteLimit={noteLimit}/>
    <!--User melody notelog-->
    <div class="melodyContainer">
        <h2>User Melody:</h2>
        <div class="melody">
            {#each $userMelody as note, index}
                <p class:selected={$userMelodyPosition === index} class=item>{getNoteName(note)}</p>
            {/each}
        </div>
    </div>
    <!-- Delay-slider for user melody-->
    <label>
        Delay: {$userDelay}
        <Slider disabled={($isPlaying)} bind:value={$userDelay} min={0} max={700} step={50} default_value={500}/>
    </label>
    <div class="row">
        <!--Button for playing user melody-->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="green" handleClick={handlePlayUserMelody}>Play
        </Button>
        <!--Button for saving user melody-->
        <Button disabled={($userMelody.length === 0||!$user.isLoggedIn)} color="purple" handleClick={saveUserMelody}>
            Save Melody
        </Button>
        <!--Button for stopping playing melody-->
        <Button disabled={(!$isPlaying)} color="orange" handleClick={stopPlaying}>Stop</Button>
        <!--Button for clearing user notelog -->
        <Button disabled={($userMelody.length === 0||$isPlaying)} color="red" handleClick={clearNoteLog}>Clear Note Log</Button>
    </div>
</div>

<style>
    .row {
        display: flex;
    }

    .melodyContainer {
        padding: 4vh 4vw 8vh 2vw;
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