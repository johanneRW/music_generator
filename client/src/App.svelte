<script>
    import {Router, Link, Route} from "svelte-navigator"
    import SignUp from "./pages/signup/signup.svelte"
    import Login from "./pages/login/login.svelte"
    import {checkIsLoggedIn, logout} from "./store/store.js"
    import {onMount} from "svelte"
    import AuthGuard from "./guards/AuthGuard.svelte"
    import Piano from "./pages/piano/piano.svelte";
    import Generator from "./pages/generator/generator.svelte"
    import Response from "./pages/response/response.svelte"
    import Archive from "./pages/Archive/Archive.svelte";
    import Load from "./pages/load/load.svelte";
    import {socket} from "./store/socketStore.js";
    import toastr from "toastr"
    import {loadedMelody} from "./store/playerStore.js";

    function handleLogout() {
        logout()
    }

    onMount(() => {
        checkIsLoggedIn()
    })

    $socket.on("newMelodyMessage", (data) => {
        console.log("new melody", data)
        loadedMelody.set(data)
        toastr.info(
            "En anden bruger har netop dannet en ny melodi. <a href='load'>Klik her for at høre den!</a>",
//TODO: ryd ud i nogle af variablerne i toastr
        {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        })
    });

</script>

<Router>
    <AuthGuard>
        <div slot="authed">
            <nav>
                <Link to="/generator">Music generator</Link>
                <Link to="/response">Music Response</Link>
                <Link to="/">Piano</Link>
                <Link to ="/archive">Archive</Link>
                <button id="logoutbutton" on:click={handleLogout}>Log out</button>
            </nav>
        </div>
        <div slot="not_authed">
            <nav>
                <Link to="/generator">Music generator</Link>
                <Link to="/response">Music Response</Link>
                <Link to="/">Piano</Link>
                <button id="signupbutton">
                    <Link to="/signup">Sign up</Link>
                </button>
                <button id="loginbutton">
                    <Link to="/login">Login</Link>
                </button>
            </nav>
        </div>
    </AuthGuard>

    <Route path="/">
        <Piano/>
    </Route>
    <Route path="/archive" component={Archive}/>
    <Route path="/signup">
        <SignUp/>
    </Route>
    <Route path="/login">
        <Login/>
    </Route>
    <Route path="/response" component={Response}/>
    <Route path="/generator" component={Generator}/>
    <Route path="/load" component={Load}/>
</Router>
<br>


<style>
    :global(body) {
        font-family: sans-serif;
    }
</style>
