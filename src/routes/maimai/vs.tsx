import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { ComboType, Diff, MusicData, RankType, Score, SyncType, User } from '~/components/maimai/def';
import { Frame } from '~/components/maimai/player/Frame';
import { NamePlate } from '~/components/maimai/player/NamePlate';
import { FilterDisplay } from '~/components/maimai/Range/FilterDisplay';
import { VS } from '~/components/maimai/VS';

export type AnyScoreF =
	| { type: 'rank'; value: RankType }
	| { type: 'combo'; value: ComboType }
	| { type: 'sync'; value: SyncType }
	| { type: 'star'; value: number }
	| { type: 'ratio'; value: number };

export interface Filter {
	// Chart filters
	diff: Diff[];
	level: string[];
	rating: number[];
	version: string[];

	// Score filters
	main?: AnyScoreF;
	prelim?: {
		rank: RankType[];
		combo: ComboType[];
		sync: SyncType[];
		star: number[];
		ratio: number[];
	};
	dxScore?: true;
}
export type FilteredChart = MusicData['diffs'][number] & { diff: Diff; scoreA?: Score; scoreB?: Score; music: MusicData };
export interface Context {
	user?: User;
	filter?: Filter;
	charts?: FilteredChart[]; // acc === -1 means no score
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	return (
		<Show when={ctx.user && ctx.filter && ctx.charts}>
			<Background class='w-400'>
				<div class='m-8'>
					<Frame class='flex flex-col items-start gap-4 p-4' user={ctx.user!}>
						<NamePlate user={ctx.user!} />
						<div class='mt-auto flex items-end gap-4'>
							<FilterDisplay filter={ctx.filter!} />
						</div>
					</Frame>
				</div>

				<VS ctx={ctx} />
			</Background>
		</Show>
	);
}
