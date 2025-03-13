import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { AnyScoreF, ChartMap, FilteredChart, Verdict } from '~/routes/maimai/vs';

export function VSStats(p: { charts: FilteredChart[]; chartMap: ChartMap; goal?: AnyScoreF }) {
	const g = (k: Verdict) => p.chartMap[k].length;
	const f = (a: Verdict, b: Verdict) => `${g(a) + g(b)}${p.goal ? '' : ` (${g(a)}+${g(b)})`}`;

	const Part = (p2: { type: Verdict; class?: string }) => (
		<Show when={g(p2.type) > 0}>
			<div class={p2.class} style={{ width: `${(g(p2.type) / p.charts.length) * 100}%` }} />
		</Show>
	);
	const A = () => g('win') + g('onlyA');
	const B = () => g('lose') + g('onlyB');

	return (
		<div class='rounded-xl bg-white/80 p-3 font-digit'>
			<div class='min-w-80 text-lg'>
				<div class='mb-2 w-full text-2xl font-bold'>
					<Switch>
						<Match when={A() > B()}><div class='text-center text-pink'>WIN!</div></Match>
						<Match when={A() === B()}><div class='text-center text-green'>DRAW</div></Match>
						<Match when={A() < B()}><div class='text-center text-blue'>LOSE...</div></Match>
					</Switch>
				</div>

				<div class={clsx(
					'mb-2 h-6 w-full flex rounded-1 [&_:first-child]:rounded-[0.5rem_0_0_0.5rem] [&_:last-child]:rounded-[0_0.5rem_0.5rem_0]',
					p.charts.length === 0 && 'bg-gray/50',
				)}>
					<Part type='win' class='bg-pink-5/70' />
					<Part type='onlyA' class='bg-pink/50' />
					<Part type='draw' class='bg-green-5/70' />
					<Part type='lose' class='bg-blue-5/70' />
					<Part type='onlyB' class='bg-blue/50' />
					<Part type='notPlayed' class='bg-gray/50' />
				</div>

				<ul class='mb-2 list-disc-inside [&_li]:lh-tight'>
					<Show when={p.goal}>
						<li>
							{'Achieve Count: '}
							<span class='text-pink font-bold'>{`${g('win') + g('draw')} (${g('win')}+${g('draw')})`}</span>
						</li>
					</Show>
					<Show when={p.goal}>
						<li>
							{'Rival Achieve Count: '}
							<span class='text-blue font-bold'>{`${g('lose') + g('draw')} (${g('lose')}+${g('draw')})`}</span>
						</li>
					</Show>

					<li>
						{'Count: '}
						<span class='text-pink font-bold'>{f('win', 'onlyA')}</span>
						{' / '}
						<span class='text-green font-bold'>
							{`${g('draw') + g('notPlayed')} (${g('draw')}`}
							<span class='text-gray'>{`+${g('notPlayed')})`}</span>
						</span>
						{' / '}
						<span class='text-blue font-bold'>{f('lose', 'onlyB')}</span>
					</li>
				</ul>

				<div>Developed by shshsh & tiger0132.</div>
			</div>
		</div>
	);
}
