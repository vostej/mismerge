<script lang="ts">
	import type { MergeConflictBlock } from '$lib/internal/blocks/merge-conflict';
	import type { BlockComponent } from '$lib/internal/editor/component';

	let { block, component }: { block: MergeConflictBlock; component: BlockComponent } = $props();
</script>

<div class="msm__block {block.resolvedPlaceholderType}" data-component-id={component.id}></div>
