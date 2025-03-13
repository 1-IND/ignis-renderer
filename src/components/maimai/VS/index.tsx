import clsx from 'clsx';
import { For, Show } from 'solid-js';

import type { ChartMap, Context, FilteredChart, Verdict } from '~/routes/maimai/vs';

import { PlayCardA } from '../Range/PlayCardA';
import { PlayCardB } from './PlayCardB';

export function VS(p: { chartMap: ChartMap; ctx: Context }) {
	const goal = () => p.ctx.filter?.main;
	const props = (key: Verdict) => ({
		charts: p.chartMap[key],
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

function ScoreCategory(p: { name: string; sub?: string; subSize?: string; color: string; charts: FilteredChart[]; goal: boolean; dxScore?: boolean }) {
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
