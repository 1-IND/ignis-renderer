import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { MusicData, Score, User } from '~/components/maimai/def';
import { MusicScoreCard } from '~/components/maimai/MusicScoreCard';
import { NamePlate } from '~/components/maimai/player/NamePlate';

interface Context {
	user?: User;
	music?: MusicData;
	scores?: Omit<Score, 'music'>[];
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Background class='w-272'>
			<Show when={ctx.user}>
				<NamePlate class='m-8 mb-0' user={ctx.user!} />
			</Show>
			<Show when={ctx.music && ctx.scores}>
				<MusicScoreCard class='p-8' music={ctx.music!} scores={ctx.scores!} />
			</Show>
			<div class='m-8 mt-0 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-2 text-center'>
				<span class='font-digit'>Developed by shshsh & tiger0132. Design inspired by Yuri-YuzuChaN.</span>
			</div>
		</Background>
	);
}
