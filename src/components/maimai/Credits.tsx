import clsx from 'clsx';
import type { JSX } from 'solid-js';

export function Credits({ children, class: c }: { children: JSX.Element; class?: string }) {
	return (
		<div class={clsx('border-8 border-solid border-rounded-xl p-2 border-white/20 bg-white/40 text-center', c)}>
			{children}
		</div>
	);
}
