import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import { Credits } from '~/components/maimai/Credits';
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

			<Credits class='m-8 mt-0'>
				<span class='font-digit'>Developed by shshsh & tiger0132. Design inspired by Yuri-YuzuChaN.</span>
			</Credits>
		</Background>
	);
}
