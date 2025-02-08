import clsx from 'clsx';
import { For } from 'solid-js';

export function OptionTable(p: { data: { name: string; value: string }[]; class?: string }) {
	return (
		<table class={clsx('border-collapse rounded-lg overflow-hidden border-hidden', p.class)}>
			<thead>
				<tr class='h-10'>
					<For each={p.data}>
						{({ name }) => (
							<th class={clsx('px-2 text-center bg-gray-2 border-b border-r border-gray-3 w-11%')}>
								<div>{name}</div>
							</th>
						)}
					</For>
				</tr>
			</thead>
			<tbody>
				<tr class='h-10'>
					<For each={p.data}>
						{({ value }) => (
							<td class='border-b border-r border-gray-3 bg-gray-1 px-2 text-center'>
								<div>{value}</div>
							</td>
						)}
					</For>
				</tr>
			</tbody>
		</table>
	);
}
