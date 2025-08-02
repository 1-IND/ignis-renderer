import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { AnyScoreF, FilteredChart } from '~/routes/maimai/vs';

import Badge from '../Badge';
import { Diff } from '../def';

export function bgDimmed(url: string, alpha: number) {
	return {
		'background-image': `linear-gradient(rgba(0, 0, 0, ${alpha}), rgba(0, 0, 0, ${alpha})), url(${url})`,
		'background-size': 'cover',
	};
}
export function PlayCardB(p: { chart: FilteredChart & { delta?: number }; goal?: AnyScoreF; class?: string; dxScore?: boolean }) {
	const acc = () => p.chart.scoreA?.acc;
	const dxs = () => p.chart.scoreA?.dxs;
	const dxsAcc100 = () => dxs() != null ? (100 * dxs()!) / (3 * p.chart.notes.total) : 0;
	const del = () => p.chart.delta!;

	return (
		<div
			class={clsx(
				'flex flex-col items-center justify-center relative',
				p.class,
			)}
			style={bgDimmed(p.chart.music.jacketImg, 0.6)}
		>
			<Mask chart={p.chart} />
			<Show when={!p.dxScore}>
				<div class='absolute bottom-1 flex flex-col items-center justify-center font-bold font-digit'>
					<div class='text-md text-white lh-none'>{acc() != null ? `${((acc()!) / 1e4).toFixed(4)}%` : '-'}</div>
					<div class={clsx('text-sm', del() > 0 ? 'text-red' : del() < 0 ? 'text-blue' : 'text-green')}>
						{`${del() >= 0 ? '+' : ''}${(del() / 1e4).toFixed(4)}%`}
					</div>
				</div>
			</Show>
			<Show when={p.dxScore}>
				<div class='absolute bottom-1 flex flex-col items-center justify-center font-bold font-digit'>
					<div class='mb--1 flex items-center text-xs text-white'>
						<Show when={dxs() != null} fallback='-'>
							<Badge.DXS class={clsx('h-4 object-contain', dxsAcc100() < 90 ? 'w-3' : 'w-4')} acc={dxsAcc100()} />
							{`${dxs()!} / ${3 * p.chart.notes.total}`}
						</Show>
					</div>
					<div class={clsx('text-sm', del() > 0 ? 'text-red' : del() < 0 ? 'text-blue' : 'text-green')}>
						{`${del() >= 0 ? '+' : ''}${del()}`}
					</div>
				</div>
			</Show>

			<div class='absolute right-2 top-1 text-white font-bold text-stroke-3 text-stroke-black' style={{ 'paint-order': 'stroke fill' }}>
				{p.chart.music.id}
			</div>
		</div>
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
