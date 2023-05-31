<script>
    import {Link, Route, Router} from "svelte-navigator"
    import SignUp from "./pages/signup/Signup.svelte"
    import Login from "./pages/login/Login.svelte"
    import AuthGuard from "./guards/AuthGuard.svelte"
    import Piano from "./pages/piano/Piano.svelte"
    import Button from "./components/Button.svelte"
    import LinkButton from "./components/LinkButton.svelte"
    import MelodyResponder from "./pages/response/MelodyResponder.svelte"
    import MelodyGenerator from "./pages/generator/MelodyGenerator.svelte"
    import LoadedMelody from "./pages/load/LoadedMelody.svelte"
    import MelodyArchive from "./pages/Archive/MelodyArchive.svelte"
    import {checkIsLoggedIn, logout} from "./store/userStore.js"
    import {onMount} from "svelte"
    import {socket} from "./store/socketStore.js"
    import toastr from "toastr"

    function handleLogout() {
        logout()
    }

    onMount(() => {
        checkIsLoggedIn()
    })

    $socket.on("newMelodyMessage", (data) => {
        sessionStorage.setItem("newMelody", JSON.stringify(data))
        toastr.info(
            "Another user has just created a new melody. <a href='/load'>Click here to listen to it!</a>",
            {
                "closeButton": true,
                "preventDuplicates": true,
                "timeOut": "10000",
            },
        )
    })

</script>

<Router>
    <AuthGuard>
        <div slot="authed">
            <nav>
                <Link to="/generator">Music Generator</Link>
                <Link to="/response">Music Response</Link>
                <Link to="/">Piano</Link>
                <Link to="/archive">Archive</Link>
                <Button color="logout-red" handleClick={handleLogout}>Log out</Button>
            </nav>
        </div>
        <div slot="not_authed">
            <nav>
                <Link to="/generator">Music Generator</Link>
                <Link to="/response">Music Response</Link>
                <Link to="/">Piano</Link>
                <LinkButton to="/signup" color="signup-blue ">Sign up</LinkButton>
                <LinkButton to="/login" color="login-green ">Login</LinkButton>
            </nav>
        </div>
    </AuthGuard>

    <Route path="/">
        <Piano/>
    </Route>
    <Route path="/archive">
        <MelodyArchive/>
    </Route>
    <Route path="/signup">
        <SignUp/>
    </Route>
    <Route path="/login">
        <Login/>
    </Route>
    <Route path="/response">
        <MelodyResponder/>
    </Route>
    <Route path="/generator">
        <MelodyGenerator/>
    </Route>
    <Route path="/load">
        <LoadedMelody/>
    </Route>
</Router>
<br>


<style>
    :global(body) {
        font-family: sans-serif;
    }

    nav {
        border-bottom: #DEE0E8FF solid 2px;
    }
</style>
