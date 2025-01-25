import clsx from 'clsx';

import Badge, { dxs, toDXStar } from './Badge';
import type { Level, Score } from './def';
import { calcRating } from './def';

export const palettes: Record<Level, [string, string, string]> = [
	['bg-green-5', 'text-white', 'bg-green-6'],
	['bg-yellow-4', 'text-white', 'bg-yellow-5'],
	['bg-red-5', 'text-white', 'bg-red-6'],
	['bg-purple-7', 'text-white', 'bg-purple-9'],
	['bg-white', 'text-gray-7', 'bg-gray-3'],
	['bg-pink-4', 'text-white', 'bg-pink-5'], // TODO: kanji & dp display
];

export function Card({ score }: { score: Score }) {
	const { music, chart } = score;
	const rating = calcRating(chart.rating, score.acc);

	const dxsMax = 3 * chart.notes;
	const dxAcc = score.dxs / dxsMax;
	const dxStar = toDXStar(dxAcc) + 1;
	const d = score.dxs - Math.ceil((dxs[dxStar - 1] ?? 1) * dxsMax);

	const [bg, fg, bgBadges] = palettes[score.level];

	return (
		<div class={clsx('flex overflow-hidden rounded-md p-1 relative', fg, bg)}>
			<div class='relative h-26 w-26'>
				<img src={music.jacket} class='rounded-md' />
				<Badge.SongType type={music.type} />
			</div>
			<div class='flex-1 flex flex-col pl-2 min-w-0 lh-none justify-between'>
				<div class='flex justify-between'>
					<span class='text-lg truncate font-text font-semibold'>{music.title}</span>
				</div>

				<div class='font-digit'>
					<span class='text-lg lh-none font-500'>{`${(score.acc / 1e4).toFixed(4)}%`}</span>
					<span class='text-xs lh-none'>{` / ${chart.rating.toFixed(1)} / ${rating}`}</span>
				</div>

				<div class='font-digit lh-[0.75rem]'>
					<span class='text-xs lh-[0.75rem]'>{`${(dxAcc * 100).toFixed(2)}%`}</span>
					<span class='text-xs lh-[0.75rem]'>{` - ${score.dxs} / ${dxsMax} `}</span>
					<span class='text-xs lh-[0.75rem]'>{`(${d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar === 6 ? 'MAX' : `⭐${dxStar}`} ${d}`})`}</span>
				</div>

				<div class={clsx('flex justify-between rounded-md p-1', bgBadges)}>
					<Badge.Rank type={score.rank} />
					<Badge.Combo type={score.combo} />
					<Badge.Sync type={score.sync} />
					<Badge.DXS acc={dxAcc} />
				</div>
			</div>
		</div>
	);
}
