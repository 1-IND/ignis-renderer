import clsx from 'clsx';
import { createMemo } from 'solid-js';

import type { Best50, Score } from './def';
import { calcRating } from './def';

export function Best50Stats({ best50 }: { best50: Best50 }) {
	const rat = (x: Score) => calcRating(x.music.levels[x.level].rating, x.acc);
	const b35sum = () => best50.b35.reduce((x, y) => x + rat(y), 0);
	const b15sum = () => best50.b15.reduce((x, y) => x + rat(y), 0);

	return (
		<div class='bg-white/80 p-3 rounded-xl font-digit'>
			<div class='text-xl font-semibold mb-2'>
				{`Rating: ${b35sum()} + ${b15sum()} = ${b35sum() + b15sum()}`}
			</div>
			<Composition class='text-sm h-8 w-245 mb-1' scores={best50.b35} />
			<Composition class='text-sm h-8 w-105 mb-2' scores={best50.b15} />
			<div class='text-lg'>
				Developed by tiger0132. Design inspired by Yuri-YuzuChaN.
			</div>
		</div>
	);
}

function Composition({ scores, class: c }: { scores: Score[]; class?: string }) {
	const comp = createMemo(() => {
		const m = new Map<number, number>();
		scores.forEach((x) => {
			const r = calcRating(x.music.levels[x.level].rating, x.acc);
			m.set(r, (m.get(r) ?? 0) + 1);
		});
		return [...m].sort((a, b) => b[0] - a[0]);
	});

	return (
		<div class={clsx('text-sm flex', c)}>
			{comp().map(([rat, cnt], i) => (
				<div
					class={clsx('flex justify-center items-center', i % 2 === 0 ? 'bg-blue/60' : 'bg-pink/40')}
					style={{ width: `${(cnt / scores.length) * 100}%` }}
				>
					<span>{rat}</span>
				</div>
			))}
		</div>
	);
}
