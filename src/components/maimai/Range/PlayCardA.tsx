import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { AnyF, FilteredChart } from '~/routes/maimai/range';

import Badge, { toDXStar } from '../Badge';

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

	return (
		<div
			class={clsx(
				'flex flex-col items-center justify-center',
				c,
			)}
			style={bgDimmed(chart.music.jacketImg, achieved ? 0.7 : 0.1)}
		>
			<Show when={chart.score} fallback={<div class='w-50% h-50%' />}>
				<Switch fallback={<div class='w-50% h-50%' />}>
					<Match when={goal?.type === 'rank' && achieved}>
						<Badge.Rank class='w-50% h-50% object-contain' type={chart.score!.rank} />
					</Match>
					<Match when={goal?.type === 'combo' && achieved}>
						<Badge.Combo class='w-50% h-50% object-contain' type={chart.score!.combo} />
					</Match>
					<Match when={goal?.type === 'sync' && achieved}>
						<Badge.Sync class='w-50% h-50% object-contain' type={chart.score!.sync} />
					</Match>
					<Match when={goal?.type === 'star' && achieved}>
						<Badge.DXS class='w-50% h-25% my-12.5% object-contain' acc={chart.score!.dxs / (chart.notes.total * 3)} />
					</Match>
				</Switch>
			</Show>
			<div class='text-white text-2xl font-bold font-digit text-stroke-3 text-stroke-black' style={{ 'paint-order': 'stroke fill' }}>
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
