<script>
    import {bubbles} from "../../store/VisualzerStore.js";


</script>

<div class="bubbles">
    {#each $bubbles as bubble (bubble.id)}
        <div class="bubble"
             style={`left: ${bubble.position}%; bottom: ${bubble.position}%; background: radial-gradient(circle, rgba(${bubble.color},1) 0%, rgba(${bubble.color},0.8) 40%, rgba(${bubble.color},0.6) 70%, rgba(${bubble.color},0) 100%); width: ${bubble.size}px; height: ${bubble.size}px;`}
             on:animationend={() => {
        bubbles.update($bubbles => $bubbles.filter(b => b.id !== bubble.id));
    }}
        >
        </div>
    {/each}
</div>




<style>

    .bubbles {
        background-color: rgba(13, 40, 68);
        position: relative;
        height: 300px;
        width: 100%;
        overflow: hidden;
        border: 2px solid rgb(11, 108, 11);
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