import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { MusicData, Score, User } from '~/components/maimai/def';
import { MusicCard } from '~/components/maimai/MusicCard';

interface Context {
	user?: User;
	music?: MusicData;
	scores?: Omit<Score, 'music'>[];
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Background class='w-256'>
			<Show when={ctx.music} fallback='No music'>
				<MusicCard class='p-8' music={ctx.music!} />
			</Show>

			<Show when={ctx.scores} fallback='No scores'>
				scores
			</Show>

			<div class='m-8 mt-0 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-2 text-center'>
				<span class='font-digit'>Developed by shshsh & tiger0132. Design inspired by Yuri-YuzuChaN.</span>
			</div>
		</Background>
	);
}
