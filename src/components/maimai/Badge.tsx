import clsx from 'clsx';
import { Match, Show, Switch } from 'solid-js';

import type { UtageData } from './def';
import { toAssetPath } from './def';

export type MusicType = 'STD' | 'DX' | 'UTG';
export enum ComboType { Blank, FC, FCp, AP, APp }
export enum SyncType { Blank, FS, FSp, FSD, FSDp, SP }
export enum RankType { D, C, B, BB, BBB, A, AA, AAA, S, Sp, SS, SSp, SSS, SSSp }

export const dxs = [0.85, 0.90, 0.93, 0.95, 0.97];
export const toDXStar = (acc: number) => dxs.findLastIndex(dx => acc >= dx) + 1;

export const rankBadge = (rank: RankType) => `prism/rank/UI_GAM_Rank_${RankType[rank]}`;
export const rankBadgeL = (rank: RankType) => `prism/rank/UI_TTR_Rank_${RankType[rank]}`;
export const comboBadge = (combo: ComboType) => `common/lamp/UI_MSS_MBase_Icon_${ComboType[combo]}`;
export const syncBadge = (sync: SyncType) => `common/lamp/UI_MSS_MBase_Icon_${SyncType[sync]}`;
export const dxsBadge = (star: number) => `common/lamp/UI_GAM_Gauge_DXScoreIcon_0${star}`;

function DXStar(p: { type: number; class?: string }) {
	return (
		<Show when={p.type >= 1 && p.type <= 5} fallback={<span class={p.class} />}>
			<img class={p.class} src={toAssetPath(dxsBadge(p.type))} />
		</Show>
	);
}
export default {
	Combo: (p: { type: ComboType; class?: string }) => <img class={p.class} src={toAssetPath(comboBadge(p.type))} />,
	Sync: (p: { type: SyncType; class?: string }) => <img class={p.class} src={toAssetPath(syncBadge(p.type))} />,
	Rank: (p: { type: RankType; class?: string }) => <img class={p.class} src={toAssetPath(rankBadge(p.type))} />,
	RankL: (p: { type: RankType; class?: string }) => <img class={p.class} src={toAssetPath(rankBadgeL(p.type))} />,
	DXStar,
	DXS: (p: { acc: number; class?: string }) => <DXStar class={p.class} type={toDXStar(p.acc)} />,
	SongType: (p: { type: MusicType; utage?: UtageData; class?: string }) => {
		return (
			<Switch>
				<Match when={p.type === 'STD'}><img class={p.class} src={toAssetPath('common/infoicon/UI_MSS_Infoicon_StandardMode')} /></Match>
				<Match when={p.type === 'DX'}><img class={p.class} src={toAssetPath('common/infoicon/UI_MSS_Infoicon_DeluxeMode')} /></Match>
				<Match when={p.type === 'UTG'}>
					<div class={clsx('flex', p.class)}>
						<div class='relative z-1'>
							<img class='h-full' src={toAssetPath('common/infoicon/UI_MSS_Infoicon_Utage')} />
							<div class='absolute left-1/2 top-1/2 transform-translate--50% text-size-60% text-white font-text'>{p.utage?.kanji}</div>
						</div>
						<Show when={p.utage?.dp}>
							<img class='ml--4' src={toAssetPath('common/infoicon/UI_MSS_Infoicon_Utage_2P')} />
						</Show>
					</div>
				</Match>
			</Switch>
		);
	},
};
