import clsx from 'clsx';
import { Show } from 'solid-js';

import Badge, { dxs, toDXStar } from '../Badge';
import type { MusicData, Score } from '../def';
import { calcRating, lvlData } from '../def';

export function DiffScoreCard(p: { music: MusicData; diff: number; score: Omit<Score, 'music'> | undefined }) {
	console.log(p);
	const centerClass = 'flex items-center justify-center';
	const gridClass = 'h-74px w-90% rounded-10px flex items-center justify-center';
	const d = () => {
		if (!p.score) return {};
		const dxsMax = 3 * p.music.levels[p.diff]?.notes.total;
		const dxAcc = p.score.dxs / dxsMax;
		const dxStar = toDXStar(dxAcc) + 1;
		const d = p.score.dxs - Math.ceil((dxs[dxStar - 1] ?? 1) * dxsMax);
		const dxsBorder = d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar === 6 ? 'MAX' : `⭐${dxStar}`} ${d}`;
		return { dxsMax, dxAcc, dxStar, dxsBorder };
	};
	return (
		<div class={clsx('mt-10px', centerClass)}>
			<div class={clsx('h-100px w-100% rounded-10px shadow-md', lvlData[p.diff].bg, !!p.score || 'opacity-60')}>
				<div class='h-full flex'>
					<div class={clsx('w-14%', centerClass)}>
						<div class={clsx('text-center', lvlData[p.diff].fg)}>
							<div class='font-size-4.6 font-text'>{lvlData[p.diff].name}</div>
							<div class='font-size-6 font-digit'>
								<Show when={p.music.levels[p.diff]?.rating} fallback='&emsp;'>
									{p.music.levels[p.diff]?.rating.toFixed(1)}
								</Show>
							</div>
						</div>
					</div>
					<Show when={p.score}>
						<div class={clsx('w-4px', lvlData[p.diff].bgBadges)} />
						<div class='ml-10px w-[calc(86%-4px)] flex items-center'>
							<div class={clsx('w-21%', centerClass)}>
								<div class={clsx(gridClass, lvlData[p.diff].bgBadges)}>
									<div class={clsx('text-center font-bold font-digit font-size-6.5', lvlData[p.diff].fg)}>{`${(p.score!.acc / 10000).toFixed(4)}%`}</div>
								</div>
							</div>
							<div class={clsx('w-9%', centerClass)}>
								<div class={clsx(gridClass, lvlData[p.diff].bgBadges)}>
									<div class={clsx('text-center font-bold font-digit font-size-6.5', lvlData[p.diff].fg)}>{calcRating(p.music.levels[p.diff].rating, p.score!.acc)}</div>
								</div>
							</div>
							<div class={clsx('w-21%', centerClass)}>
								<div class={clsx(gridClass, lvlData[p.diff].bgBadges)}>
									<div class={clsx('text-center font-bold font-digit', lvlData[p.diff].fg, 'flex flex-col')}>
										<div class='font-size-6 leading-6 font-digit'>{`${p.score!.dxs} / ${d()?.dxsMax}`}</div>
										<div class='font-size-4 leading-6 font-digit'>{`${(d().dxAcc! * 100).toFixed(2)}% (${(d().dxsBorder)})`}</div>
									</div>
								</div>
							</div>
							<div class='ml-2px w-20% flex items-center'>
								<Badge.RankL class='h-70px w-auto object-contain' type={p.score!.rank} />
							</div>
							<div class='w-10% flex items-center justify-center'>
								<Badge.Combo class='h-70px w-auto object-contain' type={p.score!.combo} />
							</div>
							<div class='w-10% flex items-center justify-center'>
								<Badge.Sync class='h-70px w-auto object-contain' type={p.score!.sync} />
							</div>
							<div class='w-8% flex items-center justify-center'>
								<Show when={d().dxAcc! >= 0.90} fallback={<Badge.DXS class='h-35px w-auto object-contain' acc={d().dxAcc!} />}>
									<Badge.DXS class='h-70px w-auto object-contain' acc={d().dxAcc!} />
								</Show>
							</div>
						</div>
					</Show>
				</div>
			</div>
		</div>
	);
}
