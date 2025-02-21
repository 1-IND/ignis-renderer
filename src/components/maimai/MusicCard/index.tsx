import clsx from 'clsx';
import { Show } from 'solid-js';

import type { MusicData } from '../def';
import { MusicInfo } from './MusicInfo';
import { MusicTable } from './MusicTable';
import { OptionTable } from './OptionTable';
import { RatingTable } from './RatingTable';

export function MusicCard(p: { music: MusicData; class?: string }) {
	return (
		<div class={clsx('font-text flex justify-center', p.class)}>
			<div class='w-240 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-4'>
				<MusicInfo music={p.music} />

				<MusicTable class='mt-6' music={p.music} />

				<div class='mt-6 flex justify-between'>
					<RatingTable music={p.music} />
					<Show when={p.music.utage}>
						<OptionTable data={p.music.utage!.fixed} />
					</Show>
				</div>
			</div>
		</div>
	);
}
