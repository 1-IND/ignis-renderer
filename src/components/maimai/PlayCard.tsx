import clsx from 'clsx';

import Badge, { dxs, toDXStar } from './Badge';
import type { Score } from './def';
import { calcRating, lvlData } from './def';

export function PlayCard({ score }: { score: Score }) {
	const { music } = score;
	const chart = music.levels[score.level];
	const rating = calcRating(chart.rating, score.acc);

	const dxsMax = 3 * chart.notes.total;
	const dxAcc = score.dxs / dxsMax;
	const dxStar = toDXStar(dxAcc) + 1;
	const d = score.dxs - Math.ceil((dxs[dxStar - 1] ?? 1) * dxsMax);

	const { bg, fg, bgBadges } = lvlData[score.level];

	return (
		<div class={clsx('flex overflow-hidden rounded-md p-1 relative', fg, bg)}>
			<div class='relative h-26 w-26'>
				<img src={music.jacketImg} class='rounded-md' />
				<Badge.SongType class='h-4 top-0 right-0 absolute' type={music.type} />
			</div>
			<div class='flex-1 flex flex-col pl-2 min-w-0 lh-none justify-between'>
				<div class='flex justify-between'>
					<span class='text-lg truncate font-text font-semibold'>{music.title}</span>
				</div>

				<div class='font-digit'>
					<span class='text-lg lh-none font-semibold'>{`${(score.acc / 1e4).toFixed(4)}%`}</span>
					<span class='text-xs lh-none'>{` / ${chart.rating.toFixed(1)} / ${rating}`}</span>
				</div>

				<div class='font-digit lh-[0.75rem]'>
					<span class='text-xs lh-[0.75rem]'>{`${(dxAcc * 100).toFixed(2)}%`}</span>
					<span class='text-xs lh-[0.75rem]'>{` - ${score.dxs} / ${dxsMax} `}</span>
					<span class='text-xs lh-[0.75rem]'>{`(${d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar === 6 ? 'MAX' : `⭐${dxStar}`} ${d}`})`}</span>
				</div>

				<div class={clsx('flex justify-between rounded-md p-1', bgBadges)}>
					<Badge.Rank class='h-6 w-15 object-contain object-left' type={score.rank} />
					<Badge.Combo class='h-6 w-6 object-contain object-left' type={score.combo} />
					<Badge.Sync class='h-6 w-6 object-contain object-left' type={score.sync} />
					<Badge.DXS class='h-6 w-11 object-contain' acc={dxAcc} />
				</div>
			</div>
		</div>
	);
}
