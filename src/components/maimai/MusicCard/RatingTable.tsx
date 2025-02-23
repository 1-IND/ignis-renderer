import clsx from 'clsx';
import { For, Show } from 'solid-js';

import Badge, { dxs, RankType } from '../Badge';
import { calcRating, Diff, diffData, type MusicData } from '../def';

export function RatingTable(p: { music: MusicData; class?: string }) {
	const style = () => !p.music.utage
		? { tableW: 'w-100%', lvlW: 'w-11%', dxsW: 'w-8%' }
		: { tableW: 'w-50%', lvlW: 'w-22%', dxsW: 'w-15.6%' };

	return (
		<table class={clsx('border-collapse rounded-lg overflow-hidden font-digit border-hidden', p.class, style().tableW)}>
			<thead>
				<tr class='h-10'>
					<th class={clsx('p-1 items-center bg-gray-2 border-b border-r border-gray-3', style().lvlW)} />

					<Show when={!p.music.utage}>
						<For each={[RankType.SSSp, RankType.SSS, RankType.SSp, RankType.SS, RankType.Sp, RankType.S] as const}>
							{rank => (
								<th class={clsx('p-1 items-center bg-gray-2 border-b border-r border-gray-3 w-8%')}>
									<div class='flex items-center justify-center'>
										<Badge.Rank class='h-6 w-auto object-contain object-center' type={rank} />
									</div>
								</th>
							)}
						</For>
					</Show>

					<For each={[...dxs].reverse()}>
						{acc => (
							<th class={clsx('p-1 items-center bg-gray-2 border-b border-r border-gray-3', style().dxsW)}>
								<div class='flex items-center justify-center'>
									<Badge.DXS class='h-6 w-auto object-contain object-center' acc={acc} />
								</div>
							</th>
						)}
					</For>
				</tr>
			</thead>
			<tbody>
				<Show when={!p.music.utage}>
					<For each={[2, 3, 4]}>
						{lvl => <RatingRow level={lvl} rating={p.music.diffs[lvl]?.rating} notes={p.music.diffs[lvl]?.notes?.total} />}
					</For>
				</Show>
				<Show when={p.music.utage?.dp === false}>
					<RatingRow level={Diff.UTG} notes={p.music.diffs[0].notes.total} />
				</Show>
				<Show when={p.music.utage?.dp === true}>
					<RatingRow level={Diff.UTG_TOTAL} lvlName='[TOTAL]' notes={p.music.diffs[0].notes.total + p.music.diffs[1].notes.total} />
				</Show>
			</tbody>
		</table>
	);
};

function RatingRow(props: { level: Diff; lvlName?: string; rating?: number; notes?: number }) {
	const style = () => diffData[props.level];
	const dxsBorder = (acc: number) => props.notes != null ? `-${Math.floor((3 * props.notes) * (1 - acc))}` : '-';

	return (
		<tr class='h-10'>
			<td class={clsx('p-1 text-center bg-gray-1 border-r border-gray-300', style().bg)}>
				<div class={clsx('font-text text-3.5', style().fg)}>{props.lvlName ?? style().name}</div>
			</td>

			<Show when={props.level < Diff.UTG}>
				<For each={[1005000, 1000000, 995000, 990000, 980000, 970000]}>
					{threshold => (
						<td class='border-b border-r border-gray-3 bg-gray-100/60 p-1 text-center text-lg'>
							{props.rating != null ? calcRating(props.rating, threshold) : '-'}
						</td>
					)}
				</For>
			</Show>

			<For each={[...dxs].reverse()}>
				{acc => (
					<td class={clsx('text-center bg-gray-100/60 border-b border-r border-gray-3 text-lg')}>
						{dxsBorder(acc)}
					</td>
				)}
			</For>
		</tr>
	);
}
