import clsx from 'clsx';
import { createMemo, For, Show } from 'solid-js';

import { Level, type MusicData, type Score, sumLevels } from '../def';
import { MusicInfo } from '../MusicCard/MusicInfo';
import { DiffScoreCard } from './DiffScoreCard';

type ScoreType = Omit<Score, 'music'>;

export function MusicScoreCard(p: { music: MusicData; scores: ScoreType[]; class?: string }) {
	const levelMap = createMemo(() => {
		const levelMap = new Map<number, ScoreType>();
		for (const score of p.scores) {
			levelMap.set(score.level, score);
		}
		return levelMap;
	});
	return (
		<div class={clsx('font-text flex justify-center', p.class)}>
			<div class='w-256 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-4'>
				<MusicInfo music={p.music} />

				<div class='mt-8'>
					<Show when={!p.music.utage}>
						<For each={[0, 1, 2, 3, 4]}>
							{id => <DiffScoreCard chart={p.music.levels[id]} diff={id} score={levelMap().get(id)} />}
						</For>
					</Show>
					<Show when={p.music.utage?.dp === false}>
						<DiffScoreCard chart={p.music.levels[0]} diff={Level.UTG} score={levelMap().get(0)} />
					</Show>
					<Show when={p.music.utage?.dp === true}>
						<DiffScoreCard chart={sumLevels(p.music.levels[0], p.music.levels[1])} diff={Level.UTG} score={levelMap().get(0)} />
					</Show>
				</div>
			</div>
		</div>
	);
}
