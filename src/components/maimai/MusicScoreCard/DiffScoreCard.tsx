import clsx from 'clsx';
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';

import Badge, { dxs, toDXStar } from '../Badge';
import type { DiffData, Score } from '../def';
import { calcRating, Diff, diffData } from '../def';

export function DiffScoreCard(p: { chart?: DiffData; diff: Diff; score?: Omit<Score, 'music'> }) {
	const centerClass = 'flex items-center justify-center';
	const gridClass = 'w-full h-full rounded-10px flex items-center justify-center';
	const d = () => {
		if (!p.score || !p.chart) return null;
		const dxsMax = 3 * p.chart.notes.total;
		const score = p.score.dxs;
		const dxAcc100 = score * 100 / dxsMax;
		const dxStar = toDXStar(dxAcc100) + 1;
		const d = score - Math.ceil((dxs[dxStar - 1] ?? 1) * dxsMax);
		const dxsBorder = d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar === 6 ? 'MAX' : `⭐${dxStar}`} ${d}`;
		return { dxsMax, dxAcc100, dxStar, dxsBorder };
	};
	const present = () => !!(p.score && p.chart);
	const style = () => diffData[p.diff];
	const SmallBox = (_p: { class?: string; children?: JSX.Element }) => (
		<div class={clsx(centerClass, _p.class)}>
			<div class={clsx(gridClass, style().bgBadges)}>
				<div class={clsx('text-center', style().fg)}>
					{_p.children}
				</div>
			</div>
		</div>
	);
	return (
		<div class={clsx('mt-2 font-bold font-digit', centerClass)}>
			<div class='h-20 w-100% flex justify-between'>
				<div class={clsx('w-36 rounded-3 shadow-md', style().bg, !!p.chart || 'opacity-40', centerClass)}>
					<div class={clsx('text-center', style().fg)}>
						<div class='font-size-5 font-text'>{style().name}</div>
						<div class='font-size-4.4 font-digit'>
							<Show when={p.chart} fallback='&emsp;'>
								{p.diff === Diff.UTG ? `${p.chart!.level.name}?` : p.chart!.rating.toFixed(1)}
							</Show>
						</div>
					</div>
				</div>
				<div class={clsx('ml-6 py-2 px-3 rounded-3 shadow-md flex gap-3 w-192', style().bg, present() || 'opacity-40')}>
					<Show when={present()}>
						<SmallBox class='w-36 font-size-6.5'>
							{`${(p.score!.acc / 10000).toFixed(4)}%`}
						</SmallBox>
						<SmallBox class='w-16 font-size-6.5'>
							{p.diff === Diff.UTG ? '-' : calcRating(p.chart!.rating, p.score!.acc)}
						</SmallBox>
						<SmallBox class='w-44'>
							<div class='flex flex-col'>
								<div class='font-size-6 leading-6'>{`${p.score!.dxs} / ${d()!.dxsMax}`}</div>
								<div class='font-size-4 leading-6'>{`${d()!.dxAcc100.toFixed(2)}% (${d()!.dxsBorder})`}</div>
							</div>
						</SmallBox>
						{/* <SmallBox class='w-20 text-lg'>
							PC: 111
						</SmallBox> */}
						<div class='w-32 flex items-center'>
							<Badge.RankL class='h-14 w-auto object-contain' type={p.score!.rank} />
						</div>
						<div class='mx--1 w-14 flex items-center justify-center'>
							<Badge.Combo class='h-12 w-auto object-contain' type={p.score!.combo} />
						</div>
						<div class='mx--1 w-14 flex items-center justify-center'>
							<Badge.Sync class='h-12 w-auto object-contain' type={p.score!.sync} />
						</div>
						<div class='w-16 flex items-center justify-center'>
							<Show when={d()!.dxStar >= 3} fallback={<Badge.DXStar class='h-6 w-auto object-contain' type={d()!.dxStar} />}>
								<Badge.DXStar class='h-8 w-auto object-contain' type={d()!.dxStar} />
							</Show>
						</div>
					</Show>
				</div>
			</div>
		</div>
	);
}
