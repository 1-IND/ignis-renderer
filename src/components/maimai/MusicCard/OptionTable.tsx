import clsx from 'clsx';
import { For } from 'solid-js';

export function OptionTable({ data, class: c }: { data: { name: string; value: string }[]; class?: string }) {
	return (
		<table class={clsx('border-collapse rounded-lg overflow-hidden border-hidden', c)}>
			<thead>
				<tr class='h-10'>
					<For each={data}>
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
					<For each={data}>
						{({ value }) => (
							<td class='px-2 text-center bg-gray-1 border-b border-r border-gray-3'>
								<div>{value}</div>
							</td>
						)}
					</For>
				</tr>
			</tbody>
		</table>
	);
}
