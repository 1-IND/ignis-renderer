import clsx from 'clsx';
import { For, Show } from 'solid-js';

import Badge from '../Badge';
import { Diff, diffData } from '../def';
import type { MusicData } from '../def';

const colors = ['text-green-5', 'text-yellow-5', 'text-red-5', 'text-purple-7', 'text-gray-7'] as const;

function fmtLength(s: number) {
	const min = Math.floor(s / 60);
	const sec = s % 60;
	return `${min}:${sec.toString().padStart(2, '0')}`;
}
export function MusicInfo(p: { music: MusicData; class?: string }) {
	const displayDiffs = () => {
		const diffs = ([Diff.EXP, Diff.MAS, Diff.REM] as const).filter(x => p.music.diffs[x]);
		return diffs.length ? diffs : ([Diff.BAS, Diff.ADV] as const).filter(x => p.music.diffs[x]);
	};

	return (
		<div class={clsx('flex', p.class)}>
			<div class='relative mr-4'>
				<img src={p.music.jacketImg} class='h-50 w-50 rounded-md object-cover' />
				<Badge.SongType class={clsx('top-0 right-0 absolute', p.music.type === 'UTG' ? 'h-8' : 'h-6')} utage={p.music.utage} type={p.music.type} />
			</div>

			<div class='flex flex-1 flex-col justify-between truncate'>
				<div class='w-90%'>
					<div class='truncate pb-2 text-4xl font-semibold'>{p.music.title}</div>
					<div class='border-5 border-b border-black rounded-full' />
					<div class='truncate pt-1 text-xl'>{p.music.artist}</div>
				</div>

				<div class='w-90% flex-col font-digit'>
					<div class='mb--1 flex justify-between'>
						<span class='text-xl'>{`ID: ${p.music.id}`}</span>
						<span class='text-xl'>{`BPM: ${p.music.bpm}`}</span>
						<Show when={p.music.duration != null}>
							<span class='text-xl'>
								{`Duration: ${fmtLength(Math.floor(p.music.duration! / 1e3))}.`}
								<span class='text-sm'>{(p.music.duration! % 1e3).toString().padStart(3, '0')}</span>
							</span>
						</Show>
						<span class='text-lg'>{`Version: ${p.music.version.name}`}</span>
						<Show when={p.music.duration == null}>
							<span class='text-lg'>{`Genre: ${p.music.genre.name}`}</span>
						</Show>
					</div>
					<Show when={p.music.duration != null}>
						<div class='flex justify-between'>
							<span class='text-lg'>{`Genre: ${p.music.genre.name}`}</span>
						</div>
					</Show>
				</div>

				<div class='flex items-start'>
					<div class='mr-2'>Charter:</div>
					<div class='min-w-0'>
						<Show when={!p.music.utage}>
							<For each={displayDiffs()}>
								{
									d => (
										<Show when={p.music.diffs[d]}>
											<div class={clsx('truncate', colors[d])}>{`[${diffData[d].name}] ${p.music.diffs[d]!.charter || '-'}`}</div>
										</Show>
									)
								}
							</For>
						</Show>
						<Show when={p.music.utage}>
							<div class='truncate text-pink-4'>{`[U·TA·GE] ${p.music.diffs[0]!.charter || '-'}`}</div>
						</Show>
					</div>
				</div>

				<Show when={p.music.utage}>
					<div class='truncate text-pink-4'>
						<span class='mr-2 text-black'>Comment:</span>
						{p.music.utage!.comment}
					</div>
				</Show>
			</div>
		</div>
	);
}
