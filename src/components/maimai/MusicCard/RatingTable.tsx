import clsx from 'clsx';
import { For } from 'solid-js';

import Badge, { dxs, RankType } from '../Badge';
import { calcRating, type Level, lvlData, type MusicData } from '../def';

export function RatingTable({ music, class: c }: { music: MusicData; class: string }) {
	return (
		<table class={clsx('border-collapse rounded-lg overflow-hidden w-100% font-digit', c)}>
			<thead>
				<tr class='h-10'>
					<th class='p-1 items-center bg-gray-2 border-b border-r border-gray-3 w-11%' />

					<For each={[RankType.SSSp, RankType.SSS, RankType.SSp, RankType.SS, RankType.Sp, RankType.S] as const}>
						{rank => (
							<th class='p-1 items-center bg-gray-2 border-b border-r border-gray-3 w-8%'>
								<div class='flex items-center justify-center'>
									<Badge.Rank class='h-6 w-auto object-contain object-center' type={rank} />
								</div>
							</th>
						)}
					</For>

					<For each={[...dxs].reverse()}>
						{acc => (
							<th class={clsx('p-1 items-center bg-gray-2 border-b border-gray-3 w-8%', acc !== 0.85 && 'border-r')}>
								<div class='flex items-center justify-center'>
									<Badge.DXS class='h-6 w-auto object-contain object-center' acc={acc} />
								</div>
							</th>
						)}
					</For>
				</tr>
			</thead>
			<tbody>
				<For each={[2, 3, 4]}>
					{lvl => (
						<RatingRow
							level={lvl}
							rating={music.levels[lvl]?.rating}
							notes={music.levels[lvl]?.notes?.total}
						/>
					)}
				</For>
			</tbody>
		</table>
	);
};

function RatingRow({ level, rating, notes }: { level: Level; rating?: number; notes?: number }) {
	const { name, bg, fg } = lvlData[level];
	const dxsMax = notes != null ? 3 * notes : null;
	return (
		<tr class='h-10'>
			<td class={clsx('p-1 text-center bg-gray-1 border-r border-gray-300', bg)}>
				<div class={clsx('font-text text-3.5', fg)}>{name}</div>
			</td>

			<For each={[1005000, 1000000, 995000, 990000, 980000, 970000]}>
				{threshold => (
					<td class='p-1 text-center bg-gray-100/60 border-b border-r border-gray-3 text-lg'>
						{rating != null ? calcRating(rating, threshold) : '-'}
					</td>
				)}
			</For>

			<For each={[...dxs].reverse()}>
				{acc => (
					<td class={clsx('text-center bg-gray-100/60 border-b border-r border-gray-3 text-lg')}>
						{dxsMax != null ? `-${Math.floor(dxsMax * (1 - acc))}` : '-'}
					</td>
				)}
			</For>
		</tr>
	);
}
