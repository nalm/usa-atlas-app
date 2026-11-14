import { RegionId, RegionInfo, StateInfo, CityItem } from '../types/atlas';
import { REGIONS, STATEHOOD_ERAS, ECONOMIC_BELTS, KOREAN_DIASPORA_STEPS, HIERARCHY_LEVELS } from './regionsAndEras';
import { STATES_EAST } from './statesEast';
import { STATES_CENTRAL_SOUTH } from './statesCentralSouth';
import { STATES_WEST_PACIFIC } from './statesWestPacific';
import { MATRIX_HOST_COLUMNS, MATRIX_STATE_NAME_ROWS, CONFUSING_NAME_CASES } from './stateNameMatrix';

export {
  REGIONS,
  STATEHOOD_ERAS,
  ECONOMIC_BELTS,
  KOREAN_DIASPORA_STEPS,
  HIERARCHY_LEVELS,
  MATRIX_HOST_COLUMNS,
  MATRIX_STATE_NAME_ROWS,
  CONFUSING_NAME_CASES,
};

export const ALL_STATES: StateInfo[] = [
  ...STATES_EAST,
  ...STATES_CENTRAL_SOUTH,
  ...STATES_WEST_PACIFIC,
];

export const STATE_MAP: Record<string, StateInfo> = ALL_STATES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, StateInfo>
);

export const POSTAL_TO_ID_MAP: Record<string, string> = ALL_STATES.reduce(
  (acc, item) => {
    acc[item.postal] = item.id;
    return acc;
  },
  {} as Record<string, string>
);

export const REGION_MAP: Record<RegionId, RegionInfo> = REGIONS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<RegionId, RegionInfo>
);

export interface FlatCityItem extends CityItem {
  stateId: string;
  statePostal: string;
  stateNameKo: string;
  regionId: RegionId;
}

export const ALL_CITIES: FlatCityItem[] = ALL_STATES.flatMap((state) =>
  state.cities.map((city) => ({
    ...city,
    stateId: state.id,
    statePostal: state.postal,
    stateNameKo: state.nameKo,
    regionId: state.regionId,
  }))
);

// 소면적 밀집 북동부 주/지구 ID (인출선 Callout 처리 대상)
export const DENSE_STATE_IDS = new Set([
  'vt',
  'nh',
  'ma',
  'ri',
  'ct',
  'nj',
  'de',
  'md',
  'dc',
]);

// 북동부 소면적 주 우측 여백 인출선(Callout) 좌표 배치 (Threads 이미지 1 레이아웃 반영)
export const NORTHEAST_CALLOUTS: {
  id: string;
  boxX: number;
  boxY: number;
}[] = [
  { id: 'vt', boxX: 855, boxY: 68 },
  { id: 'nh', boxX: 855, boxY: 108 },
  { id: 'ma', boxX: 855, boxY: 148 },
  { id: 'ri', boxX: 855, boxY: 188 },
  { id: 'ct', boxX: 855, boxY: 228 },
  { id: 'nj', boxX: 855, boxY: 268 },
  { id: 'de', boxX: 855, boxY: 308 },
  { id: 'md', boxX: 855, boxY: 348 },
  { id: 'dc', boxX: 855, boxY: 388 },
];

// 순위 계산 맵 (1 ~ 51위)
export const POPULATION_RANK: Record<string, number> = [...ALL_STATES]
  .sort((a, b) => b.populationMan - a.populationMan)
  .reduce((acc, item, idx) => {
    acc[item.id] = idx + 1;
    return acc;
  }, {} as Record<string, number>);

export const AREA_RANK: Record<string, number> = [...ALL_STATES]
  .sort((a, b) => b.areaKm2 - a.areaKm2)
  .reduce((acc, item, idx) => {
    acc[item.id] = idx + 1;
    return acc;
  }, {} as Record<string, number>);

export const GDP_RANK: Record<string, number> = [...ALL_STATES]
  .sort((a, b) => b.gdpPerCapitaUsd - a.gdpPerCapitaUsd)
  .reduce((acc, item, idx) => {
    acc[item.id] = idx + 1;
    return acc;
  }, {} as Record<string, number>);

export const ELECTORAL_RANK: Record<string, number> = [...ALL_STATES]
  .sort((a, b) => b.electoralVotes - a.electoralVotes || b.populationMan - a.populationMan)
  .reduce((acc, item, idx) => {
    acc[item.id] = idx + 1;
    return acc;
  }, {} as Record<string, number>);

// 비교함 추천 프리셋
export const COMPARE_PRESETS: { label: string; ids: string[]; desc: string }[] = [
  {
    label: '미국 3대 메트로폴리스 주 (CA·TX·NY)',
    ids: ['ca', 'tx', 'ny'],
    desc: '인구·경제·선거인단 최상위 3대 거점 주 비교',
  },
  {
    label: '주도 ≠ 최대도시 대표 주 (NY·CA·IL)',
    ids: ['ny', 'ca', 'il'],
    desc: '올버니 vs 뉴욕, 새크라멘토 vs LA, 스프링필드 vs 시카고',
  },
  {
    label: '주도 = 최대도시 대표 주 ★ (AZ·GA·MA)',
    ids: ['az', 'ga', 'ma'],
    desc: '피닉스, 애틀랜타, 보스턴 등 주도가 곧 최대도시인 골드스타 주',
  },
  {
    label: '대선 핵심 승부처 경합주 (PA·GA·MI)',
    ids: ['pa', 'ga', 'mi'],
    desc: '미국 대통령 선거의 당락을 가르는 러스트벨트·선벨트 스윙 스테이트',
  },
  {
    label: 'K-반도체·배터리·모빌리티 벨트 (TX·GA·AZ)',
    ids: ['tx', 'ga', 'az'],
    desc: '삼성 테일러, 현대차 메타플랜트·배터리, TSMC/소부장 진출 거점 비교',
  },
  {
    label: '워싱턴주(WA) vs 워싱턴 D.C. vs 버지니아(VA)',
    ids: ['wa', 'dc', 'va'],
    desc: '서부 태평양 연안 워싱턴주와 동부 연방 수도 워싱턴 D.C. 수도권 완벽 구분',
  },
];

// 숫자 포맷 유틸리티
export function formatPop(popMan: number): string {
  if (popMan >= 1000) {
    const cheon = Math.floor(popMan / 1000);
    const baek = Math.round(popMan % 1000);
    return `약 ${cheon},${baek.toString().padStart(3, '0')}만 명`;
  }
  return `약 ${popMan.toLocaleString('ko-KR')}만 명`;
}

export function formatArea(areaKm2: number): string {
  return `${areaKm2.toLocaleString('ko-KR')} km²`;
}

export function formatGdp(gdpUsd: number): string {
  return `$${gdpUsd.toLocaleString('ko-KR')}`;
}
