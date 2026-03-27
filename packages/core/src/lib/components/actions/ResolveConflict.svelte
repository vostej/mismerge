<script lang="ts">
	import type { BlockComponent } from '$lib/internal/editor/component';
	import PenIcon from '../icons/PenIcon.svelte';
	import PencilOffIcon from '../icons/PencilOffIcon.svelte';

	let {
		component,
		toggleResolved,
		resolved,
		onresolve
	}: {
		component: BlockComponent;
		toggleResolved: () => void;
		resolved: boolean;
		onresolve?: (component: BlockComponent) => void;
	} = $props();
</script>

<button
	class="msm__resolve-button"
	aria-label="mark as {resolved ? 'unresolved' : 'resolved'}"
	onclick={() => {
		toggleResolved();
		onresolve?.(component);
	}}
>
	{#if resolved}
		<PencilOffIcon />
	{:else}
		<PenIcon />
	{/if}
</button>
