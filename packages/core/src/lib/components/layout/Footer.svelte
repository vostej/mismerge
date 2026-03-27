<script lang="ts">
	import type { DiffBlock } from '$lib/internal/blocks';
	import { AddedBlock } from '$lib/internal/blocks/added';
	import { MergeConflictBlock } from '$lib/internal/blocks/merge-conflict';
	import { ModifiedBlock } from '$lib/internal/blocks/modified';
	import { RemovedBlock } from '$lib/internal/blocks/removed';
	import type { Side } from '$lib/internal/editor/side';
	import type { Snippet } from 'svelte';

	let {
		wordsCount,
		charsCount,
		blocks,
		disableWordsCounter,
		disableCharsCounter,
		disableBlocksCounters,
		children
	}: {
		wordsCount: number[];
		charsCount: number[];
		blocks: DiffBlock<Side>[];
		disableWordsCounter: boolean;
		disableCharsCounter: boolean;
		disableBlocksCounters: boolean;
		children?: Snippet;
	} = $props();

	const added = $derived(blocks.filter((b) => b instanceof AddedBlock).length);
	const removed = $derived(blocks.filter((b) => b instanceof RemovedBlock).length);
	const modified = $derived(blocks.filter((b) => b instanceof ModifiedBlock).length);
	const conflicts = $derived(
		blocks.filter((b) => b instanceof MergeConflictBlock && !b.isResolved).length
	);
	const resolved = $derived(
		blocks.filter((b) => b instanceof MergeConflictBlock && b.isResolved).length
	);
</script>

<footer class="msm__footer">
	<div class="msm__footer-content">
		<div class="msm__footer-content-left">
			{#if !disableWordsCounter}
				<div class="msm__words-counter">
					<span>Words:</span>
					<span>
						{wordsCount.map((n) => n.toString()).join('/')}
					</span>
				</div>
			{/if}
			{#if !disableCharsCounter}
				<div class="msm__chars-counter">
					<span>Chars:</span>
					<span>
						{charsCount.map((n) => n.toString()).join('/')}
					</span>
				</div>
			{/if}
		</div>
		<div class="msm__footer-content-right">
			{#if !disableBlocksCounters}
				{#if added}
					<div class="msm__block-counter added">
						<div></div>
						<span>{added} added</span>
					</div>
				{/if}
				{#if removed}
					<div class="msm__block-counter removed">
						<div></div>
						<span>{removed} removed</span>
					</div>
				{/if}
				{#if modified}
					<div class="msm__block-counter modified">
						<div></div>
						<span>{modified} modified</span>
					</div>
				{/if}
				{#if conflicts}
					<div class="msm__block-counter conflict">
						<div></div>
						<span>{conflicts} conflict{conflicts == 1 ? '' : 's'}</span>
					</div>
				{/if}
				{#if resolved}
					<div class="msm__block-counter resolved">
						<div></div>
						<span>{resolved} resolved</span>
					</div>
				{/if}
			{/if}
		</div>
	</div>
	{@render children?.()}
</footer>
