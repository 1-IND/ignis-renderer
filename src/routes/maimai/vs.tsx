import { createMemo, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

import { Background } from '~/components/maimai/Background/Prism';
import { toDXStar } from '~/components/maimai/Badge';
import type { ComboType, Diff, MusicData, RankType, Score, SyncType, User } from '~/components/maimai/def';
import { Frame } from '~/components/maimai/player/Frame';
import { NamePlate } from '~/components/maimai/player/NamePlate';
import { FilterDisplay } from '~/components/maimai/Range/FilterDisplay';
import { VS } from '~/components/maimai/VS';
import { VSStats } from '~/components/maimai/VS/VSStats';

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
	dxScore?: boolean;
}
export type FilteredChart = MusicData['diffs'][number] & { diff: Diff; scoreA?: Score; scoreB?: Score; music: MusicData };
export interface Context {
	user?: User;
	userB?: User;
	filter?: Filter;
	charts?: FilteredChart[]; // acc === -1 means no score
}

const [ctx, setContext] = createStore<Context>({});
globalThis.setContext = setContext;

export default function Main() {
	const chartMap = createMemo(() => {
		const chartMap: ChartMap = {
			win: [],
			draw: [],
			lose: [],
			notPlayed: [],
			onlyA: [],
			onlyB: [],
		};
		if (!ctx.charts) return chartMap;

		const charts = [...ctx.charts];
		const goal = ctx.filter?.main;
		const dxScore = ctx.filter?.dxScore;
		charts.sort((x, y) => {
			if (x.rating !== y.rating) return y.rating - x.rating;
			return x.music.id - y.music.id;
		});

		for (const chart of charts) {
			if (goal) {
				const A = isGoalAchieved(goal, chart.scoreA, dxScore, chart.notes.total);
				const B = isGoalAchieved(goal, chart.scoreB, dxScore, chart.notes.total);
				const key = A ? (B ? 'draw' : 'win') : B ? 'lose' : 'notPlayed';
				chartMap[key].push(chart);
			} else {
				const scoreA = chart.scoreA?.[dxScore ? 'dxs' : 'acc'] ?? 0;
				const scoreB = chart.scoreB?.[dxScore ? 'dxs' : 'acc'] ?? 0;

				let key: Verdict = scoreA > scoreB ? 'win' : scoreA < scoreB ? 'lose' : 'draw';
				if (!chart.scoreA && !chart.scoreB) key = 'notPlayed';
				if (!chart.scoreA && scoreB > 0) key = 'onlyB';
				if (!chart.scoreB && scoreA > 0) key = 'onlyA';

				chartMap[key].push({ ...chart, delta: scoreA - scoreB });
			}
		}
		if (!goal) {
			chartMap.win.sort((x, y) => y.delta! - x.delta!);
			chartMap.lose.sort((x, y) => y.delta! - x.delta!);
		}

		return chartMap;
	});

	return (
		<Show when={ctx.user && ctx.userB && ctx.filter && ctx.charts}>
			<Background class='w-400'>
				<div class='m-8'>
					<Frame class='flex flex-col items-start gap-4 p-4' user={ctx.user!}>
						<NamePlate user={ctx.user!} />
						<NamePlate user={ctx.userB!} />
						<div class='mt-auto flex items-end gap-4'>
							<VSStats charts={ctx.charts!} chartMap={chartMap()} goal={ctx.filter?.main} />
							<FilterDisplay filter={ctx.filter!} />
						</div>
					</Frame>
				</div>

				<VS chartMap={chartMap()} ctx={ctx} />
			</Background>
		</Show>
	);
}

export type Verdict = 'win' | 'draw' | 'lose' | 'notPlayed' | 'onlyA' | 'onlyB';
export type ChartMap = Record<Verdict, (FilteredChart & { delta?: number })[]>;

function isGoalAchieved(goal: AnyScoreF, score: Score | undefined, dxScore: boolean | undefined, totalNotes: number) {
	if (!score) return false;
	switch (goal.type) {
		case 'rank': return score.rank >= goal.value;
		case 'combo': return score.combo >= goal.value;
		case 'sync': {
			if (goal.value === 5) return score.sync >= 1;
			return score.sync >= goal.value && score.sync <= 4;
		}
		case 'star': return toDXStar(score.dxs / (totalNotes * 3)) >= goal.value;
		case 'ratio': {
			if (dxScore) return score.dxs / (totalNotes * 3) >= goal.value;
			return score.acc >= goal.value;
		}
	}
}
