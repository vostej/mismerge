<script lang="ts">
	let {
		content,
		highlight,
		width
	}: {
		content: string;
		highlight: (text: string) => string | Promise<string>;
		width: number;
	} = $props();

	let highlighted = $state('');

	$effect(() => {
		(async () => {
			highlighted = await highlight(content);
		})();
	});
</script>

{#if highlighted}
	<div style="--width: {width}px;" class="msm__highlight-overlay">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<pre>{@html highlighted}</pre>
	</div>
{/if}
