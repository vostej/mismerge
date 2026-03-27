import type { EditorColors, Highlighter, LineDiffAlgorithm } from '@mismerge/core';
import { createEffect, onMount } from 'solid-js';
import type { JSX } from 'solid-js';

export function MisMerge3(props: {
	lhs: string;
	ctr: string;
	rhs: string;
	onLhsChange?: (lhs: string) => void;
	onCtrChange?: (ctr: string) => void;
	onRhsChange?: (rhs: string) => void;
	colors?: EditorColors;
	lhsEditable?: boolean;
	ctrEditable?: boolean;
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
	onConflictsResolvedChange?: (conflictsResolved: boolean) => void;
}): JSX.Element {
	let ref!: HTMLElement & Record<string, unknown>;

	onMount(() => {
		// @ts-expect-error No definitions provided for web components
		import('@mismerge/core/web');
	});

	createEffect(() => {
		if (ref) ref['highlight'] = props.highlight;
	});

	return (
		// @ts-expect-error Custom element not in JSX intrinsic elements
		<mis-merge3
			ref={ref!}
			lhs={props.lhs}
			ctr={props.ctr}
			rhs={props.rhs}
			onInput={() => {
				if (props.onLhsChange) {
					props.onLhsChange(ref['lhs'] as string);
				}
				if (props.onCtrChange) {
					props.onCtrChange(ref['ctr'] as string);
				}
				if (props.onRhsChange) {
					props.onRhsChange(ref['rhs'] as string);
				}
				if (props.onConflictsResolvedChange) {
					props.onConflictsResolvedChange(ref['conflictsResolved'] as boolean);
				}
			}}
			colors={JSON.stringify(props.colors)}
			lhsEditable={props.lhsEditable}
			ctrEditable={props.ctrEditable}
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
