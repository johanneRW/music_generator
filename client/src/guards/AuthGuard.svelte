<!-- Based on https://svelte.dev/repl/5673ff403af14411b0cd1785be3d996f?version=3.58.0 -->
<script>
	import { user } from "../store/store"
</script>

{#if $user.isLoggedIn}
	<slot name="authed" />
{:else}
	<slot name="not_authed" />
{/if}
