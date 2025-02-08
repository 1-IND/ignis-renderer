import clsx from 'clsx';
import type { JSX } from 'solid-js';

import { bg, type User } from '../def';

export function Frame(props: { user: User; class?: string; children: JSX.Element }) {
	return (
		<div
			class={clsx('font-text rounded-lg aspect-ratio-1080/452', props.class)}
			style={bg(props.user.frameImg)}
		>
			{props.children}
		</div>
	);
}
