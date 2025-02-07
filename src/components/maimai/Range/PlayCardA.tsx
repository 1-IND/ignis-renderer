import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { AnyF, FilteredChart } from '~/routes/maimai/range';

import Badge, { toDXStar } from '../Badge';
import { Level } from '../def';

export function bgDimmed(url: string, alpha: number) {
	return {
		'background-image': `linear-gradient(rgba(0, 0, 0, ${alpha}), rgba(0, 0, 0, ${alpha})), url(${url})`,
		'background-size': 'cover',
	};
}
function check<T>(m: T[], v: T) {
	if (m.length === 0) return true;
	if (m.length === 1) return m[0] <= v;
	if (m.length === 2) return m[0] <= v && v <= m[1];
	return m.includes(v);
}
export function PlayCardA({ chart, goal, class: c }: { chart: FilteredChart; goal?: AnyF; class?: string }) {
	const achieved = isGoalAchieved(goal, chart);
	const acc = chart.score ? chart.score.dxs / (chart.notes.total * 3) : -1;

	return (
		<div
			class={clsx(
				'flex flex-col items-center justify-center relative',
				c,
			)}
			style={bgDimmed(chart.music.jacketImg, achieved ? 0.7 : 0.1)}
		>
			<div class={clsx(
				'absolute h-full w-full',
				chart.level === Level.REM && 'border-white border-5',
				chart.level === Level.EXP && 'border-red-5 border-5',
				chart.music.type !== 'UTG' && chart.level === Level.ADV && 'border-yellow-4 border-5',
				chart.music.type !== 'UTG' && chart.level === Level.BAS && 'border-green-5 border-5',
			)}
			/>
			<Show when={chart.score} fallback={<div class='w-full h-50%' />}>
				<Switch fallback={<div class='w-full h-50%' />}>
					<Match when={goal?.type === 'rank' && achieved}>
						<Badge.Rank class='w-full h-35% object-contain' type={chart.score!.rank} />
					</Match>
					<Match when={goal?.type === 'combo' && achieved}>
						<Badge.Combo class='w-full h-50% object-contain' type={chart.score!.combo} />
					</Match>
					<Match when={goal?.type === 'sync' && achieved}>
						<Badge.Sync class='w-full h-50% object-contain' type={chart.score!.sync} />
					</Match>
					<Match when={goal?.type === 'star' && achieved}>
						<Show
							when={acc >= 0.93}
							fallback={<Badge.DXS class='w-full h-30% object-contain' acc={acc} />}
						>
							<Badge.DXS class='w-full h-40% object-contain' acc={acc} />
						</Show>
					</Match>
				</Switch>
			</Show>
			<div class='text-white text-xl font-bold font-digit text-stroke-3 text-stroke-black bottom-2% absolute' style={{ 'paint-order': 'stroke fill' }}>
				{chart.music.id}
			</div>
		</div>
	);
}
export function isGoalAchieved(goal: AnyF | undefined, chart: FilteredChart) {
	let achieved = false;
	if (goal && chart.score) {
		if (goal.type === 'rank') achieved = check(goal.value, chart.score.rank);
		if (goal.type === 'combo') achieved = check(goal.value, chart.score.combo);
		if (goal.type === 'sync') achieved = check(goal.value, chart.score.sync);
		if (goal.type === 'star') {
			const star = toDXStar(chart.score.dxs / (chart.notes.total * 3));
			achieved = check(goal.value, star);
		}
	}
	return achieved;
}
