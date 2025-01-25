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

	utage?: {
		kanji: string;
		comment: string;
		dp: boolean;
		fixed: { name: string; value: string }[];
	};

	jacket: string;
}
export interface MusicDetailed extends Music {
	version: string;
	genre: string;
	levels: {
		diff: string;
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
