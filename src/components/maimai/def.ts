import type { MusicType } from '~/components/maimai/Badge';
import { ComboType, RankType, SyncType } from '~/components/maimai/Badge';

export { ComboType, RankType, SyncType };
export type { MusicType };
export enum Level { BAS, ADV, EXP, MAS, REM, UTG }

export interface Music {
	id: number;
	type: MusicType;
	title: string;
	artist: string;
	bpm: number;

	version: Version;
	genre: string;
	levels: {
		diff: Diff;
		rating: number;
		charter: string;
		notes: {
			tap: number;
			hold: number;
			slide: number;
			touch: number;
			break: number;
		};
	}[];
	utage?: {
		kanji: string;
		comment: string;
		dp: boolean;
		fixed: { name: string; value: string }[];
	};

	jacket: string;
}
export interface Chart {
	rating: number;
	notes: number;
}

export interface Score {
	music: Music;
	chart: Chart;

	level: Level;
	acc: number;
	dxs: number;

	combo: ComboType;
	sync: SyncType;
	rank: RankType;
}

export interface User {
	name: string;
	rating: number;
}

export interface Best50 {
	b35: Score[];
	b15: Score[];
}

export const ratingTable = Object.freeze([
	[0, 0],
	[100000, 1.6],
	[200000, 3.2],
	[300000, 4.8],
	[400000, 6.4],
	[500000, 8.0],
	[600000, 9.6],
	[700000, 11.2],
	[750000, 12.0],
	[799999, 12.8],
	[800000, 13.6],
	[900000, 15.2],
	[940000, 16.8],
	[969999, 17.6],
	[970000, 20.0],
	[980000, 20.3],
	[989999, 20.6],
	[990000, 20.8],
	[995000, 21.1],
	[999999, 21.4],
	[1000000, 21.6],
	[1004999, 22.2],
	[1005000, 22.4],
].reverse());

export function calcRating(baseRating: number, achi: number) {
	achi = Math.min(1005000, achi);
	const baseRt = ratingTable.find(v => v[0] <= achi)![1];
	return baseRating * (Math.min(1005000, achi) / 1000000) * baseRt | 0;
}

export enum Version {
	maimai,
	maimaiPLUS,
	GreeN,
	GreeNPLUS,
	ORANGE,
	ORANGEPLUS,
	PiNK,
	PiNKPLUS,
	MURASAKi,
	MURASAKiPLUS,
	MiLK,
	MiLKPLUS,
	FiNALE,
	maimaDX,
	maimaDXPLUS,
	Splash,
	SplashPLUS,
	UNiVERSE,
	UNiVERSEPLUS,
	FESTiVAL,
	FESTiVALPLUS,
	BUDDiES,
	BUDDiESPLUS,
	PRiSM,
}

export enum Diff {
	Level0,
	Level1,
	Level2,
	Level3,
	Level4,
	Level5,
	Level6,
	Level7,
	Level7P,
	Level8,
	Level8P,
	Level9,
	Level9P,
	Level10,
	Level10P,
	Level11,
	Level11P,
	Level12,
	Level12P,
	Level13,
	Level13P,
	Level14,
	Level14P,
	Level15,
	Level15P,
}
