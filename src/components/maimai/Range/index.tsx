import { createMemo, Show, For } from 'solid-js';
import { Context, FilteredChart } from '~/routes/maimai/range';
import { isGoalAchieved, PlayCardA } from './PlayCardA';

export function Range({ ctx }: { ctx: Context }) {
	const chartMap = createMemo(() => {
		const map = new Map<number, FilteredChart[]>();
		if (!ctx.charts) return map;
		for (const chart of ctx.charts) {
			const key = chart.rating;
			if (!map.has(key)) map.set(key, []);
			map.get(key)!.push(chart);
		}
		return map;
	});

	return (
		<div class='m-8 flex flex-col gap-4'>
			<Show
				when={[...chartMap().values()].reduce((x, y) => x + Math.ceil(y.length / 12), 0) <= 45}
				fallback='Too many rows'
			>
				<For each={Array
					.from(chartMap())
					?.sort((a, b) => b[0] - a[0])}
				>
					{([rating, charts]) => (
						<div class='flex gap-4'>
							<div class='flex'>
								<div class='flex flex-col items-center justify-center w-32 p-2 border-rounded-xl bg-blue-5/60'>
									<span class='text-3xl font-digit text-white'>{rating.toFixed(1)}</span>
									<Show when={ctx.filter?.main}>
										<span class='text-xl font-digit text-white'>
											{`${charts.reduce((x, y) => x + Number(isGoalAchieved(ctx.filter!.main, y)), 0)} / ${charts.length}`}
										</span>
									</Show>
									{/* TODO: stats */}
								</div>
							</div>
							<div class='grid flex-1 grid-cols-12 gap-4'>
								<For each={charts}>
									{chart => (
										<PlayCardA class='aspect-ratio-square' chart={chart} goal={ctx.filter?.main} />
									)}
								</For>
							</div>
						</div>
					)}
				</For>
			</Show>
		</div>
	);
}
