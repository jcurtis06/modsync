<script lang="ts">
	import { getMinecraftAccount } from '$lib/pmc';
	import type { MinecraftAccount } from '$lib/types';
	import { path } from '@tauri-apps/api';
	import { onMount } from 'svelte';

	let acc: MinecraftAccount | null;

	onMount(async () => {
		try {
			acc = await getMinecraftAccount();
		} catch (e) {
			acc = null;
		}
	});
</script>

{#if acc}
	<div>
		<h2 class="text-lg font-bold">Active Minecraft Account</h2>
		<p>{acc.username}, {acc.email}</p>
	</div>
{/if}
