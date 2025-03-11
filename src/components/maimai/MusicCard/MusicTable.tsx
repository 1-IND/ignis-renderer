import clsx from 'clsx';
import { For, Show } from 'solid-js';

import type { DiffData, MusicData } from '../def';
import { Diff, diffData, sumDiffs } from '../def';

export function MusicTable(p: { music: MusicData; class?: string }) {
	return (
		// border-hidden: https://css-tricks.com/table-with-borders-only-on-the-inside/
		<table class={clsx('border-collapse rounded-lg overflow-hidden w-full border-hidden', p.class)}>
			<thead>
				<tr>
					<For each={[
						['', 'w-11%'],
						['TOTAL', 'w-7.5%'],
						['TAP', 'w-7.5%'],
						['HOLD', 'w-7.5%'],
						['SLIDE', 'w-7.5%'],
						['TOUCH', 'w-7.5%'],
						['BREAK', 'w-7.5%'],
						['TAP GR Δ', 'w-11%'],
						['2550 Δ', 'w-11%'],
					] as const}
					>
						{([title, c]) => (
							<th class={clsx('p-1 text-center bg-gray-2 border-b border-r border-gray-3', c)}>
								<div>{title}</div>
							</th>
						)}
					</For>

					<For each={[
						['2550 Δ', 'TAP GR Δ', 'w-11%'],
						['SSS+', 'TAP GR Δ', 'w-11%'],
					] as const}
					>
						{([num, denom, c]) => (
							<th class={clsx('p-1 text-center bg-gray-2 border-b border-r border-gray-3 text-sm', c)}>
								<div class='relative'>
									<span class='absolute inset-y-0 left-1/2 flex transform items-center -translate-x-1/2'>
										<span class='w-20 border-t-2 border-black' />
									</span>
									<span class='relative z-10'>{num}</span>
									<span class='relative z-10 mt-1 block'>{denom}</span>
								</div>
							</th>
						)}
					</For>
				</tr>
			</thead>
			<tbody>
				<Show when={!p.music.utage}>
					<For each={[Diff.BAS, Diff.ADV, Diff.EXP, Diff.MAS, Diff.REM]}>
						{lvl => (
							<Show when={p.music.diffs[lvl]}>
								<DiffRow diff={lvl} data={p.music.diffs[lvl]!} />
							</Show>
						)}
					</For>
				</Show>
				<Show when={p.music.utage?.dp === false}>
					<DiffRow diff={Diff.UTG} data={p.music.diffs[0]!} />
				</Show>
				<Show when={p.music.utage?.dp === true}>
					<DiffRow diff={Diff.UTG} diffName='[LEFT]' noDelta data={p.music.diffs[0]!} />
					<DiffRow diff={Diff.UTG} diffName='[RIGHT]' noDelta data={p.music.diffs[1]!} />
					<DiffRow diff={Diff.UTG_TOTAL} diffName='[TOTAL]' data={sumDiffs(p.music.diffs[0]!, p.music.diffs[1]!)} />
				</Show>
			</tbody>
		</table>
	);
}

function DiffRow(p: { diff: Diff; diffName?: string; noDelta?: true; data?: DiffData }) {
	const style = () => diffData[p.diff];
	const stats = () => {
		let sum, tapGreatDelta, break2550Delta, ratioTB, toleranceTap;
		sum = tapGreatDelta = break2550Delta = ratioTB = toleranceTap = 0;
		if (p.data) {
			sum = p.data.notes.tap + p.data.notes.touch + p.data.notes.hold * 2 + p.data.notes.slide * 3 + p.data.notes.break * 5;
			tapGreatDelta = 100.0 / sum / 5;
			break2550Delta = 0.25 / p.data.notes.break;
			ratioTB = break2550Delta / tapGreatDelta;
			toleranceTap = 0.5 / tapGreatDelta;
			if (p.diff === Diff.UTG_TOTAL) {
				tapGreatDelta *= 2;
				break2550Delta *= 2;
			}
		}
		return { sum, tapGreatDelta, break2550Delta, ratioTB, toleranceTap };
	};

	return (
		<tr>
			<td class={clsx('p-1 text-center bg-gray-100 border-r border-gray-300 h-12.5', style().bg)}>
				<div class={clsx('font-text text-sm', style().fg)}>{p.diffName ?? style().name}</div>
				<Show when={p.data} fallback={<div class='leading-5 font-digit'>&emsp;</div>}>
					<Show
						when={p.diff < Diff.UTG}
						fallback={<div class={clsx('font-digit leading-5', style().fg)}>{`${p.data!.level.name}?`}</div>}
					>
						<div class={clsx('font-digit leading-5', style().fg)}>{`${p.data!.level.name} (${p.data!.rating.toFixed(1)})`}</div>
					</Show>
				</Show>
			</td>

			<For each={[
				/* eslint-disable ts/strict-boolean-expressions */
				p.data?.notes.total || '-',
				p.data?.notes.tap || '-',
				p.data?.notes.hold || '-',
				p.data?.notes.slide || '-',
				p.data?.notes.touch || '-',
				p.data?.notes.break || '-',
				p.noDelta ? '-' : `-${stats().tapGreatDelta.toFixed(4)}%`,
				p.noDelta ? '-' : `-${stats().break2550Delta.toFixed(4)}%`,
				p.noDelta ? '-' : stats().ratioTB.toFixed(2),
				p.noDelta ? '-' : stats().toleranceTap.toFixed(2),
			]}
			>
				{text => <td class='h-50px border-b border-r border-gray-300 bg-gray-100/60 p-1 text-center text-4.5 font-digit'>{p.data ? text : '-'}</td>}
			</For>
		</tr>
	);
}
