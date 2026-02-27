import type { InterestTagId } from '../types/user';

export interface InterestTag {
  id: InterestTagId;
  ko: string;
  ja: string;
}

export const INTEREST_TAGS: InterestTag[] = [
  { id: 'travel', ko: '여행', ja: '旅行' },
  { id: 'food', ko: '맛집', ja: 'グルメ' },
  { id: 'cafe', ko: '카페', ja: 'カフェ' },
  { id: 'music', ko: '음악', ja: '音楽' },
  { id: 'kpop', ko: 'K-POP', ja: 'K-POP' },
  { id: 'jpop', ko: 'J-POP', ja: 'J-POP' },
  { id: 'anime', ko: '애니메이션', ja: 'アニメ' },
  { id: 'movie', ko: '영화', ja: '映画' },
  { id: 'gaming', ko: '게임', ja: 'ゲーム' },
  { id: 'fashion', ko: '패션', ja: 'ファッション' },
  { id: 'sports', ko: '스포츠', ja: 'スポーツ' },
  { id: 'language', ko: '언어교환', ja: '言語交換' },
  { id: 'cooking', ko: '요리', ja: '料理' },
  { id: 'photo', ko: '사진', ja: '写真' },
  { id: 'reading', ko: '독서', ja: '読書' },
];

export const INTEREST_TAG_MAP = Object.fromEntries(
  INTEREST_TAGS.map((tag) => [tag.id, tag]),
) as Record<InterestTagId, InterestTag>;
