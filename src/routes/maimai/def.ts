import type { MusicType } from '~/routes/maimai/components/Badge';
import { ComboType, RankType, SyncType } from '~/routes/maimai/components/Badge';

export { ComboType, RankType, SyncType };
export type { MusicType };
export enum Level { BAS, ADV, EXP, MAS, REM, UTG }

export interface Music {
	id: number;
	type: MusicType;
	title: string;
	artist: string;
	bpm: number;

	jacket: string;
	kanji?: string;
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
	[0.0000, 0],
	[10.0000, 1.6],
	[20.0000, 3.2],
	[30.0000, 4.8],
	[40.0000, 6.4],
	[50.0000, 8.0],
	[60.0000, 9.6],
	[70.0000, 11.2],
	[75.0000, 12.0],
	[79.9999, 12.8],
	[80.0000, 13.6],
	[90.0000, 15.2],
	[94.0000, 16.8],
	[96.9999, 17.6],
	[97.0000, 20.0],
	[98.0000, 20.3],
	[98.9999, 20.6],
	[99.0000, 20.8],
	[99.5000, 21.1],
	[99.9999, 21.4],
	[100.0000, 21.6],
	[100.4999, 22.2],
	[100.5000, 22.4],
].reverse());

export function calcRating(baseRating: number, achi: number) {
	achi = Math.min(100.5, achi);
	const baseRt = ratingTable.find(v => v[0] <= achi)![1];
	return baseRating * (Math.min(100.5, achi) / 100) * baseRt | 0;
}
