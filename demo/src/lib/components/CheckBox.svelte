<script lang="ts">
	export let checked = false;
</script>

<button class="checkbox-btn" on:click={() => (checked = !checked)}>
	<div class="checkbox">
		<iconify-icon class="checkbox-icon" icon="mdi:checkbox-blank-outline"></iconify-icon>

		{#if checked}
			<iconify-icon class="tick-icon" icon="mdi:tick"></iconify-icon>
		{/if}
	</div>

	<slot />
</button>
