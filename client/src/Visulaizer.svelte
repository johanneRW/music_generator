<script>
    import {fade} from 'svelte/transition';
    import {bubbles} from "./store/VisualzerStore.js";


</script>
<!--
<div class="bubbles">
    {#each $bubbles as bubble (bubble.id)}
        <div class="bubble"
             style={`left: ${bubble.position}%; bottom: ${bubble.position}%; background-color: ${bubble.color}; width: ${bubble.size}px; height: ${bubble.size}px;`}
             transition:fade={{duration: 2000}}>
        </div>
    {/each}
</div>

<style>
    .bubbles {
        position: relative;
        height: 300px;
        width: 100%;
    }

    .bubble {
        position: absolute;
        border-radius: 50%;
    }
</style>-->

<div class="bubbles">
    {#each $bubbles as bubble (bubble.id)}
        <div class="bubble"
             style={`left: ${bubble.position}%; bottom: ${bubble.position}%; background-color: ${bubble.color}; width: ${bubble.size}px; height: ${bubble.size}px;`}
             on:animationend={() => {
                bubbles.update($bubbles => $bubbles.filter(b => b.id !== bubble.id));
            }}
        >
        </div>
    {/each}
</div>


<style>

    .bubbles {
        position: relative;
        height: 300px;
        width: 100%;
    }
    .bubble {
        position: absolute;
        border-radius: 50%;
        animation: fadeOut 2s ease-out forwards;
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
</style>