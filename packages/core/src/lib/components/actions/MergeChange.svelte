<script lang="ts">
	import type { BlockComponent } from '$lib/internal/editor/component';
	import ArrowIcon from '../icons/ArrowIcon.svelte';

	let {
		component,
		onmerge
	}: {
		component: BlockComponent;
		onmerge: (component: BlockComponent) => void;
	} = $props();
</script>

<button
	class="msm__merge-button"
	aria-label="merge change"
	onclick={() => onmerge(component)}
>
	<ArrowIcon />
</button>
