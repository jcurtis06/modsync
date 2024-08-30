<script lang="ts">
	import { invoke } from '@tauri-apps/api/tauri';

	export let open = false;

	async function connectMinecraft() {
		try {
			const res = await invoke('login');
			console.log(res);
		} catch (e) {
			console.error(e);
		}
	}
</script>

<dialog id="my_modal_1" class="modal" {open}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<!-- <div>
	<input type="text" placeholder="Minecraft/Microsoft Email" />
	<button on:click={connectMinecraft}>Connect</button>
</div> -->
