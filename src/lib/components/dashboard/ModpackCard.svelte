<script lang="ts">
	import { getMinecraftAccount } from '$lib/pmc';
	import { pb } from '$lib/pocketbase';
	import type { MinecraftAccount, Modpack } from '$lib/types';
	import { invoke } from '@tauri-apps/api';
	import { onMount } from 'svelte';

	export let modpack: Modpack;

	let modpackImage = '';
	let modal: HTMLDialogElement;

	onMount(async () => {
		let record = await pb.collection('modpacks').getOne(modpack.id);
		modpackImage = pb.files.getUrl(record, modpack.image, {});
	});

	async function play() {
		try {
			const mods = await pb.collection('modpack_mods').getFullList({
				filter: `modpack = "${modpack.id}"`
			});

			const modIds = mods.map((mod) => mod.mod);
			console.log(modIds);
			// get the mod urls from the mods table
			let modUrls = [];
			for (let modId of modIds) {
				console.log(modId);
				const mod = await pb.collection('mods').getOne(modId);
				modUrls.push(mod.download_url);
			}

			console.log(modUrls);

			invoke('download_mods', {
				urls: modUrls,
				profileName: modpack.name
			});
		} catch (e) {
			console.error(e);
			return;
		}

		let acc: MinecraftAccount | null;

		try {
			acc = await getMinecraftAccount();
		} catch (e) {
			acc = null;
		}

		if (acc == null) {
			modal.showModal();
			return;
		}

		try {
			const res = await invoke('play', {
				modpackName: modpack.name,
				modpackLoader: modpack.loader,
				mcVersion: modpack.inherits,
				email: acc.email
			});
			console.log(res);
		} catch (e) {
			console.error(e);
		}
	}

	async function login() {
		try {
			const res = await invoke('login');
			console.log(res);
		} catch (e) {
			console.error(e);
		}

		console.log('Logged in');
		modal.close();
		play();
	}
</script>

<div class="card bg-base-300 w-80 shadow-xl">
	<figure>
		<img src={modpackImage} alt={modpack.name} class="h-36 w-full object-cover" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{modpack.name}
		</h2>
		<p class="font-mono text-xs">{modpack.loader} {modpack.inherits}</p>
		<p>{modpack.description}</p>
		<div class="card-actions justify-end">
			<button on:click={play} class="btn btn-primary">Play</button>
		</div>
	</div>
</div>

<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Add a Minecraft account</h3>
		<p class="py-4">You'll need to connect your Minecraft account to play this pack</p>
		<div class="flex gap-4">
			<input
				type="text"
				placeholder="Minecraft/Microsoft Email"
				class="input input-primary w-full"
			/>
			<button on:click={login} class="btn btn-primary">Connect via Microsoft</button>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-error">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
