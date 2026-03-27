<script lang="ts">
	import type { AddedBlock } from '$lib/internal/blocks/added';
	import type { BlockComponent } from '$lib/internal/editor/component';

	let { block, component }: { block: AddedBlock; component: BlockComponent } = $props();
</script>

<div class="msm__block {block.placeholderType}" data-component-id={component.id}></div>
