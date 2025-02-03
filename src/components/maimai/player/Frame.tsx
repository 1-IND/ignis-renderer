import clsx from 'clsx';
import type { JSX } from 'solid-js';

import { bg, type User } from '../def';

export function Frame({ user, class: c, children }: { user: User; class?: string; children: JSX.Element }) {
	return (
		<div
			class={clsx('font-text rounded-lg aspect-ratio-1080/452', c)}
			style={bg(user.frameImg)}
		>
			{children}
		</div>
	);
}
