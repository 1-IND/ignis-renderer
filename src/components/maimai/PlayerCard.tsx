import clsx from 'clsx';
import { For, Show } from 'solid-js';

import { TitleType, toAssetPath, type User } from './def';

export const ratingBounds = [0, 1000, 2000, 4000, 7000, 10000, 12000, 13000, 14000, 14500, 15000];
export const toPlateNum = (rating: number) => ratingBounds.findLastIndex(r => rating >= r) + 1;

export const ratingPlateImg = (rating: number) => `common/dxrating/UI_CMN_DXRating_${toPlateNum(rating).toString().padStart(2, '0')}`;
export const digitImg = (digit: number) => `common/digit/UI_NUM_Drating_${digit}`;
export const titleImg1 = (type: TitleType) => `common/title/UI_CMN_Shougou_${TitleType[type]}`;

export function PlayerCard({ user, class: c }: { user: User; class?: string }) {
	const digits = (user.rating | 0).toString().padStart(5, ' ').slice(-5).split('');
	const rtDigitImgs = digits.map(digit => digit === ' ' ? null : toAssetPath(digitImg(+digit)));
	const rtPlateImg = toAssetPath(ratingPlateImg(user.rating));
	const titleImg = toAssetPath(titleImg1(user.title.type));
	const bg = (url: string) => ({ 'background-image': `url(${url})`, 'background-size': 'cover' });

	return (
		<div
			class={clsx('p-2 bg-blue-3 font-text rounded-lg aspect-ratio-1080/452', c)}
			style={bg(user.frameImg)}
		>
			<div class='flex p-2 aspect-ratio-720/116 w-60%' style={bg(user.nameplateImg)}>
				<img src={user.iconImg} />

				<div class='flex flex-col items-start justify-between ml-2 flex-1'>
					<div class='flex items-center pl-24.25 h-10 aspect-ratio-662/128' style={bg(rtPlateImg)}>
						<For each={rtDigitImgs}>
							{img => (
								<Show when={img} fallback={<span class='h-5 w-4.125' />}>
									<img src={img!} class='h-5 w-4.125' />
								</Show>
							)}
						</For>
					</div>

					<div class='flex items-center px-2 h-12 w-82 bg-white rounded-md overflow-hidden whitespace-nowrap'>
						<span class='font-size-6.75'>{user.name}</span>
					</div>

					<div class='flex items-center justify-center h-8.75 px-2 truncate aspect-ratio-272/29' style={bg(titleImg)}>
						<span
							class='px-1 text-white text-sm text-stroke-3 text-stroke-black truncate'
							style={{ 'paint-order': 'stroke fill' }}
						>
							{user.title.text}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
