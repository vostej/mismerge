<script lang="ts">
	import type { RemovedBlock } from '$lib/internal/blocks/removed';
	import type { BlockComponent } from '$lib/internal/editor/component';

	let { block, component }: { block: RemovedBlock; component: BlockComponent } = $props();
</script>

<div class="msm__block {block.placeholderType}" data-component-id={component.id}></div>
