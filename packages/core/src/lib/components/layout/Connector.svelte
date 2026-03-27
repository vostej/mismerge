<script lang="ts">
	import type { EditorColors } from '$lib/internal/editor/colors';
	import { drawConnections, type Connection } from '$lib/internal/editor/connection';

	let {
		colors,
		lhsViewElem,
		rhsViewElem
	}: {
		colors: EditorColors;
		lhsViewElem: HTMLDivElement | undefined;
		rhsViewElem: HTMLDivElement | undefined;
	} = $props();

	let canvas: HTMLCanvasElement;
	let width = $state(0);
	let height = $state(0);
	let savedContainer: HTMLDivElement | undefined;
	let savedConnections: Connection[] = [];

	export function draw(container: HTMLDivElement, connections: Connection[]) {
		savedContainer = container;
		savedConnections = connections;
		if (lhsViewElem && rhsViewElem) {
			drawConnections(canvas, connections, colors, lhsViewElem, rhsViewElem, container);
		}
	}

	function resize(w: number, h: number) {
		if (!canvas) return;
		if (canvas.width == w && canvas.height == h) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		ctx.canvas.width = w;
		ctx.canvas.height = h;
		ctx.putImageData(imageData, 0, 0);
	}

	function redraw() {
		if (!canvas || !savedContainer || !savedConnections) return;
		draw(savedContainer, savedConnections);
	}

	$effect(() => {
		void lhsViewElem;
		void rhsViewElem;
		void colors;
		redraw();
	});

	$effect(() => {
		resize(width, height);
	});
</script>

<div class="msm__connector" bind:offsetWidth={width} bind:offsetHeight={height}>
	<canvas bind:this={canvas}></canvas>
</div>
