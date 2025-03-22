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
			<Mask chart={p.chart} />
			{/* 如果不加这个 fallback，那么 ID 的字体加载完之后，会把整个东西的布局带歪，原因未知。 */}
			<Show when={p.chart.score && achieved()} fallback={<img src='1' class='h-0 w-0' />}>
				<ScoreBadge chart={p.chart} goal={p.goal} acc={acc()} />
			</Show>
			<div class='absolute bottom-2% text-xl text-white font-bold font-digit text-stroke-3 text-stroke-black' style={{ 'paint-order': 'stroke fill' }}>
				{p.chart.music.id}
			</div>
		</div>
	);
}
function ScoreBadge(p: { chart: FilteredChart; goal?: AnyScoreF; acc: number }) {
	return (
		<Switch fallback={<img src='1' class='h-0 w-0' />}>
			<Match when={p.goal?.type === 'rank'}>
				<Badge.Rank class='h-35% w-full object-contain' type={p.chart.score!.rank} />
			</Match>
			<Match when={p.goal?.type === 'combo'}>
				<Badge.Combo class='h-50% w-full object-contain' type={p.chart.score!.combo} />
			</Match>
			<Match when={p.goal?.type === 'sync'}>
				<Badge.Sync class='h-50% w-full object-contain' type={p.chart.score!.sync} />
			</Match>
			<Match when={p.goal?.type === 'star'}>
				<Show
					when={p.acc >= 0.93}
					fallback={<Badge.DXS class='h-30% w-full object-contain' acc={p.acc} />}
				>
					<Badge.DXS class='h-40% w-full object-contain' acc={p.acc} />
				</Show>
			</Match>
		</Switch>
	);
}

function Mask(p: { chart: FilteredChart }) {
	const utg = () => p.chart.music.utage;
	const diff = () => p.chart.diff;
	return (
		<Switch>
			<Match when={diff() === Diff.REM}><div class='absolute h-full w-full border-5 border-white' /></Match>
			<Match when={diff() === Diff.EXP}><div class='absolute h-full w-full border-5 border-red-5' /></Match>
			<Match when={!utg() && diff() === Diff.ADV}><div class='absolute h-full w-full border-5 border-yellow-4' /></Match>
			<Match when={!utg() && diff() === Diff.BAS}><div class='absolute h-full w-full border-5 border-green-5' /></Match>
		</Switch>
	);
}
export function isGoalAchieved(goal: AnyScoreF | undefined, chart: FilteredChart) {
	if (goal && chart.score) {
		switch (goal.type) {
			case 'rank': return chart.score.rank >= goal.value;
			case 'combo': return chart.score.combo >= goal.value;
			case 'sync': {
				if (goal.value === 5) return chart.score.sync >= 1;
				return chart.score.sync >= goal.value && chart.score.sync <= 4;
			}
			case 'star': {
				const star = toDXStar(chart.score.dxs / (chart.notes.total * 3));
				return star >= goal.value;
			}
		}
	}
	return false;
}
