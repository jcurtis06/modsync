<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	onMount(async () => {
		console.log('Current User', currentUser);

		if (get(currentUser)) {
			console.log('signed in: ', currentUser);
			goto('/dashboard');
		} else {
			console.log('no currentUser');
			goto('/signIn');
		}
	});
</script>

<h1 class="text-4xl font-bold text-neutral-content">Loading...</h1>
