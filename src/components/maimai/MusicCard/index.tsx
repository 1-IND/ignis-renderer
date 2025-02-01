import clsx from 'clsx';
import { Show } from 'solid-js';

import Badge from '../Badge';
import type { MusicData } from '../def';
import { MusicTable } from './MusicTable';
import { RatingTable } from './RatingTable';

export function MusicCard({ music, class: c }: { music: MusicData; class?: string }) {
	return (
		<div class={clsx('font-text flex justify-center', c)}>
			<div class='border-8 border-solid border-rounded-xl p-4 border-white/20 w-240 bg-white/40'>
				<div class='flex'>
					<div class='relative mr-4'>
						<img src={music.jacketImg} class='rounded-md h-50 w-50 object-cover' />
						<Badge.SongType class='h-6 top-0 right-0 absolute' type={music.type} />
					</div>

					<div class='flex flex-col justify-between flex-1 truncate'>
						<div class='w-90%'>
							<div class='text-4xl font-semibold truncate'>{music.title}</div>
							<div class='border-b border-5 border-black rounded-full mt-2' />
							<div class='text-xl truncate pt-1'>{music.artist}</div>
						</div>

						<div class='flex w-90% justify-between font-digit'>
							<span class='text-xl'>{`ID: ${music.id}`}</span>
							<span class='text-xl'>{`BPM: ${music.bpm}`}</span>
							<span class='text-lg'>{`Version: ${music.version.name}`}</span>
							<span class='text-lg'>{`Genre: ${music.genre.name}`}</span>
						</div>

						<div class='flex items-start'>
							<div class='mr-2'>Charter:</div>
							<div class='min-w-0'>
								<div class='text-red-5 truncate'>{`[Expert] ${music.levels[2].charter}`}</div>
								<div class='text-purple-7 truncate'>{`[Master] ${music.levels[3].charter}`}</div>
								<Show when={music.levels[4]}>
									<div class='text-gray-7 truncate'>{`[Re: Master] ${music.levels[4].charter}`}</div>
								</Show>
							</div>
						</div>
					</div>
				</div>
				<MusicTable class='mt-6' music={music} />
				<RatingTable class='mt-6' music={music} />
			</div>
		</div>
	);
}
