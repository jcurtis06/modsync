<script>
	import { goto } from '$app/navigation';
	import { currentUser, pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('test: ', $currentUser);
	});
</script>

<div class="flex gap-4">
	<div class="w-20 min-h-screen bg-neutral flex flex-col items-center">
		<div class="avatar mx-2 my-4">
			<div class="avatar rounded-lg">
				<img src={$currentUser?.avatar} alt="User Avatar" />
			</div>
		</div>

		<div class="mt-auto mb-4">
			<button class="btn btn-circle btn-outline btn-primary">Set</button>
		</div>
	</div>
	<div class="mt-4">
		<slot />
	</div>
</div>
