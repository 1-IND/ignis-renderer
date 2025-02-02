import type { MusicType } from '~/components/maimai/Badge';
import { ComboType, RankType, SyncType } from '~/components/maimai/Badge';

export { ComboType, RankType, SyncType };
export type { MusicType };
export enum Level { BAS, ADV, EXP, MAS, REM, UTG, UTG_TOTAL }
export enum TitleType { Normal, Bronze, Silver, Gold, Rainbow }

export interface MusicData {
	id: number;
	type: MusicType;
	title: string;
	artist: string;
	version: { id: number; name: string };
	genre: { id: number; name: string };
	bpm: number;
	levels: LevelData[];
	utage?: UtageData;

	jacketImg: string;
	versionImg: string;
}
export interface LevelData {
	diff: string;
	rating: number;
	charter: string;
	notes: {
		tap: number;
		hold: number;
		slide: number;
		touch: number;
		break: number;
		total: number;
	};
}
export interface UtageData {
	kanji: string;
	comment: string;
	dp: boolean;
	fixed: { name: string; value: string }[];
}

export interface Score {
	music: MusicData;

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
	title: { type: TitleType; text: string };

	iconImg: string;
	nameplateImg: string;
	frameImg: string;
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

const _ = (name: string, bg: string, fg: string, bgBadges: string) => ({ name, bg, fg, bgBadges }) as const;
export const lvlData = [
	_('Basic', 'bg-green-5', 'text-white', 'bg-green-6'),
	_('Advanced', 'bg-yellow-4', 'text-white', 'bg-yellow-5'),
	_('Expert', 'bg-red-5', 'text-white', 'bg-red-6'),
	_('Master', 'bg-purple-7', 'text-white', 'bg-purple-9'),
	_('Re:MASTER', 'bg-white', 'text-gray-7', 'bg-gray-3'),
	_('U·TA·GE', 'bg-pink-4', 'text-white', 'bg-pink-5'), // TODO: kanji & dp display
	_('U·TA·GE', 'bg-pink-5', 'text-white', ''), // TODO: kanji & dp display
] as const;

export function sumLevels(l: LevelData, r: LevelData): LevelData {
	if (l.diff !== r.diff) throw new Error('diff mismatch');
	if (l.rating !== r.rating) throw new Error('rating mismatch');
	if (l.charter !== r.charter) throw new Error('charter mismatch');
	return {
		diff: l.diff,
		rating: l.rating,
		charter: l.charter,
		notes: {
			total: l.notes.total + r.notes.total,
			tap: l.notes.tap + r.notes.tap,
			hold: l.notes.hold + r.notes.hold,
			slide: l.notes.slide + r.notes.slide,
			touch: l.notes.touch + r.notes.touch,
			break: l.notes.break + r.notes.break,
		},
	};
}
