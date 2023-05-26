<script>
    import { onMount } from 'svelte';
    import {user} from "../../store/store.js";
    import {loadArchive} from "../../store/archiveStore.js";
    import AuthGuard from "../../guards/AuthGuard.svelte"


    let archiveItems = [];

    onMount(async () => {
        try {
            if ($user.isLoggedIn) {
                archiveItems = await loadArchive();
            }
        } catch (error) {
            console.error('Failed to load archive:', error);
        }
    });
</script>

<!--TODO: tilføj authGuard når funktionen er oppe og kører-->
<div class="container">
    <h2>My Archive</h2>
    {#if $user.isLoggedIn}
        {#if archiveItems.length === 0}
            <p>No items in archive.</p>
        {:else}
            <ul>
                {#each archiveItems as item (item.id)}
                    <li>
                        <div>
                            <h3>{item.timestamp}</h3>
                            <p>{item.content}</p>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}

    {:else}
        <p>You are not logged in. Please log in to view your archive.</p>
    {/if}
</div>

