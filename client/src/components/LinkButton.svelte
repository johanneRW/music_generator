<script>
    export let to = ""
    export let color = ""
</script>

<a href={to} class="link-button {color}">
    <slot/>
</a>

<style>
    .link-button {
        border: none;
        border-radius: 8px;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        max-height: 40px;
    }

    .login-green {
        background-color: #9ce38f;
        color: black;
    }

    .signup-blue {
        background-color: #a6c2df;
        color: black;

    }
</style>
