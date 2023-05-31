<script>
    import {user} from "../../store/userStore.js"
    import {archiveItems, archiveLength, deleteFromArchive, loadArchive} from "../../store/archiveStore.js"
    import AuthGuard from "../../guards/AuthGuard.svelte"
    import Button from "../../components/Button.svelte"
    import {navigate} from "svelte-navigator"
    import {loadedMelody} from "../../store/playerStore.js"

    function loadMelody(melodyString) {
        try {
            let melodyArray = JSON.parse(melodyString)
            loadedMelody.set(melodyArray)
            navigate("/load", {state: {from: "archive"}})
        } catch (error) {
            console.error("Failed to parse melody:", error)
        }
    }

    async function deleteItem(itemId) {
        try {
            await deleteFromArchive(itemId)
        } catch (error) {
            console.error("Failed to delete item:", error)
        }
    }

    $: if ($user.isLoggedIn) {
        loadArchive()
    }
</script>
<p class="pageIntroduction">
    Use the archive to load your previously saved melodies.
    <br>
    (For now, the melodies are displayed as lists of numbers.)
</p>
<div class="archiveContainer">
    <AuthGuard>
        <div slot="authed">
            <h2>Your Archive</h2>
            {#if $archiveLength === 0}
                <p>No melodies in the archive.</p>
            {:else}
                <ul>
                    {#each $archiveItems as item, index (item.id)}
                        <div class="archiveItem">
                            <h5>{item.timestamp}</h5>
                            <p>{item.melody}</p>
                            <Button color="purple" handleClick={() => loadMelody(item.melody)}>Load Melody</Button>
                            <Button color="red" handleClick={() => deleteItem(item.id)}>Delete</Button>
                        </div>
                    {/each}
                </ul>
            {/if}
        </div>
        <div slot="not_authed">
            <p>You are not logged in. Please log in to view your archive.</p>
        </div>
    </AuthGuard>
</div>

<style>
    .archiveItem {
        padding-bottom: 4vh;
        border-bottom: #a0b8cc solid 2px;
    }

    .archiveItem p {
        word-wrap: break-word;
        overflow-wrap: break-word;
    }
</style>