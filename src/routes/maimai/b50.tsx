import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background';
import type { Best50, User } from '~/components/maimai/def';
import { PlayCard } from '~/components/maimai/PlayCard';
import { Player } from '~/components/maimai/Player';

interface Context {
	user?: User;
	best50?: Best50;
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Background w={1600} h={1600}>
			<Show when={ctx.user}>
				<Player user={ctx.user!} />
			</Show>
			<Show when={ctx.best50}>
				<div class='grid grid-cols-5 grid-rows-7 gap-2 px-8 py-4'>
					<For each={ctx.best50!.b35}>{score => <PlayCard score={score} />}</For>
				</div>
				<div class='grid grid-cols-5 grid-rows-3 gap-2 px-8 py-4'>
					<For each={ctx.best50!.b15}>{score => <PlayCard score={score} />}</For>
				</div>
			</Show>
		</Background>
	);
}
