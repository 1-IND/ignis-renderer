import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { AnyScoreF, FilteredChart } from '~/routes/maimai/range';

import Badge, { toDXStar } from '../Badge';
import { Diff } from '../def';

export function bgDimmed(url: string, alpha: number) {
	return {
		'background-image': `linear-gradient(rgba(0, 0, 0, ${alpha}), rgba(0, 0, 0, ${alpha})), url(${url})`,
		'background-size': 'cover',
	};
}
export function PlayCardA(p: { chart: FilteredChart; goal?: AnyScoreF; class?: string }) {
	const achieved = () => isGoalAchieved(p.goal, p.chart);
	const acc = () => p.chart.score ? p.chart.score.dxs / (p.chart.notes.total * 3) : -1;

	return (
		<div
			class={clsx(
				'flex flex-col items-center justify-center relative',
				p.class,
			)}
			style={bgDimmed(p.chart.music.jacketImg, achieved() ? 0.7 : 0.1)}
		>
			<div class={clsx(
				'absolute h-full w-full',
				p.chart.diff === Diff.REM && 'border-white border-5',
				p.chart.diff === Diff.EXP && 'border-red-5 border-5',
				p.chart.music.type !== 'UTG' && p.chart.diff === Diff.ADV && 'border-yellow-4 border-5',
				p.chart.music.type !== 'UTG' && p.chart.diff === Diff.BAS && 'border-green-5 border-5',
			)}
			/>
			<Show when={p.chart.score} fallback={<div class='h-50% w-full' />}>
				<Switch fallback={<div class='h-50% w-full' />}>
					<Match when={p.goal?.type === 'rank' && achieved()}>
						<Badge.Rank class='h-35% w-full object-contain' type={p.chart.score!.rank} />
					</Match>
					<Match when={p.goal?.type === 'combo' && achieved()}>
						<Badge.Combo class='h-50% w-full object-contain' type={p.chart.score!.combo} />
					</Match>
					<Match when={p.goal?.type === 'sync' && achieved()}>
						<Badge.Sync class='h-50% w-full object-contain' type={p.chart.score!.sync} />
					</Match>
					<Match when={p.goal?.type === 'star' && achieved()}>
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
				{p.chart.music.id}
			</div>
		</div>
	);
}
export function isGoalAchieved(goal: AnyScoreF | undefined, chart: FilteredChart) {
	if (goal && chart.score) {
		if (goal.type === 'rank') return chart.score.rank >= goal.value;
		if (goal.type === 'combo') return chart.score.combo >= goal.value;
		if (goal.type === 'sync') return chart.score.sync >= goal.value;
		if (goal.type === 'star') {
			const star = toDXStar(chart.score.dxs / (chart.notes.total * 3));
			return star >= goal.value;
		}
	}
	return false;
}
