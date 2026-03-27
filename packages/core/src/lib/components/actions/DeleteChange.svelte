<script lang="ts">
	import type { BlockComponent } from '$lib/internal/editor/component';
	import CrossIcon from '../icons/CrossIcon.svelte';

	let {
		component,
		ondelete
	}: {
		component: BlockComponent;
		ondelete: (component: BlockComponent) => void;
	} = $props();
</script>

<button class="msm__delete-button" aria-label="delete change" onclick={() => ondelete(component)}>
	<CrossIcon />
</button>
