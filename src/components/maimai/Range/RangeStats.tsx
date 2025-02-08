import { createMemo, For } from 'solid-js';
import type { JSX } from 'solid-js/h/jsx-runtime';

import Badge, { toDXStar } from '~/components/maimai/Badge';
import { ComboType, RankType, SyncType } from '~/components/maimai/def';
import type { AnyF, FilteredChart } from '~/routes/maimai/range';

import { isGoalAchieved } from './PlayCardA';

export function RangeStats({ charts, goal }: { charts?: FilteredChart[]; goal?: AnyF }) {
	const stats = createMemo(() => {
		const rankMap = new Map<RankType, number>([[RankType.SSSp, 0]]);
		const comboMap = new Map<ComboType, number>([[ComboType.APp, 0]]);
		const syncMap = new Map<SyncType, number>([[SyncType.FSDp, 0]]);
		const starMap = new Map<number, number>([[5, 0]]);
		for (const chart of charts ?? []) {
			if (!chart.score) continue;
			const { rank, combo, sync, dxs } = chart.score;
			rankMap.set(rank, (rankMap.get(rank) ?? 0) + 1);
			comboMap.set(combo, (comboMap.get(combo) ?? 0) + 1);
			syncMap.set(sync, (syncMap.get(sync) ?? 0) + 1);
			const star = toDXStar(dxs / (chart.notes.total * 3));
			starMap.set(star, (starMap.get(star) ?? 0) + 1);
		}
		for (let i = RankType.SSS; i >= 0; i--)
			rankMap.set(i, (rankMap.get(i) ?? 0) + (rankMap.get(i + 1) ?? 0));
		for (let i = ComboType.AP; i >= 0; i--)
			comboMap.set(i, (comboMap.get(i) ?? 0) + (comboMap.get(i + 1) ?? 0));
		for (let i = SyncType.FSD; i >= SyncType.FS; i--)
			syncMap.set(i, (syncMap.get(i) ?? 0) + (syncMap.get(i + 1) ?? 0));
		syncMap.set(SyncType.SP, (syncMap.get(SyncType.SP) ?? 0) + (syncMap.get(SyncType.FS) ?? 0));
		syncMap.set(SyncType.Blank, (syncMap.get(SyncType.Blank) ?? 0) + (syncMap.get(SyncType.SP) ?? 0));
		for (let i = 5; i >= 0; i--)
			starMap.set(i, (starMap.get(i) ?? 0) + (starMap.get(i + 1) ?? 0));

		let totalAchv = charts?.reduce((x, y) => x + (y.score?.acc ?? 0), 0);
		const avgAchv = charts ? `${(totalAchv! / (charts.length * 1e4)).toFixed(4)}%` : 'N/A';

		const achievedCount = charts?.reduce((x, y) => x + Number(isGoalAchieved(goal, y)), 0) ?? 0;
		return { rankMap, comboMap, syncMap, starMap, avgAchv, achievedCount };
	});

	return (
		<div class='bg-white/80 p-3 rounded-xl font-digit'>
			<div class='text-lg'>
				<div class='flex flex-col gap-1 mb-4'>
					<StatsRow el={Badge.Rank} map={stats().rankMap} arr={[RankType.A, RankType.S, RankType.Sp, RankType.SS, RankType.SSp, RankType.SSS, RankType.SSSp]} />
					<StatsRow el={Badge.Combo} map={stats().comboMap} arr={[ComboType.FC, ComboType.FCp, ComboType.AP, ComboType.APp]} />
					<StatsRow el={Badge.Sync} map={stats().syncMap} arr={[SyncType.SP, SyncType.FS, SyncType.FSp, SyncType.FSD, SyncType.FSDp]} />
					<StatsRow el={Badge.DXStar} map={stats().starMap} arr={[1, 2, 3, 4, 5]} />
				</div>

				<ul class='list-disc-inside [&_li]:line-height-none mb-2'>
					<li>{`Progress: ${stats().achievedCount} / ${charts?.length ?? 0}`}</li>
					<li>{`Avg. Achievement: ${stats().avgAchv}`}</li>
				</ul>

				<div>Developed by tiger0132.</div>
			</div>
		</div>
	);
}
function StatsRow<T>({ el, map, arr }: {
	el: (props: { class?: string; type: T }) => JSX.Element;
	map: Map<T, number>;
	arr: T[];
}) {
	// eslint-disable-next-line ts/no-unsafe-assignment
	const E = el as any;
	return (
		<div class='flex gap-1'>
			<For each={arr}>
				{(rank: any) => (
					<div class='w-15 flex flex-col items-center rounded-xl bg-blue/50 px-1 border-blue-4 border-2'>
						<E class='h-5' type={rank} />
						<div class='line-height-none'>{map.get(rank) ?? 0}</div>
					</div>
				)}
			</For>
		</div>
	);
}
