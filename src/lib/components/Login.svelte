<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	import { fade } from 'svelte/transition';

	let isLogin = true;
	let email: string;
	let username: string;
	let password: string;

	function toggleLogin() {
		isLogin = !isLogin;
	}

	async function login() {
		await pb.collection('users').authWithPassword(username, password);
	}

	async function signUp() {
		try {
			const data = {
				username,
				password,
				email,
				avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${username}`,
				passwordConfirm: password
			};

			const createdUser = await pb.collection('users').create(data);
			pb.collection('users').requestVerification(email);
			await login();
		} catch (err) {
			console.error(err);
		}
	}

	function signOut() {
		pb.authStore.clear();
		goto('/signIn');
	}

	currentUser.subscribe((user) => {
		if (user) {
			goto('/dashboard');
		}
	});
</script>

{#if $currentUser}
	<p>Signed in as {$currentUser.username}</p>
	<button on:click={signOut}>Sign Out</button>
{:else}
	<form on:submit|preventDefault class="flex flex-col w-1/3 gap-4">
		{#if !isLogin}
			<input
				placeholder="Email"
				type="text"
				bind:value={email}
				class="input input-primary"
				transition:fade={{ duration: 100 }}
			/>
		{/if}
		<div class="flex flex-col gap-4">
			<input placeholder="Username" type="text" bind:value={username} class="input input-primary" />
			<input
				placeholder="Password"
				type="password"
				bind:value={password}
				class="input input-primary"
			/>

			{#if isLogin}
				<button type="button" on:click={login} class="btn btn-primary">Login</button>
			{:else}
				<button type="button" on:click={signUp} class="btn btn-primary">Sign Up</button>
			{/if}

			<p class="text-center">{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>

			<button type="button" on:click={toggleLogin} class="btn btn-ghost">
				{isLogin ? 'Sign Up' : 'Log In'}
			</button>
		</div>
	</form>
{/if}
