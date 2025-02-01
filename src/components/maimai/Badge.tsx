import { Show } from 'solid-js';

export type MusicType = 'STD' | 'DX' | 'UTG';
export enum ComboType { Blank, FC, FCp, AP, APp }
export enum SyncType { Blank, FS, FSp, FSD, FSDp, SP }
export enum RankType { D, C, B, BB, BBB, A, AA, AAA, S, Sp, SS, SSp, SSS, SSSp }

export const dxs = [0.85, 0.90, 0.93, 0.95, 0.97];
export const toDXStar = (acc: number) => dxs.findLastIndex(dx => acc >= dx) + 1;

function toAssetPath(name: string) {
	return `/assets/maimai/prism/${name}.png`;
}

export const rankBadge = (rank: RankType) => `rank/UI_GAM_Rank_${RankType[rank]}`;
export const comboBadge = (combo: ComboType) => `lamp/UI_MSS_MBase_Icon_${ComboType[combo]}`;
export const syncBadge = (sync: SyncType) => `lamp/UI_MSS_MBase_Icon_${SyncType[sync]}`;
export const dxsBadge = (acc: number) => `lamp/UI_GAM_Gauge_DXScoreIcon_0${toDXStar(acc)}`;

export default {
	Combo: ({ type, class: c }: { type: ComboType; class?: string }) => <img class={c} src={toAssetPath(comboBadge(type))} />,
	Sync: ({ type, class: c }: { type: SyncType; class?: string }) => <img class={c} src={toAssetPath(syncBadge(type))} />,
	Rank: ({ type, class: c }: { type: RankType; class?: string }) => <img class={c} src={toAssetPath(rankBadge(type))} />,
	DXS: ({ acc, class: c }: { acc: number; class?: string }) => <img class={c} src={toAssetPath(dxsBadge(acc))} />,
	SongType: ({ type, class: c }: { type: MusicType; class?: string }) => {
		return (
			<>
				<Show when={type === 'STD'}>
					<img class={c} src={toAssetPath('infoicon/UI_MSS_Infoicon_StandardMode')} />
				</Show>
				<Show when={type === 'DX'}>
					<img class={c} src={toAssetPath('infoicon/UI_MSS_Infoicon_DeluxeMode')} />
				</Show>
			</>
		);
	},
};
