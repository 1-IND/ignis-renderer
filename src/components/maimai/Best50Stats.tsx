import clsx from 'clsx';
import { createMemo, For } from 'solid-js';

import type { Best50, Score } from './def';
import { calcRating } from './def';

export function Best50Stats(p: { best50: Best50 }) {
	const rat = (x: Score) => calcRating(x.music.levels[x.level].rating, x.acc);
	const b35sum = () => p.best50.b35.reduce((x, y) => x + rat(y), 0);
	const b15sum = () => p.best50.b15.reduce((x, y) => x + rat(y), 0);

	return (
		<div class='rounded-xl bg-white/80 p-3 font-digit'>
			<div class='mb-2 text-xl font-semibold'>
				{`Rating: ${b35sum()} + ${b15sum()} = ${b35sum() + b15sum()}`}
			</div>
			<Composition class='mb-1 h-8 w-245 text-sm' scores={p.best50.b35} />
			<Composition class='mb-2 h-8 w-105 text-sm' scores={p.best50.b15} />
			<div class='text-lg'>
				Developed by tiger0132. Design inspired by Yuri-YuzuChaN.
			</div>
		</div>
	);
}

function Composition(p: { scores: Score[]; class?: string }) {
	const comp = createMemo(() => {
		const m = new Map<number, number>();
		p.scores.forEach((x) => {
			const r = calcRating(x.music.levels[x.level].rating, x.acc);
			m.set(r, (m.get(r) ?? 0) + 1);
		});
		return [...m].sort((a, b) => b[0] - a[0]);
	});

	return (
		<div class={clsx('text-sm flex', p.class)}>
			<For each={comp()}>
				{([rat, cnt], i) => (
					<div
						class={clsx('flex justify-center items-center', i() % 2 === 0 ? 'bg-blue/60' : 'bg-pink/40')}
						style={{ width: `${(cnt / p.scores.length) * 100}%` }}
					>
						<span>{rat}</span>
					</div>
				)}
			</For>
		</div>
	);
}
