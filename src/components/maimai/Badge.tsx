import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';
import { UtageData } from './def';

export type MusicType = 'STD' | 'DX' | 'UTG';
export enum ComboType { Blank, FC, FCp, AP, APp }
export enum SyncType { Blank, FS, FSp, FSD, FSDp, SP }
export enum RankType { D, C, B, BB, BBB, A, AA, AAA, S, Sp, SS, SSp, SSS, SSSp }

export const dxs = [0.85, 0.90, 0.93, 0.95, 0.97];
export const toDXStar = (acc: number) => dxs.findLastIndex(dx => acc >= dx) + 1;

function toAssetPath(name: string) {
	return `/assets/maimai/${name}.png`;
}

export const rankBadge = (rank: RankType) => `prism/rank/UI_GAM_Rank_${RankType[rank]}`;
export const comboBadge = (combo: ComboType) => `common/lamp/UI_MSS_MBase_Icon_${ComboType[combo]}`;
export const syncBadge = (sync: SyncType) => `common/lamp/UI_MSS_MBase_Icon_${SyncType[sync]}`;
export const dxsBadge = (acc: number) => `common/lamp/UI_GAM_Gauge_DXScoreIcon_0${toDXStar(acc)}`;

export default {
	Combo: ({ type, class: c }: { type: ComboType; class?: string }) => <img class={c} src={toAssetPath(comboBadge(type))} />,
	Sync: ({ type, class: c }: { type: SyncType; class?: string }) => <img class={c} src={toAssetPath(syncBadge(type))} />,
	Rank: ({ type, class: c }: { type: RankType; class?: string }) => <img class={c} src={toAssetPath(rankBadge(type))} />,
	DXS: ({ acc, class: c }: { acc: number; class?: string }) => <img class={c} src={toAssetPath(dxsBadge(acc))} />,
	SongType: ({ type, utage, class: c }: { type: MusicType; utage?: UtageData, class?: string }) => {
		return (
			<Switch>
				<Match when={type === 'STD'}><img class={c} src={toAssetPath('common/infoicon/UI_MSS_Infoicon_StandardMode')} /></Match>
				<Match when={type === 'DX'}><img class={c} src={toAssetPath('common/infoicon/UI_MSS_Infoicon_StandardMode')} /></Match>
				<Match when={type === 'UTG'}>
					<div class={clsx('flex', c)}>
						<div class='z-1 relative'>
							<img class='h-full' src={toAssetPath('common/infoicon/UI_MSS_Infoicon_Utage')} />
							<div class='font-text text-size-60% text-white absolute top-1/2 left-1/2 transform-translate--50%'>{utage?.kanji}</div>
						</div>
						<Show when={utage?.dp}>
							<img class='ml--3' src={toAssetPath('common/infoicon/UI_MSS_Infoicon_Utage_2P')} />
						</Show>
					</div>
				</Match>
			</Switch>
		);
	},
};
