<script lang="ts">
	import Login from '$lib/components/Login.svelte';
</script>

<div class="w-screen h-screen flex items-center justify-center flex-col">
	<h1 class="text-4xl font-bold text-neutral-content">
		Welcome to <span class="text-primary">ModSync</span>
	</h1>
	<p class="font-semibold mb-12">The simple modpack manager.</p>

	<Login />
</div>
