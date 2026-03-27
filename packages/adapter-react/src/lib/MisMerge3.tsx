import type { EditorColors, Highlighter, LineDiffAlgorithm } from '@vostej/core';
import { useEffect, useRef } from 'react';

export function MisMerge3({
	lhs,
	ctr,
	rhs,
	onLhsChange,
	onCtrChange,
	onRhsChange,
	colors,
	lhsEditable,
	ctrEditable,
	rhsEditable,
	lineDiffAlgorithm,
	className,
	disableMerging,
	wrapLines,
	disableFooter,
	disableWordsCounter,
	disableBlocksCounter,
	highlight,
	ignoreWhitespace,
	ignoreCase,
	onConflictsResolvedChange
}: {
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
	className?: string;
	disableMerging?: boolean;
	wrapLines?: boolean;
	disableFooter?: boolean;
	disableWordsCounter?: boolean;
	disableBlocksCounter?: boolean;
	highlight?: Highlighter;
	ignoreWhitespace?: boolean;
	ignoreCase?: boolean;
	onConflictsResolvedChange?: (conflictsResolved: boolean) => void;
}) {
	const ref = useRef<HTMLElement & Record<string, unknown>>(null);

	useEffect(() => {
		// @ts-expect-error No definitions provided for web components
		import('@vostej/core/web');
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current['highlight'] = highlight;
		}
	}, [highlight]);

	return (
		// @ts-expect-error Custom element not in JSX intrinsic elements
		<mis-merge3
			ref={ref}
			lhs={lhs}
			ctr={ctr}
			rhs={rhs}
			onInput={() => {
				if (onLhsChange) {
					onLhsChange(ref.current!['lhs'] as string);
				}

				if (onCtrChange) {
					onCtrChange(ref.current!['ctr'] as string);
				}

				if (onRhsChange) {
					onRhsChange(ref.current!['rhs'] as string);
				}

				if (onConflictsResolvedChange) {
					onConflictsResolvedChange(ref.current!['conflictsResolved'] as boolean);
				}
			}}
			colors={JSON.stringify(colors)}
			lhsEditable={lhsEditable}
			ctrEditable={ctrEditable}
			rhsEditable={rhsEditable}
			lineDiffAlgorithm={lineDiffAlgorithm}
			class={className}
			disableMerging={disableMerging}
			wrapLines={wrapLines}
			disableFooter={disableFooter}
			disableWordsCounter={disableWordsCounter}
			disableBlocksCounter={disableBlocksCounter}
			highlight={highlight}
			ignoreWhitespace={ignoreWhitespace}
			ignoreCase={ignoreCase}
		/>
	);
}
