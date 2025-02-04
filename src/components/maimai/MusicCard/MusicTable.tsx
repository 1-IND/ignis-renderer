import clsx from 'clsx';
import { For, Show } from 'solid-js';

import type { LevelData, MusicData } from '../def';
import { Level, lvlData, sumLevels } from '../def';

export function MusicTable({ music, class: c }: { music: MusicData; class?: string }) {
	return (
		// border-hidden: https://css-tricks.com/table-with-borders-only-on-the-inside/
		<table class={clsx('border-collapse rounded-lg overflow-hidden w-full border-hidden', c)}>
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
									<span class='absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center'>
										<span class='w-20 border-t-2 border-black' />
									</span>
									<span class='relative z-10'>{num}</span>
									<span class='relative z-10 block mt-1'>{denom}</span>
								</div>
							</th>
						)}
					</For>
				</tr>
			</thead>
			<tbody>
				<Show when={!music.utage}>
					<For each={[0, 1, 2, 3, 4]}>{lvl => <DiffRow level={lvl} data={music.levels[lvl]} />}</For>
				</Show>
				<Show when={music.utage?.dp === false}>
					<DiffRow level={Level.UTG} data={music.levels[0]} />
				</Show>
				<Show when={music.utage?.dp === true}>
					<DiffRow level={Level.UTG} lvlName='[LEFT]' noDelta data={music.levels[0]} />
					<DiffRow level={Level.UTG} lvlName='[RIGHT]' noDelta data={music.levels[1]} />
					<DiffRow level={Level.UTG_TOTAL} lvlName='[TOTAL]' data={sumLevels(music.levels[0], music.levels[1])} />
				</Show>
			</tbody>
		</table>
	);
}

function DiffRow({ level, lvlName, noDelta, data }: { level: Level; lvlName?: string; noDelta?: true; data?: LevelData }) {
	const { name, bg, fg } = lvlData[level];
	let sum, tapGreatDelta, break2550Delta, ratioTB, toleranceTap;
	sum = tapGreatDelta = break2550Delta = ratioTB = toleranceTap = 0;
	if (data) {
		sum = data.notes.tap + data.notes.touch + data.notes.hold * 2 + data.notes.slide * 3 + data.notes.break * 5;
		tapGreatDelta = 100.0 / sum / 5;
		break2550Delta = 0.25 / data.notes.break;
		ratioTB = break2550Delta / tapGreatDelta;
		toleranceTap = 0.5 / tapGreatDelta;
		if (level === Level.UTG_TOTAL) {
			tapGreatDelta *= 2;
			break2550Delta *= 2;
		}
	}

	return (
		<tr>
			<td class={clsx('p-1 text-center bg-gray-100 border-r border-gray-300 h-12.5', bg)}>
				<div class={clsx('font-text text-sm', fg)}>{lvlName ?? name}</div>
				<Show when={data} fallback={<div class='font-digit leading-5'>&emsp;</div>}>
					<Show
						when={level < Level.UTG}
						fallback={<div class={clsx('font-digit leading-5', fg)}>{`${data!.diff.name}?`}</div>}
					>
						<div class={clsx('font-digit leading-5', fg)}>{`${data!.diff.name} (${data!.rating.toFixed(1)})`}</div>
					</Show>
				</Show>
			</td>

			<For each={[
				/* eslint-disable ts/strict-boolean-expressions */
				data?.notes.total || '-',
				data?.notes.tap || '-',
				data?.notes.hold || '-',
				data?.notes.slide || '-',
				data?.notes.touch || '-',
				data?.notes.break || '-',
				noDelta ? '-' : `-${tapGreatDelta.toFixed(4)}%`,
				noDelta ? '-' : `-${break2550Delta.toFixed(4)}%`,
				noDelta ? '-' : ratioTB.toFixed(2),
				noDelta ? '-' : toleranceTap.toFixed(2),
			]}
			>
				{text => <td class='p-1 text-center bg-gray-100/60 border-b border-r border-gray-300 font-digit text-4.5 h-50px'>{data ? text : '-'}</td>}
			</For>
		</tr>
	);
}
