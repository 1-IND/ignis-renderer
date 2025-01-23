import { For } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from './components/Background';
import { Card } from './components/Card';
import { Player } from './components/Player';
import type { Best50, User } from './def';

interface Context {
	user: User;
	best50: Best50;
}
declare global {
	function setContext(ctx: Context): void;

	// eslint-disable-next-line vars-on-top, no-var
	var ctx: Context;
}

const [ctx, setContext] = createStore<Context>({
	user: { name: '', rating: -1 },
	best50: { b35: [], b15: [] },
});
globalThis.setContext = setContext;
globalThis.ctx = ctx;

export default function Home() {
	return (
		<Background w={1600} h={1600}>
			<Player user={ctx.user} />
			<div class='grid grid-cols-5 grid-rows-7 gap-2 px-[2rem] py-[1rem]'>
				<For each={ctx.best50.b35}>{score => <Card score={score} />}</For>
			</div>
			<div class='grid grid-cols-5 grid-rows-3 gap-2 px-[2rem] py-[1rem]'>
				<For each={ctx.best50.b15}>{score => <Card score={score} />}</For>
			</div>
		</Background>
	);
}
