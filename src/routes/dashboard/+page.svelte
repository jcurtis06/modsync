<script lang="ts">
	import ConnectMinecraft from '$lib/components/ConnectMinecraft.svelte';
	import RecentModpacks from '$lib/components/dashboard/RecentModpacks.svelte';
	import ActiveAccount from '$lib/components/misc/ActiveAccount.svelte';
</script>

<div>
	<ActiveAccount />
	<ConnectMinecraft />
	<RecentModpacks />
</div>
