import { Show } from 'solid-js';

import type { Filter } from '~/routes/maimai/range';

const fmt = <T extends number | string>(t: T[]) => t.length === 2 ? `${t[0]} ~ ${t[1]}` : t.join(', ');

const comboNames = ['None', 'FC', 'FC+', 'AP', 'AP+'] as const;
const syncNames = ['None', 'FS', 'FS+', 'FSD', 'FSD+', 'Sync'] as const;
const rankNames = ['D', 'C', 'B', 'BB', 'BBB', 'A', 'AA', 'AAA', 'S', 'S+', 'SS', 'SS+', 'SSS', 'SSS+'] as const;

export function FilterDisplay(p: { filter: Filter }) {
	const hasChartFilter = () => p.filter.diff.length > 0 || p.filter.level.length > 0 || p.filter.rating.length > 0 || p.filter.version.length > 0;

	return (
		<div class='rounded-xl bg-white/80 px-2 py-1 text-lg font-digit'>
			<div>Chart Filter:</div>
			<Show when={hasChartFilter()} fallback={<div>No filter applied.</div>}>
				<ul class='list-disc-inside [&_li]:line-height-none'>
					<Show when={p.filter.diff.length > 0}><li>{`Difficulty: ${fmt(p.filter.diff)}`}</li></Show>
					<Show when={p.filter.level.length > 0}><li>{`Level: ${fmt(p.filter.level)}`}</li></Show>
					<Show when={p.filter.rating.length > 0}><li>{`Song Rating: ${fmt(p.filter.rating)}`}</li></Show>
					<Show when={p.filter.version.length > 0}><li>{`Version: ${fmt(p.filter.version)}`}</li></Show>
				</ul>
			</Show>

			<div class='mt-2'>Score Filter:</div>
			<Show when={p.filter.prelim} fallback={<div>No filter applied.</div>}>
				<ul class='list-disc-inside [&_li]:line-height-none'>
					<Show when={p.filter.prelim!.rank.length > 0}><li>{`Rank: ${fmt(p.filter.prelim!.rank.map(x => rankNames[x]))}`}</li></Show>
					<Show when={p.filter.prelim!.combo.length > 0}><li>{`Combo: ${fmt(p.filter.prelim!.combo.map(x => comboNames[x]))}`}</li></Show>
					<Show when={p.filter.prelim!.sync.length > 0}><li>{`Sync: ${fmt(p.filter.prelim!.sync.map(x => syncNames[x]))}`}</li></Show>
					<Show when={p.filter.prelim!.star.length > 0}><li>{`DX Star: ${fmt(p.filter.prelim!.star)}`}</li></Show>
				</ul>
			</Show>

			{/* <Show when={p.filter.main}>
				<div class='mt-2'>{`Goal: ${p.filter.main.}`}</div>
			</Show> */}
		</div>
	);
}
