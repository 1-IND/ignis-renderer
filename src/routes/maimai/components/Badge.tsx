export type MusicType = 'STD' | 'DX' | 'UTG';
export enum ComboType { Blank, FC, FCp, AP, APp }
export enum SyncType { Blank, FS, FSp, FSD, FSDp, SP }
export enum RankType { D, C, B, BB, BBB, A, AA, AAA, S, Sp, SS, SSp, SSS, SSSp }

export const dxs = [0.85, 0.90, 0.93, 0.95, 0.97];
export const toDXStar = (acc: number) => dxs.findLastIndex(dx => acc >= dx) + 1;

function toAssetPath(name: string) {
	return `/assets/maimai/prism/${name}.png`;
}

export const rankBadge = (rank: RankType) => `ranks/UI_GAM_Rank_${RankType[rank]}`;
export const comboBadge = (combo: ComboType) => `lamps/UI_MSS_MBase_Icon_${ComboType[combo]}`;
export const syncBadge = (sync: SyncType) => `lamps/UI_MSS_MBase_Icon_${SyncType[sync]}`;
export const dxsBadge = (acc: number) => `lamps/UI_GAM_Gauge_DXScoreIcon_0${toDXStar(acc)}`;

export default {
	Combo: ({ type }: { type: ComboType }) => <img class='h-6 w-6 object-contain object-left' src={toAssetPath(comboBadge(type))} />,
	Sync: ({ type }: { type: SyncType }) => <img class='h-6 w-6 object-contain object-left' src={toAssetPath(syncBadge(type))} />,
	Rank: ({ type }: { type: RankType }) => <img class='h-6 w-15 object-contain object-left' src={toAssetPath(rankBadge(type))} />,
	DXS: ({ acc }: { acc: number }) => <img class='h-6 w-11 object-contain' src={toAssetPath(dxsBadge(acc))} />,
	SongType: ({ type }: { type: MusicType }) => {
		if (type === 'STD')
			return <img class='h-4 top-0 right-0 absolute' src={toAssetPath('infoicon/UI_MSS_Infoicon_StandardMode')} />;
		if (type === 'DX')
			return <img class='h-4 top-0 right-0 absolute' src={toAssetPath('infoicon/UI_MSS_Infoicon_DeluxeMode')} />;
		return <></>;
	},
};
