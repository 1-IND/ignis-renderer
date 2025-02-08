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
export function PlayCardA(props: { chart: FilteredChart; goal?: AnyF; class?: string }) {
	const achieved = () => isGoalAchieved(props.goal, props.chart);
	const acc = () => props.chart.score ? props.chart.score.dxs / (props.chart.notes.total * 3) : -1;

	return (
		<div
			class={clsx(
				'flex flex-col items-center justify-center relative',
				props.class,
			)}
			style={bgDimmed(props.chart.music.jacketImg, achieved() ? 0.7 : 0.1)}
		>
			<div class={clsx(
				'absolute h-full w-full',
				props.chart.level === Level.REM && 'border-white border-5',
				props.chart.level === Level.EXP && 'border-red-5 border-5',
				props.chart.music.type !== 'UTG' && props.chart.level === Level.ADV && 'border-yellow-4 border-5',
				props.chart.music.type !== 'UTG' && props.chart.level === Level.BAS && 'border-green-5 border-5',
			)}
			/>
			<Show when={props.chart.score} fallback={<div class='h-50% w-full' />}>
				<Switch fallback={<div class='h-50% w-full' />}>
					<Match when={props.goal?.type === 'rank' && achieved()}>
						<Badge.Rank class='h-35% w-full object-contain' type={props.chart.score!.rank} />
					</Match>
					<Match when={props.goal?.type === 'combo' && achieved()}>
						<Badge.Combo class='h-50% w-full object-contain' type={props.chart.score!.combo} />
					</Match>
					<Match when={props.goal?.type === 'sync' && achieved()}>
						<Badge.Sync class='h-50% w-full object-contain' type={props.chart.score!.sync} />
					</Match>
					<Match when={props.goal?.type === 'star' && achieved()}>
						<Show
							when={acc() >= 0.93}
							fallback={<Badge.DXS class='h-30% w-full object-contain' acc={acc()} />}
						>
							<Badge.DXS class='h-40% w-full object-contain' acc={acc()} />
						</Show>
					</Match>
				</Switch>
			</Show>
			<div class='absolute bottom-2% text-xl text-white font-bold font-digit text-stroke-3 text-stroke-black' style={{ 'paint-order': 'stroke fill' }}>
				{props.chart.music.id}
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
