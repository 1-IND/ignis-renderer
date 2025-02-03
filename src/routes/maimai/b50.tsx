import { For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import { Best50Stats } from '~/components/maimai/Best50Stats';
import type { Best50, User } from '~/components/maimai/def';
import { DummyPlayCard, PlayCard } from '~/components/maimai/PlayCard';
import { Frame } from '~/components/maimai/player/Frame';
import { NamePlate } from '~/components/maimai/player/NamePlate';

interface Context {
	user?: User;
	best50?: Best50;
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Show when={ctx.user && ctx.best50}>
			<Background class='w-400'>
				<div class='m-8'>
					<Frame class='flex flex-col gap-4 items-start p-4' user={ctx.user!}>
						<NamePlate user={ctx.user!} />
						<div class='flex-1' />
						<Best50Stats best50={ctx.best50!} />
					</Frame>
				</div>
				<div class='grid grid-cols-5 grid-rows-7 gap-2 px-8 pb-16'>
					<For each={ctx.best50!.b35}>{score => <PlayCard score={score} />}</For>
					<For each={Array.from({ length: 35 - ctx.best50!.b35.length }).fill(null)}>{() => <DummyPlayCard />}</For>
				</div>
				<div class='grid grid-cols-5 grid-rows-3 gap-2 px-8 pb-8'>
					<For each={ctx.best50!.b15}>{score => <PlayCard score={score} />}</For>
					<For each={Array.from({ length: 15 - ctx.best50!.b15.length }).fill(null)}>{() => <DummyPlayCard />}</For>
				</div>
			</Background>
		</Show>
	);
}
