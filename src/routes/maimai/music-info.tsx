import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background';
import type { MusicDetailed } from '~/components/maimai/def';

interface Context {
	music?: MusicDetailed;
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Background w={1600} h={1600}>
			<Show when={ctx.music} fallback='No music'>
				{JSON.stringify(ctx.music!)}
			</Show>
		</Background>
	);
}
