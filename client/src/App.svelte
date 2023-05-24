<script>
  import { Router, Link, Route } from "svelte-navigator"
  import SignUp from "./pages/signup/signup.svelte"
  import Login from "./pages/login/login.svelte"
  import { checkIsLoggedIn, logout } from "./store/store.js"
  import { onMount } from "svelte"
  import AuthGuard from "./guards/AuthGuard.svelte"
  import Piano from "./pages/piano/piano.svelte";
  import Generator from "./pages/generator/generator.svelte"

  function handleLogout() {
    logout()
  }

  onMount(() => {
    checkIsLoggedIn()
  })

</script>

<Router>
  <AuthGuard>
    <div slot="authed">
      <nav>
        <Link to="/">Piano</Link>
        <button id="logoutbutton" on:click={handleLogout}>Log out</button>
      </nav>
    </div>
    <div slot="not_authed">
      <nav>
        <Link to="/generator">Music generator</Link>
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
    <Piano />
  </Route>
  <Route path="/signup">
    <SignUp />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/generator" component={Generator} />
</Router>
<br>


<style>
  :global(body) {
    font-family: sans-serif;
  }
</style>
