import { createMemo, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import type { ComboType, Level, MusicData, RankType, Score, SyncType, User } from '~/components/maimai/def';
import { Frame } from '~/components/maimai/player/Frame';
import { NamePlate } from '~/components/maimai/player/NamePlate';
import { isGoalAchieved, PlayCardA } from '~/components/maimai/Range/PlayCardA';

export interface RankF { type: 'rank'; value: RankType[] }
export interface ComboF { type: 'combo'; value: ComboType[] }
export interface SyncF { type: 'sync'; value: SyncType[] }
export interface StarF { type: 'star'; value: number[] }
export type AnyF = RankF | ComboF | SyncF | StarF;

export interface Filter {
	level: Level[];
	diff: string[];
	rating: number[];
	version: string[];

	main?: AnyF;
	prelim?: {
		rank: RankType[];
		combo: ComboType[];
		sync: SyncType[];
		star: number[];
	};
}
export type FilteredChart = MusicData['levels'][number] & { level: number; score?: Score; music: MusicData };
interface Context {
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
					<Frame class='flex flex-col gap-4 items-start p-4' user={ctx.user!}>
						<NamePlate user={ctx.user!} />
						<div class='flex-1' />
					</Frame>
				</div>

				<Range />
			</Background>
		</Show>
	);
}

function Range() {
	const chartMap = createMemo(() => {
		const map = new Map<number, FilteredChart[]>();
		if (!ctx.charts) return map;
		for (const chart of ctx.charts) {
			const key = chart.rating;
			if (!map.has(key)) map.set(key, []);
			map.get(key)!.push(chart);
		}
		return map;
	});

	return (
		<div class='m-8 flex flex-col gap-4'>
			<Show
				when={[...chartMap().values()].reduce((x, y) => x + Math.ceil(y.length / 12), 0) <= 45}
				fallback='Too many rows'
			>
				<For each={Array
					.from(chartMap())
					?.sort((a, b) => b[0] - a[0])}
				>
					{([rating, charts]) => (
						<div class='flex gap-4'>
							<div class='flex'>
								<div class='flex flex-col items-center justify-center w-32 p-2 border-rounded-xl bg-blue-5/60'>
									<span class='text-3xl font-digit text-white'>{rating.toFixed(1)}</span>
									<Show when={ctx.filter?.main}>
										<span class='text-xl font-digit text-white'>{`${charts.reduce((x, y) => x + Number(isGoalAchieved(ctx.filter!.main, y)), 0)} / ${charts.length}`}</span>
									</Show>
									{/* TODO: stats */}
								</div>
							</div>
							<div class='grid flex-1 grid-cols-12 gap-4'>
								<For each={charts}>
									{chart => (
										<PlayCardA class='aspect-ratio-square' chart={chart} goal={ctx.filter?.main} />
									)}
								</For>
							</div>
						</div>
					)}
				</For>
			</Show>
		</div>
	);
}
