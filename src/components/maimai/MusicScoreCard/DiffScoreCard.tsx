import clsx from 'clsx';
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';

import Badge, { dxs, toDXStar } from '../Badge';
import type { MusicData, Score } from '../def';
import { calcRating, lvlData } from '../def';

export function DiffScoreCard(p: { music: MusicData; diff: number; score: Omit<Score, 'music'> | undefined }) {
	const centerClass = 'flex items-center justify-center';
	const gridClass = 'w-full h-full rounded-10px flex items-center justify-center';
	const d = () => {
		if (!p.score) return null;
		const dxsMax = 3 * p.music.levels[p.diff].notes.total;
		const score = p.score.dxs;
		const dxAcc = score / dxsMax;
		const dxStar = toDXStar(dxAcc) + 1;
		const d = score - Math.ceil((dxs[dxStar - 1] ?? 1) * dxsMax);
		const dxsBorder = d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar === 6 ? 'MAX' : `⭐${dxStar}`} ${d}`;
		return { dxsMax, dxAcc, dxStar, dxsBorder };
	};
	const SmallBox = (_p: { class?: string; children?: JSX.Element }) => (
		<div class={clsx(centerClass, _p.class)}>
			<div class={clsx(gridClass, lvlData[p.diff].bgBadges)}>
				<div class={clsx('text-center', lvlData[p.diff].fg)}>
					{_p.children}
				</div>
			</div>
		</div>
	);
	return (
		<div class={clsx('mt-2 font-bold font-digit', centerClass)}>
			<div class='h-20 w-100% flex justify-between'>
				<div class={clsx('w-36 rounded-3 shadow-md', lvlData[p.diff].bg, centerClass)}>
					<div class={clsx('text-center', lvlData[p.diff].fg)}>
						<div class='font-size-5 font-text'>{lvlData[p.diff].name}</div>
						<div class='font-size-4.4 font-digit'>
							<Show when={p.music.levels[p.diff]?.rating} fallback='&emsp;'>
								{p.music.levels[p.diff]?.rating.toFixed(1)}
							</Show>
						</div>
					</div>
				</div>
				<div class={clsx('ml-6 py-2 px-3 rounded-3 shadow-md flex gap-3 w-192', lvlData[p.diff].bg, !!p.score || 'opacity-40')}>
					<Show when={p.score}>
						<SmallBox class='w-36 font-size-6.5'>
							{`${(p.score!.acc / 10000).toFixed(4)}%`}
						</SmallBox>
						<SmallBox class='w-16 font-size-6.5'>
							{calcRating(p.music.levels[p.diff].rating, p.score!.acc)}
						</SmallBox>
						<SmallBox class='w-44'>
							<div class='flex flex-col'>
								<div class='font-size-6 leading-6'>{`${p.score!.dxs} / ${d()!.dxsMax}`}</div>
								<div class='font-size-4 leading-6'>{`${(d()!.dxAcc * 100).toFixed(2)}% (${d()!.dxsBorder})`}</div>
							</div>
						</SmallBox>
						{/* <SmallBox class='w-20 text-lg'>
							PC: 111
						</SmallBox> */}
						<div class='w-32 flex items-center'>
							<Badge.RankL class='h-14 w-auto object-contain' type={p.score!.rank} />
						</div>
						<div class='w-12 flex items-center justify-center'>
							<Badge.Combo class='h-12 w-auto object-contain' type={p.score!.combo} />
						</div>
						<div class='w-12 flex items-center justify-center'>
							<Badge.Sync class='h-12 w-auto object-contain' type={p.score!.sync} />
						</div>
						<div class='w-16 flex items-center justify-center'>
							<Show when={d()!.dxAcc >= 0.90} fallback={<Badge.DXS class='h-4 w-auto object-contain' acc={d()!.dxAcc} />}>
								<Badge.DXS class='h-8 w-auto object-contain' acc={d()!.dxAcc} />
							</Show>
						</div>
					</Show>
				</div>
			</div>
		</div>
	);
}
