import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background';
import type { ComboType, Level, RankType, Score, SyncType, User } from '~/components/maimai/def';

interface RankF { rank: RankType[] }
interface ComboF { combo: ComboType[] }
interface SyncF { sync: SyncType[] }
interface StarF { star: number[] }

interface Filter {
	level: Level[];
	diff: string[];
	rating: number[];
	version: string[];

	main?: RankF | ComboF | SyncF | StarF;
	prelim?: RankF & ComboF & SyncF & StarF;
}
interface Context {
	user?: User;
	filter?: Filter;
	scores?: Score[]; // acc === -1 means no score
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	setContext({});

	return (
		<Background w={1600} h={1600}>
			qwq
		</Background>
	);
}
