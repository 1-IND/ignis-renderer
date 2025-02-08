import type { Component } from 'solid-js';
import { createMemo, For } from 'solid-js';

import Badge, { toDXStar } from '~/components/maimai/Badge';
import { ComboType, RankType, SyncType } from '~/components/maimai/def';
import type { AnyF, FilteredChart } from '~/routes/maimai/range';

import { isGoalAchieved } from './PlayCardA';

export function RangeStats(props: { charts: FilteredChart[]; goal?: AnyF }) {
	const stats = createMemo(() => {
		const rankMap = new Map<RankType, number>([[RankType.SSSp, 0]]);
		const comboMap = new Map<ComboType, number>([[ComboType.APp, 0]]);
		const syncMap = new Map<SyncType, number>([[SyncType.FSDp, 0]]);
		const starMap = new Map<number, number>([[5, 0]]);
		for (const chart of props.charts) {
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

		const totalAchv = props.charts.reduce((x, y) => x + (y.score?.acc ?? 0), 0);
		const avgAchv = `${(totalAchv / (props.charts.length * 1e4)).toFixed(4)}%`;

		return { rankMap, comboMap, syncMap, starMap, avgAchv };
	});
	// eslint-disable-next-line solid/reactivity
	const achievedCnt = createMemo(() => props.charts?.reduce((x, y) => x + Number(isGoalAchieved(props.goal, y)), 0) ?? 0);
	const total = () => props.charts?.length ?? 0;

	return (
		<div class='rounded-xl bg-white/80 p-3 font-digit'>
			<div class='text-lg'>
				<div class='mb-4 flex flex-col gap-1'>
					<StatsRow el={Badge.Rank} map={stats().rankMap} total={total()} arr={[RankType.A, RankType.S, RankType.Sp, RankType.SS, RankType.SSp, RankType.SSS, RankType.SSSp]} />
					<StatsRow el={Badge.Combo} map={stats().comboMap} total={total()} arr={[ComboType.FC, ComboType.FCp, ComboType.AP, ComboType.APp]} />
					<StatsRow el={Badge.Sync} map={stats().syncMap} total={total()} arr={[SyncType.SP, SyncType.FS, SyncType.FSp, SyncType.FSD, SyncType.FSDp]} />
					<StatsRow el={Badge.DXStar} map={stats().starMap} total={total()} arr={[1, 2, 3, 4, 5]} />
				</div>

				<ul class='mb-2 list-disc-inside [&_li]:line-height-none'>
					<li>{`Progress: ${achievedCnt()} / ${total()}`}</li>
					<li>{`Avg. Achievement: ${stats().avgAchv}`}</li>
				</ul>

				<div>Developed by tiger0132 (overseen by shshsh).</div>
			</div>
		</div>
	);
}
function StatsRow<T>(props: {
	el: Component<{ class?: string; type: T }>;
	map: Map<T, number>;
	arr: T[];
	total: number;
}) {
	return (
		<div class='flex gap-1'>
			<For each={props.arr}>
				{(rank) => {
					const cnt = props.map.get(rank) ?? 0;
					return (
						<div class='w-15 flex flex-col items-center border-2 border-blue-4 rounded-xl bg-blue/50 px-1'>
							<props.el class='h-5' type={rank} />
							<div class='line-height-none'>{cnt === props.total ? 'MAX' : cnt}</div>
						</div>
					);
				}}
			</For>
		</div>
	);
}
