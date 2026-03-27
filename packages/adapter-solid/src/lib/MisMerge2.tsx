import type { EditorColors, Highlighter, LineDiffAlgorithm } from '@mismerge/core';
import { createEffect, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export function MisMerge2(props: {
	lhs: string;
	rhs: string;
	onLhsChange?: (lhs: string) => void;
	onRhsChange?: (rhs: string) => void;
	colors?: EditorColors;
	lhsEditable?: boolean;
	rhsEditable?: boolean;
	lineDiffAlgorithm?: LineDiffAlgorithm;
	class?: string;
	disableMerging?: boolean;
	wrapLines?: boolean;
	disableFooter?: boolean;
	disableWordsCounter?: boolean;
	disableBlocksCounter?: boolean;
	highlight?: Highlighter;
	ignoreWhitespace?: boolean;
	ignoreCase?: boolean;
}): JSX.Element {
	// eslint-disable-next-line prefer-const
	let ref: HTMLElement & Record<string, unknown>;

	onMount(() => {
		// @ts-expect-error No definitions provided for web components
		import('@mismerge/core/web');
	});

	createEffect(() => {
		if (ref) ref['highlight'] = props.highlight;
	});

	return (
		// @ts-expect-error Custom element not in JSX intrinsic elements
		<mis-merge2
			ref={ref!}
			lhs={props.lhs}
			rhs={props.rhs}
			onInput={() => {
				if (props.onLhsChange) {
					props.onLhsChange(ref['lhs'] as string);
				}
				if (props.onRhsChange) {
					props.onRhsChange(ref['rhs'] as string);
				}
			}}
			colors={JSON.stringify(props.colors)}
			lhsEditable={props.lhsEditable}
			rhsEditable={props.rhsEditable}
			lineDiffAlgorithm={props.lineDiffAlgorithm}
			class={props.class}
			disableMerging={props.disableMerging}
			wrapLines={props.wrapLines}
			disableFooter={props.disableFooter}
			disableWordsCounter={props.disableWordsCounter}
			disableBlocksCounter={props.disableBlocksCounter}
			ignoreWhitespace={props.ignoreWhitespace}
			ignoreCase={props.ignoreCase}
		/>
	);
}
