import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { MusicData } from '~/components/maimai/def';
import { MusicCard } from '~/components/maimai/MusicCard';

interface Context {
	music?: MusicData;
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Background class='w-256'>
			<Show when={ctx.music} fallback='No music'>
				<MusicCard class='p-8' music={ctx.music!} />
			</Show>

			<div class='border-8 border-solid border-rounded-xl p-2 m-8 mt-0 border-white/20 bg-white/40 text-center'>
				<span class='font-digit'>Developed by shshsh & tiger0132. Design inspired by Yuri-YuzuChaN.</span>
			</div>
		</Background>
	);
}
