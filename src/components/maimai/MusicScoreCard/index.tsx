import clsx from 'clsx';
import { createMemo, For, Show } from 'solid-js';

import { Diff, sumDiffs } from '../def';
import type { MusicData, Score } from '../def';
import { MusicInfo } from '../MusicCard/MusicInfo';
import { DiffScoreCard } from './DiffScoreCard';

type ScoreType = Omit<Score, 'music'>;

export function MusicScoreCard(p: { music: MusicData; scores: ScoreType[]; class?: string }) {
	const diffMap = createMemo(() => new Map(p.scores.map(s => [s.diff, s] as const)));
	return (
		<div class={clsx('font-text flex justify-center', p.class)}>
			<div class='w-256 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-4'>
				<MusicInfo music={p.music} />

				<div class='mt-8'>
					<Show when={!p.music.utage}>
						<For each={[Diff.BAS, Diff.ADV, Diff.EXP, Diff.MAS, Diff.REM]}>
							{id => <DiffScoreCard chart={p.music.diffs[id]} diff={id} score={diffMap().get(id)} />}
						</For>
					</Show>
					<Show when={p.music.utage?.dp === false}>
						<DiffScoreCard chart={p.music.diffs[0]} diff={Diff.UTG} score={diffMap().get(0)} />
					</Show>
					<Show when={p.music.utage?.dp === true}>
						<DiffScoreCard chart={sumDiffs(p.music.diffs[0], p.music.diffs[1])} diff={Diff.UTG} score={diffMap().get(0)} />
					</Show>
				</div>
			</div>
		</div>
	);
}
