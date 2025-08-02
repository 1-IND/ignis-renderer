import clsx from 'clsx';

import Badge, { dxs, toDXStar } from './Badge';
import type { Score } from './def';
import { calcRating, diffData } from './def';

export function PlayCard(p: { score: Score }) {
	const music = () => p.score.music;
	const chart = () => music().diffs[p.score.diff];
	const rating = () => calcRating(chart().rating, p.score.acc);

	const dxsMax = () => 3 * chart().notes.total;
	const dxAccFloat = () => p.score.dxs / dxsMax();
	const dxAcc100 = () => Math.floor(p.score.dxs * 100 / dxsMax());
	const dxStar = () => toDXStar(dxAcc100()) + 1;
	const d = () => {
		const d = p.score.dxs - Math.ceil((dxs[dxStar() - 1] ?? 1) * dxsMax());
		return d > 0 ? 'WTF' : d === 0 ? 'MAX' : `${dxStar() === 6 ? 'MAX' : `⭐${dxStar()}`} ${d}`;
	};

	const style = () => diffData[p.score.diff];

	return (
		<div class={clsx('flex overflow-hidden rounded-md p-1 relative font-semibold', style().fg, style().bg)}>
			<div class='relative h-26 w-26'>
				<img src={music().jacketImg} class='rounded-md' />
				<Badge.SongType class='absolute right-0 top-0 h-4' type={music().type} />
			</div>
			<div class='min-w-0 flex flex-1 flex-col justify-between pl-2 lh-none'>
				<div class='flex justify-between'>
					<span class='truncate text-lg font-text'>{music().title}</span>
				</div>

				<div class='font-digit'>
					<span class='text-lg lh-none'>{`${(p.score.acc / 1e4).toFixed(4)}%`}</span>
					<span class='text-xs lh-none'>{` / ${chart().rating.toFixed(1)} / ${rating()}`}</span>
				</div>

				<div class='lh-[0.75rem] font-digit'>
					<span class='text-xs lh-[0.75rem]'>{`${(dxAccFloat() / 100).toFixed(2)}%`}</span>
					<span class='text-xs lh-[0.75rem]'>{` - ${p.score.dxs} / ${dxsMax()} `}</span>
					<span class='text-xs lh-[0.75rem]'>{`(${d()})`}</span>
				</div>

				<div class={clsx('flex justify-between rounded-md p-1', style().bgBadges)}>
					<Badge.Rank class='h-6 w-15 object-contain object-left' type={p.score.rank} />
					<Badge.Combo class='h-6 w-6 object-contain object-left' type={p.score.combo} />
					<Badge.Sync class='h-6 w-6 object-contain object-left' type={p.score.sync} />
					<Badge.DXS class='h-6 w-11 object-contain' acc={dxAcc100()} />
				</div>
			</div>
		</div>
	);
}

export function DummyPlayCard() {
	return (
		<div class='relative flex overflow-hidden rounded-md bg-gray-1 p-1 text-gray-3 font-semibold'>
			<div class='relative h-26 w-26 bg-gray-2' />
			<div class='min-w-0 flex flex-1 flex-col justify-between pl-2 lh-none'>
				<div class='flex justify-between'>
					<span class='truncate text-lg font-text'>Not Played</span>
				</div>
			</div>
		</div>
	);
}
