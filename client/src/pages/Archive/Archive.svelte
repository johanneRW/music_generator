<script>
    import {user} from "../../store/store.js";
    import {loadArchive} from "../../store/archiveStore.js";
    import AuthGuard from "../../guards/AuthGuard.svelte"
    import {onMount} from "svelte";
    import Button from "../../PlayerControles/Button.svelte";

    let archiveItems = [];

    function loadMelody(){}

 /*   onMount(async () => {
        try {
            if ($user.isLoggedIn===true) {
                archiveItems = await loadArchive();
            }
        } catch (error) {
            console.error('Failed to load archive:', error);
        }
    });*/
    $: if ($user.isLoggedIn) {
        loadArchive()
            .then(loadedItems => {
                archiveItems = loadedItems;
            })
            .catch(error => {
                console.error('Failed to load archive:', error);
            });
    }
</script>

<div class="container">
    <AuthGuard>
        <div slot="authed">
            <h2>My Archive</h2>
            {#if archiveItems.length === 0}
                <p>No items in archive.</p>
            {:else}
                <ul>
                    {#each archiveItems as item, index (index)}
                        <li>
                            <div>
                                <Button color="purple" handleClick={loadMelody}>Load Melody</Button>
                                <h5>{item.timestamp}</h5>
                                <p>{item.melody}</p>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
        <div slot="not_authed">
            <p>You are not logged in. Please log in to view your archive.</p>
        </div>
    </AuthGuard>
</div>
