import clsx from 'clsx';
import { createMemo, For, Show } from 'solid-js';

import type { Best50, Score } from './def';
import { calcRating } from './def';

export function Best50Stats(p: { best50: Best50 }) {
	const rat = (x: Score) => calcRating(x.music.diffs[x.diff]!.rating, x.acc);
	const b35sum = () => p.best50.b35.reduce((x, y) => x + rat(y), 0);
	const b15sum = () => p.best50.b15.reduce((x, y) => x + rat(y), 0);

	return (
		<div class='rounded-xl bg-white/80 p-3 font-digit'>
			<div class='mb-2 text-xl font-semibold'>
				{`Rating: ${b35sum()} + ${b15sum()} = ${b35sum() + b15sum()}`}
			</div>
			<Composition class='mb-1 h-8 w-245 text-sm' scores={p.best50.b35} n={35} />
			<Composition class='mb-2 h-8 w-105 text-sm' scores={p.best50.b15} n={15} />
			<div class='text-lg'>
				Developed by tiger0132. Design inspired by Yuri-YuzuChaN.
			</div>
		</div>
	);
}

function Composition(p: { scores: Score[]; class?: string; n: number }) {
	const comp = createMemo(() => {
		const m = new Map<number, number>();
		p.scores.forEach((x) => {
			const r = calcRating(x.music.diffs[x.diff]!.rating, x.acc);
			m.set(r, (m.get(r) ?? 0) + 1);
		});
		return [...m].sort((a, b) => b[0] - a[0]);
	});

	return (
		<div class={clsx('text-sm flex [&_:first-child]:rd-l-[0.5rem] [&_:last-child]:rd-r-[0.5rem]', p.class)}>
			<For each={comp()}>
				{([rat, cnt], i) => (
					<div
						class={clsx('flex justify-center items-center', i() % 2 === 0 ? 'bg-blue/60' : 'bg-pink/40')}
						style={{ width: `${(cnt / p.n) * 100}%` }}
					>
						<span>{rat}</span>
					</div>
				)}
			</For>
			<Show when={p.scores.length < p.n}>
				<div
					class={clsx('flex justify-center items-center bg-gray/40')}
					style={{ width: `${((p.n - p.scores.length) / p.n) * 100}%` }}
				>
					<span>0</span>
				</div>
			</Show>
		</div>
	);
}
