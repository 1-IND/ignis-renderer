import { Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { ComboType, Diff, MusicData, RankType, Score, SyncType, User } from '~/components/maimai/def';
import { Frame } from '~/components/maimai/player/Frame';
import { NamePlate } from '~/components/maimai/player/NamePlate';
import { Range } from '~/components/maimai/Range';
import { FilterDisplay } from '~/components/maimai/Range/FilterDisplay';
import { RangeStats } from '~/components/maimai/Range/RangeStats';

export type AnyScoreF =
	| { type: 'rank'; value: RankType }
	| { type: 'combo'; value: ComboType }
	| { type: 'sync'; value: SyncType }
	| { type: 'star'; value: number };

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
	};

	// Exclusive filters
	utage?: { kanji: string[]; dp: boolean[] };
	plate?: { version: number[]; cond: AnyScoreF };

	// States
	state: {
		真?: boolean;
		舞?: boolean;
		versionCnt?: number;

		info: Set<string>;
	};
}
export type FilteredChart = MusicData['diffs'][number] & { diff: Diff; score?: Score; music: MusicData };
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
						<div class='flex-1' />
						<div class='flex items-end gap-4'>
							<RangeStats charts={ctx.charts!} goal={ctx.filter!.main} />
							<FilterDisplay filter={ctx.filter!} />
						</div>
					</Frame>
				</div>

				<Range ctx={ctx} />
			</Background>
		</Show>
	);
}
