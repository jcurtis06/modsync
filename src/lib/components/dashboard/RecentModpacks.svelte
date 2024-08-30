<script lang="ts">
	import type { Modpack } from '$lib/types';

	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import ModpackCard from './ModpackCard.svelte';

	let modpacks: Modpack[] = [];

	onMount(async () => {
		const rl = await pb.collection('modpacks').getList(1, 50, {
			sort: 'created'
		});

		modpacks = rl.items as unknown as Modpack[];
		console.log(modpacks[0].image);
	});
</script>

<div>
	<p class="text-3xl font-bold">Recently played</p>
	<div class="flex gap-4 mt-4">
		{#each modpacks as modpack}
			<ModpackCard {modpack} />
		{/each}
	</div>
</div>
