<script>
    function myFunction() {
        console.log("Funktionen blev kaldt!");
        
    }
</script>

<button on:click={myFunction} class="centered-button">Generate music</button>

<style>
    .centered-button {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: blue;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    </style>