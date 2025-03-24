import clsx from 'clsx';
import { createMemo, For, Show } from 'solid-js';

import type { Context, FilteredChart } from '~/routes/maimai/range';

import { isGoalAchieved, PlayCardA } from './PlayCardA';

export function Range(p: { ctx: Context }) {
	const chartMap = createMemo(() => {
		const map = new Map<number, FilteredChart[]>();
		if (!p.ctx.charts) return map;
		for (const chart of p.ctx.charts) {
			const key = chart.rating;
			if (!map.has(key)) map.set(key, []);
			map.get(key)!.push(chart);
		}
		return map;
	});
	const rows = createMemo(() => [...chartMap().values()].reduce((x, y) => x + Math.ceil(y.length / 12), 0));

	return (
		<div class='m-8 flex flex-col gap-4'>
			<Show
				when={rows() <= 45}
				fallback={`Too many rows: ${rows()} > 45`}
			>
				<For each={Array
					.from(chartMap())
					?.sort((a, b) => b[0] - a[0])}
				>
					{([rating, charts]) => {
						const achievedCount = charts.reduce((x, y) => x + Number(isGoalAchieved(p.ctx.filter?.main, y)), 0);

						return (
							<div class='flex gap-4'>
								<div class='flex'>
									<div class={clsx(
										'flex flex-col items-center justify-center w-32 p-2 border-rounded-xl',
										achievedCount !== charts.length ? 'bg-blue-5/60' : 'bg-green-5/60',
									)}
									>
										<span class='text-3xl text-white font-digit'>{rating.toFixed(1)}</span>
										<Show when={p.ctx.filter?.main}>
											<span class='text-xl text-white font-digit'>{`${achievedCount} / ${charts.length}`}</span>
										</Show>
										{/* TODO: stats */}
									</div>
								</div>
								<div class='grid grid-cols-12 flex-1 gap-4'>
									<For each={charts}>
										{chart => (
											<PlayCardA class='aspect-ratio-square' chart={chart} goal={p.ctx.filter?.main} />
										)}
									</For>
								</div>
							</div>
						);
					}}
				</For>
			</Show>
		</div>
	);
}
