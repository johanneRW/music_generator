<script>
    import {user} from "../../store/store.js";
    import {archiveItems, archiveLength, deleteFromArchive, loadArchive} from "../../store/archiveStore.js";
    import AuthGuard from "../../guards/AuthGuard.svelte"
    import Button from "../../PlayerControles/Button.svelte";
    import {navigate} from "svelte-navigator";
    import {loadedMelody} from "../../store/playerStore.js";

    function loadMelody(melodyString) {
        try {
            let melodyArray = JSON.parse(melodyString);
            loadedMelody.set(melodyArray);
            //navigate('/load');
            navigate('/load', { state: { from: 'archive' }});
        } catch (error) {
            console.error('Failed to parse melody:', error);
        }
    }

    async function deleteItem(itemId) {
        try {
            await deleteFromArchive(itemId); // assume this function delete item and update the archive
            //archiveItems.update(items => { return items.filter(item => item.id !== itemId) });
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    }

    $: if ($user.isLoggedIn) {
        loadArchive()
    }
</script>

<div class="archiveContainer">
    <AuthGuard>
        <div slot="authed">
            <h2>My Archive</h2>
            {#if $archiveLength === 0}
                <p>No items in archive.</p>
            {:else}
                <ul>
                    {#each $archiveItems as item, index (item.id)}

                            <div>
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
</style>