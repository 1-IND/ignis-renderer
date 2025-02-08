import { For, Show } from 'solid-js';

import { bg, TitleType, toAssetPath, type User } from '../def';

export const ratingBounds = [0, 1000, 2000, 4000, 7000, 10000, 12000, 13000, 14000, 14500, 15000];
export const toPlateNum = (rating: number) => ratingBounds.findLastIndex(r => rating >= r) + 1;

export const ratingPlateImg = (rating: number) => `common/dxrating/UI_CMN_DXRating_${toPlateNum(rating).toString().padStart(2, '0')}`;
export const digitImg = (digit: number) => `common/digit/UI_NUM_Drating_${digit}`;
export const titleImg1 = (type: TitleType) => `common/title/UI_CMN_Shougou_${TitleType[type]}`;

export function NamePlate(props: { user: User }) {
	const digits = () => (props.user.rating | 0).toString().padStart(5, ' ').slice(-5).split('');
	const rtDigitImgs = () => digits().map(d => d === ' ' ? null : toAssetPath(digitImg(+d)));
	const rtPlateImg = () => bg(toAssetPath(ratingPlateImg(props.user.rating)));
	const titleImg = () => bg(toAssetPath(titleImg1(props.user.title.type)));

	return (
		<div class='aspect-ratio-720/116 w-256 flex p-2' style={bg(props.user.nameplateImg)}>
			<img class='h-100%' src={props.user.iconImg} />

			<div class='ml-1.5 flex flex-1 flex-col items-start justify-between'>
				<div class='aspect-ratio-662/128 h-12 flex items-center pl-29' style={rtPlateImg()}>
					<For each={rtDigitImgs()}>
						{img => (
							<Show when={img} fallback={<span class='w-4.125' />}>
								<img src={img!} class='h-6 w-5' />
							</Show>
						)}
					</For>
				</div>

				<div class='h-14 w-98 flex items-center overflow-hidden whitespace-nowrap rounded-md bg-white px-2'>
					<span class='font-size-7.75'>{props.user.name}</span>
				</div>

				<div class='aspect-ratio-272/29 h-10.25 flex items-center justify-center truncate px-2' style={titleImg()}>
					<span
						class='mb-1 truncate px-1 text-xl text-white text-stroke-3 text-stroke-black'
						style={{ 'paint-order': 'stroke fill' }}
					>
						{props.user.title.text}
					</span>
				</div>
			</div>
		</div>
	);
}
