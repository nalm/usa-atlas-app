export type RegionId =
  | 'new_england'
  | 'mid_atlantic'
  | 'midwest'
  | 'south'
  | 'mountain'
  | 'pacific';

export type StateType = '주(State)' | '커먼웰스(Commonwealth)' | '연방직할구(D.C.)';

export type Lens = 'none' | 'capitals' | 'era' | 'belts' | 'korea' | 'electoral';

export type PoliticalLean = '민주당 우세 (Blue State)' | '공화당 우세 (Red State)' | '핵심 경합주 (Swing State)';

export interface RegionInfo {
  id: RegionId;
  number: number;
  nameKo: string;
  nameEn: string;
  subRegionsSummary: string;
  fullTitle: string;
  description: string;
  historicalContext: string;
  economicContext: string;
  themeColor: string;
  fillColor: string;
  activeFillColor: string;
  strokeColor: string;
  badgeBg: string;
  badgeText: string;
  statePostalCodes: string[];
}

export interface CityItem {
  id: string;
  nameKo: string;
  nameEn: string;
  role: 'capital_largest' | 'capital' | 'major';
  populationMan: number;
  populationText: string; // 예: '약 388만', '약 5.5만', '약 8천'
  coord: [number, number]; // [lng, lat]
  note: string;
  landmarks?: string[];
}

export interface FamousPerson {
  name: string;
  nameEn: string;
  era: string;
  role: string;
  connectionType: '출생·성장' | '정치·건국' | '산업·혁신' | '문화·시민운동';
  description: string;
}

export interface KoreanHistoryLink {
  category: '독립운동·외교 사적' | '초기 이민·개척사' | '현대 한인타운·커뮤니티' | '한국 기업·산업 거점' | '역사·자연유산';
  title: string;
  year: string;
  description: string;
  diasporaStep?: number;
}

export interface StateInfo {
  id: string; // 소문자 우편약어 예: 'ca', 'ny', 'tx', 'dc'
  postal: string; // 대문자 우편약어 예: 'CA', 'NY', 'TX', 'DC'
  nameKo: string; // 예: '캘리포니아주', '뉴욕주', '워싱턴 D.C.'
  shortNameKo: string; // 지도 라벨용 예: '캘리포니아', '뉴욕', '워싱턴 D.C.'
  nameEn: string; // 예: 'California'
  regionId: RegionId;
  type: StateType;
  statehoodOrder: number; // 1~50 (워싱턴 D.C.는 0)
  statehoodYear: number; // 연방 가입 연도 (예: 1850)
  statehoodEraId: 'colonies13' | 'expansion' | 'civil_west' | 'modern50';
  nicknameKo: string; // 예: '골든 스테이트 (The Golden State)'
  slogan: string; // 핵심 캐치프레이즈
  capitalKo: string; // 주도 한글명
  capitalEn: string; // 주도 영문명
  capitalPopText: string; // 예: '약 53.6만'
  largestCityKo: string; // 최대도시 한글명
  largestCityEn: string; // 최대도시 영문명
  largestCityPopText: string; // 예: '약 388만'
  isCapitalLargest: boolean; // ★ 골드 스타 여부 (주도=최대도시)
  capitalStory: string; // 주도 선정 배경 및 최대도시와의 관계 해설
  coord: [number, number]; // 주 대표 좌표 [lng, lat]
  populationMan: number; // 주 전체 인구 (만 명 단위)
  populationText: string; // 예: '약 3,897만 명'
  areaKm2: number; // 면적 km²
  gdpPerCapitaUsd: number; // 1인당 GDP ($)
  electoralVotes: number; // 대선 선거인단 수 (총 538명)
  politicalLean: PoliticalLean;
  economicBelts: string[]; // 소속 경제·산업 벨트
  cities: CityItem[];
  historicalRoleSummary: string;
  historicalEvents: {
    era: string;
    title: string;
    detail: string;
  }[];
  famousPeople: FamousPerson[];
  characteristicsSummary: string;
  keyIndustries: string[];
  landmarks: string[];
  nationalParksAndHeritage?: string[];
  specialtyAndCulture: string[];
  koreanHistory?: KoreanHistoryLink[];
}

export interface StatehoodEra {
  id: 'colonies13' | 'expansion' | 'civil_west' | 'modern50';
  name: string;
  period: string;
  description: string;
  highlightNote: string;
  stateIds: string[];
}

export interface EconomicBeltInfo {
  id: string;
  nameKo: string;
  nameEn: string;
  color: string;
  description: string;
  keyIndustries: string;
  stateIds: string[];
  coords: [number, number][];
}

export interface HierarchyLevel {
  level: number;
  titleKo: string;
  titleEn: string;
  subtitle: string;
  koreaComparison: string;
  colorClass: string;
  borderClass: string;
  badgeClass: string;
  units: {
    nameKo: string;
    nameEn: string;
    description: string;
    example: string;
    isSpecial?: boolean;
  }[];
}
