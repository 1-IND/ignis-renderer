import clsx from 'clsx';
import { createEffect, createSignal, For, Show } from 'solid-js';

import type { MusicData, Score } from '../def';
import { DiffScoreCard } from './DiffScoreCard';
import { MusicInfoCard } from './MusicInfoCard';

type ScoreType = Omit<Score, 'music'>;

export function MusicScoreCard(p: { music: MusicData; scores: ScoreType[]; class?: string }) {
	const [getLevelMap, setLevelMap] = createSignal(new Map<number, ScoreType>());
	createEffect(() => {
		const levelMap = new Map<number, ScoreType>();
		for (const score of p.scores) {
			levelMap.set(score.level, score);
		}
		setLevelMap(levelMap);
		console.log(levelMap);
	});
	return (
		<div class={clsx('font-text flex justify-center', p.class)}>
			<div class='w-240 border-8 border-white/20 border-rounded-xl border-solid bg-white/40 p-4'>
				<MusicInfoCard music={p.music} scores={p.scores} class={p.class} />

				<div class='mt-30px'>
					<Show when={!p.music.utage}>
						<For each={[0, 1, 2, 3, 4]}>{id => <DiffScoreCard music={p.music} diff={id} score={getLevelMap().get(id)} />}</For>
					</Show>
				</div>
			</div>
		</div>
	);
}
