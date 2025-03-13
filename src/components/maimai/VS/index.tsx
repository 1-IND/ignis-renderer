import clsx from 'clsx';
import { createMemo, For, Show } from 'solid-js';

import type { AnyScoreF, Context, FilteredChart } from '~/routes/maimai/vs';

import { toDXStar } from '../Badge';
import type { Score } from '../def';
import { PlayCardA } from '../Range/PlayCardA';
import { PlayCardB } from './PlayCardB';

function isGoalAchieved(goal: AnyScoreF, score: Score | undefined, dxScore: true | undefined, totalNotes: number) {
	if (!score) return false;
	switch (goal.type) {
		case 'rank': return score.rank >= goal.value;
		case 'combo': return score.combo >= goal.value;
		case 'sync': return score.sync >= goal.value;
		case 'star': return toDXStar(score.dxs / (totalNotes * 3)) >= goal.value;
		case 'ratio': {
			if (dxScore) return score.dxs / (totalNotes * 3) >= goal.value;
			return score.acc >= goal.value;
		}
	}
}

export function VS(p: { ctx: Context }) {
	type Verdict = 'win' | 'draw' | 'lose' | 'notPlayed' | 'onlyA' | 'onlyB';
	const chartMap = createMemo(() => {
		const chartMap: Record<Verdict, (FilteredChart & { delta?: number })[]> = {
			win: [],
			draw: [],
			lose: [],
			notPlayed: [],
			onlyA: [],
			onlyB: [],
		};
		if (!p.ctx.charts) return chartMap;

		const charts = [...p.ctx.charts];
		const goal = p.ctx.filter?.main;
		const dxScore = p.ctx.filter?.dxScore;
		charts.sort((x, y) => {
			if (x.rating !== y.rating) return y.rating - x.rating;
			return x.music.id - y.music.id;
		});

		for (const chart of charts) {
			if (goal) {
				const A = isGoalAchieved(goal, chart.scoreA, dxScore, chart.notes.total);
				const B = isGoalAchieved(goal, chart.scoreB, dxScore, chart.notes.total);
				const key = A ? (B ? 'draw' : 'win') : B ? 'lose' : 'notPlayed';
				chartMap[key].push(chart);
			} else {
				const scoreA = chart.scoreA?.[dxScore ? 'dxs' : 'acc'] ?? 0;
				const scoreB = chart.scoreB?.[dxScore ? 'dxs' : 'acc'] ?? 0;

				let key: Verdict = scoreA > scoreB ? 'win' : scoreA < scoreB ? 'lose' : 'draw';
				if (!chart.scoreA && !chart.scoreB) key = 'notPlayed';
				if (!chart.scoreA && scoreB > 0) key = 'onlyB';
				if (!chart.scoreB && scoreA > 0) key = 'onlyA';

				chartMap[key].push({ ...chart, delta: scoreA - scoreB });
			}
		}
		if (!goal) {
			chartMap.win.sort((x, y) => y.delta! - x.delta!);
			chartMap.lose.sort((x, y) => y.delta! - x.delta!);
		}

		return chartMap;
	});
	const goal = () => p.ctx.filter?.main;
	const props = (key: Verdict) => ({
		charts: chartMap()[key],
		goal: !!goal(),
		dxScore: p.ctx.filter?.dxScore,
	});

	return (
		<div class='m-8 flex flex-col gap-4'>
			<ScoreCategory name='WIN' color='bg-pink-5/70' {...props('win')} />
			<ScoreCategory name='DRAW' sub={goal() && '(BOTH)'} color='bg-green-5/70' {...props('draw')} />
			<ScoreCategory name='LOSE' color='bg-blue-5/70' {...props('lose')} />

			<ScoreCategory name='WIN' sub='(NOT PLAYED)' subSize='' color='bg-pink-5/50' {...props('onlyA')} />
			<ScoreCategory name='DRAW' sub='(NEITHER)' color='bg-gray-5/50' {...props('notPlayed')} />
			<ScoreCategory name='LOSE' sub='(NOT PLAYED)' subSize='' color='bg-blue-5/50' {...props('onlyB')} />
		</div>
	);
}

function ScoreCategory(p: { name: string; sub?: string; subSize?: string; color: string; charts: FilteredChart[]; goal: boolean; dxScore?: true }) {
	return (
		<Show when={p.charts.length}>
			<div class='flex gap-4'>
				<div class={clsx('flex flex-col items-center justify-center w-32 p-2 border-rounded-xl', p.color)}>
					<span class='text-center text-3xl text-white font-digit'>{p.name}</span>
					<Show when={p.sub != null}>
						<span class={clsx('mb--1 mt--2 text-white font-digit', p.subSize ?? 'text-xl')}>{p.sub}</span>
					</Show>
					<span class='text-xl text-white font-digit'>{`Count: ${p.charts.length}`}</span>
				</div>
				<div class='grid grid-cols-12 flex-1 gap-4'>
					<For each={p.charts}>
						{chart => (
							<Show when={p.goal} fallback={<PlayCardB class='aspect-ratio-square' chart={chart} dxScore={p.dxScore} />}>
								<PlayCardA class='aspect-ratio-square' chart={chart} />
							</Show>
						)}
					</For>
				</div>
			</div>
		</Show>
	);
}
