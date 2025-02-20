import clsx from 'clsx';
import { Show } from 'solid-js';

import Badge from '../Badge';
import type { MusicData, Score } from '../def';

export function MusicInfoCard(p: { music: MusicData; scores: Omit<Score, 'music'>[]; class?: string }) {
	return (
		<div class='flex'>
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

				<div class='w-90% flex justify-between font-digit'>
					<span class='text-xl'>{`ID: ${p.music.id}`}</span>
					<span class='text-xl'>{`BPM: ${p.music.bpm}`}</span>
					<span class='text-lg'>{`Version: ${p.music.version.name}`}</span>
					<span class='text-lg'>{`Genre: ${p.music.genre.name}`}</span>
				</div>

				<div class='flex items-start'>
					<div class='mr-2'>Charter:</div>
					<div class='min-w-0'>
						<Show when={!p.music.utage}>
							<div class='truncate text-red-5'>{`[Expert] ${p.music.levels[2].charter}`}</div>
							<div class='truncate text-purple-7'>{`[Master] ${p.music.levels[3].charter}`}</div>
							<Show when={p.music.levels[4]}>
								<div class='truncate text-gray-7'>{`[Re:MASTER] ${p.music.levels[4].charter}`}</div>
							</Show>
						</Show>
						<Show when={p.music.utage}>
							<div class='truncate text-pink-4'>{`[U·TA·GE] ${p.music.levels[0].charter || '-'}`}</div>
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
