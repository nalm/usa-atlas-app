// Threads(@nalm/post/DaPFAYzDOEk) Image 2: "어느 주 이름이, 어느 주로 흩어졌나" 18×18 매트릭스 데이터
// 가로줄(Rows): 다른 주의 도시 이름으로 쓰인 '주 이름' (18개)
// 세로줄(Cols): 실제로 그 이름의 도시가 위치한 '소재 주' (18개)

export interface StateNameRow {
  stateNameEn: string;
  stateNameKo: string;
  originStateId: string;
  spreadCount: number;
  highlightType?: 'teal' | 'self';
  targetHostStates: {
    hostStateEn: string;
    hostStateKo: string;
    hostStateId: string;
    cityDetail: string;
    isSelfMatch?: boolean;
  }[];
}

export interface HostStateCol {
  stateEn: string;
  stateKo: string;
  stateId: string;
  hostedCount: number;
}

export const MATRIX_HOST_COLUMNS: HostStateCol[] = [
  { stateEn: 'Illinois', stateKo: '일리노이', stateId: 'il', hostedCount: 5 },
  { stateEn: 'Ohio', stateKo: '오하이오', stateId: 'oh', hostedCount: 4 },
  { stateEn: 'Missouri', stateKo: '미주리', stateId: 'mo', hostedCount: 4 },
  { stateEn: 'Pennsylvania', stateKo: '펜실베이니아', stateId: 'pa', hostedCount: 4 },
  { stateEn: 'New York', stateKo: '뉴욕', stateId: 'ny', hostedCount: 4 },
  { stateEn: 'Minnesota', stateKo: '미네소타', stateId: 'mn', hostedCount: 2 },
  { stateEn: 'Iowa', stateKo: '아이오와', stateId: 'ia', hostedCount: 2 },
  { stateEn: 'Maryland', stateKo: '메릴랜드', stateId: 'md', hostedCount: 2 },
  { stateEn: 'Michigan', stateKo: '미시간', stateId: 'mi', hostedCount: 1 },
  { stateEn: 'Rhode Island', stateKo: '로드아일랜드', stateId: 'ri', hostedCount: 1 },
  { stateEn: 'Texas', stateKo: '텍사스', stateId: 'tx', hostedCount: 1 },
  { stateEn: 'Wisconsin', stateKo: '위스콘신', stateId: 'wi', hostedCount: 1 },
  { stateEn: 'Oklahoma', stateKo: '오클라호마', stateId: 'ok', hostedCount: 1 },
  { stateEn: 'Vermont', stateKo: '버몬트', stateId: 'vt', hostedCount: 1 },
  { stateEn: 'Massachusetts', stateKo: '매사추세츠', stateId: 'ma', hostedCount: 1 },
  { stateEn: 'Indiana', stateKo: '인디애나', stateId: 'in', hostedCount: 1 },
  { stateEn: 'Georgia', stateKo: '조지아', stateId: 'ga', hostedCount: 1 },
  { stateEn: 'North Carolina', stateKo: '노스캐롤라이나', stateId: 'nc', hostedCount: 1 },
];

export const MATRIX_STATE_NAME_ROWS: StateNameRow[] = [
  {
    stateNameEn: 'Wyoming',
    stateNameKo: '와이오밍',
    originStateId: 'wy',
    spreadCount: 5,
    targetHostStates: [
      { hostStateEn: 'Ohio', hostStateKo: '오하이오', hostStateId: 'oh', cityDetail: 'Wyoming, OH (신시내티 북부 교외 주거 도시)' },
      { hostStateEn: 'Pennsylvania', hostStateKo: '펜실베이니아', hostStateId: 'pa', cityDetail: 'Wyoming, PA (서배너 강 유역 와이오밍 계곡에서 유래, 오히려 와이오밍주 이름의 어원!)' },
      { hostStateEn: 'Minnesota', hostStateKo: '미네소타', hostStateId: 'mn', cityDetail: 'Wyoming, MN (미니애폴리스 북동쪽 정착민들이 펜실베이니아 와이오밍에서 이름을 따옴)' },
      { hostStateEn: 'Michigan', hostStateKo: '미시간', stateId: 'mi', hostStateId: 'mi', cityDetail: 'Wyoming, MI (그랜드래피즈 남서쪽 인구 약 7.6만의 중견 도시)' } as any,
      { hostStateEn: 'Rhode Island', hostStateKo: '로드아일랜드', hostStateId: 'ri', cityDetail: 'Wyoming, RI (리치먼드·홉킨턴 경계의 역사적 마을)' },
    ],
  },
  {
    stateNameEn: 'Washington',
    stateNameKo: '워싱턴',
    originStateId: 'wa',
    spreadCount: 5,
    highlightType: 'teal',
    targetHostStates: [
      { hostStateEn: 'Illinois', hostStateKo: '일리노이', hostStateId: 'il', cityDetail: 'Washington, IL (피오리아 동쪽 도시, 초대 대통령 조지 워싱턴 기림)' },
      { hostStateEn: 'Missouri', hostStateKo: '미주리', hostStateId: 'mo', cityDetail: 'Washington, MO (미주리강 유역의 역사적 강변 도시)' },
      { hostStateEn: 'Pennsylvania', hostStateKo: '펜실베이니아', hostStateId: 'pa', cityDetail: 'Washington, PA (피츠버그 남서쪽, 워싱턴 앤드 제퍼슨 칼리지 소재지)' },
      { hostStateEn: 'Iowa', hostStateKo: '아이오와', hostStateId: 'ia', cityDetail: 'Washington, IA (아이오와 남동부 워싱턴 카운티의 중심 도시)' },
      { hostStateEn: 'North Carolina', hostStateKo: '노스캐롤라이나', hostStateId: 'nc', cityDetail: 'Washington, NC (1776년 미국 최초로 조지 워싱턴의 이름을 딴 도시, 일명 "Original Washington")' },
    ],
  },
  {
    stateNameEn: 'Nevada',
    stateNameKo: '네바다',
    originStateId: 'nv',
    spreadCount: 4,
    targetHostStates: [
      { hostStateEn: 'Ohio', hostStateKo: '오하이오', hostStateId: 'oh', cityDetail: 'Nevada, OH (와이언도트 카운티의 소도시)' },
      { hostStateEn: 'Missouri', hostStateKo: '미주리', hostStateId: 'mo', cityDetail: 'Nevada, MO (버논 카운티청 소재지, 현지에서는 "너베이다(Nuh-VAY-duh)"로 발음)' },
      { hostStateEn: 'Iowa', hostStateKo: '아이오와', hostStateId: 'ia', cityDetail: 'Nevada, IA (에임스 동쪽 스토리 카운티청 소재지)' },
      { hostStateEn: 'Texas', hostStateKo: '텍사스', hostStateId: 'tx', cityDetail: 'Nevada, TX (댈러스 북동쪽 콜린 카운티 소재 도시)' },
    ],
  },
  {
    stateNameEn: 'California',
    stateNameKo: '캘리포니아',
    originStateId: 'ca',
    spreadCount: 3,
    targetHostStates: [
      { hostStateEn: 'Missouri', hostStateKo: '미주리', hostStateId: 'mo', cityDetail: 'California, MO (1849년 골드러시 열풍 당시 지어진 미주리 중부 도시)' },
      { hostStateEn: 'Pennsylvania', hostStateKo: '펜실베이니아', hostStateId: 'pa', cityDetail: 'California, PA (피츠버그 남쪽 모논가헬라 강변 대학 타운)' },
      { hostStateEn: 'Maryland', hostStateKo: '메릴랜드', hostStateId: 'md', cityDetail: 'California, MD (체서피크만 인근 패턱선트 해군 항공기지 배후 도시)' },
    ],
  },
  {
    stateNameEn: 'Oregon',
    stateNameKo: '오리건',
    originStateId: 'or',
    spreadCount: 3,
    targetHostStates: [
      { hostStateEn: 'Illinois', hostStateKo: '일리노이', hostStateId: 'il', cityDetail: 'Oregon, IL (록 강변에 위치한 오글 카운티청 소재지)' },
      { hostStateEn: 'Ohio', hostStateKo: '오하이오', hostStateId: 'oh', cityDetail: 'Oregon, OH (톨레도 동쪽 이리호 연안의 산업·항만 도시)' },
      { hostStateEn: 'Wisconsin', hostStateKo: '위스콘신', hostStateId: 'wi', cityDetail: 'Oregon, WI (주도 매디슨 남쪽의 주거 중심 도시)' },
    ],
  },
  {
    stateNameEn: 'Kansas',
    stateNameKo: '캔자스',
    originStateId: 'ks',
    spreadCount: 2,
    targetHostStates: [
      { hostStateEn: 'Illinois', hostStateKo: '일리노이', hostStateId: 'il', cityDetail: 'Kansas, IL (일리노이 동부 에드거 카운티의 철도 정착촌)' },
      { hostStateEn: 'Oklahoma', hostStateKo: '오클라호마', hostStateId: 'ok', cityDetail: 'Kansas, OK (오클라호마 북동부 델라웨어 카운티의 타운)' },
    ],
  },
  {
    stateNameEn: 'Florida',
    stateNameKo: '플로리다',
    originStateId: 'fl',
    spreadCount: 2,
    targetHostStates: [
      { hostStateEn: 'New York', hostStateKo: '뉴욕', hostStateId: 'ny', cityDetail: 'Florida, NY (오렌지 카운티 소재, 국무장관 윌리엄 수어드의 고향)' },
      { hostStateEn: 'Massachusetts', stateKo: '매사추세츠', hostStateKo: '매사추세츠', hostStateId: 'ma', cityDetail: 'Florida, MA (버크셔 산맥의 고지대 타운 — 역설적으로 매사추세츠에서 가장 눈이 많이 오는 곳 중 하나!)' } as any,
    ],
  },
  {
    stateNameEn: 'Ohio',
    stateNameKo: '오하이오',
    originStateId: 'oh',
    spreadCount: 2,
    targetHostStates: [
      { hostStateEn: 'Illinois', hostStateKo: '일리노이', hostStateId: 'il', cityDetail: 'Ohio, IL (오하이오 출신 정착민들이 세운 일리노이 북부 타운)' },
      { hostStateEn: 'Indiana', hostStateKo: '인디애나', hostStateId: 'in', cityDetail: 'Ohio Township / Ohio County, IN (오하이오강 유역 인디애나 남동부)' },
    ],
  },
  {
    stateNameEn: 'Texas',
    stateNameKo: '텍사스',
    originStateId: 'tx',
    spreadCount: 2,
    targetHostStates: [
      { hostStateEn: 'Maryland', hostStateKo: '메릴랜드', hostStateId: 'md', cityDetail: 'Texas, MD (볼티모어 카운티 코키스빌 인근의 역사적 석회석 광산 지구)' },
      { hostStateEn: 'Georgia', hostStateKo: '조지아', hostStateId: 'ga', cityDetail: 'Texas, GA (조지아 서부 앨라배마 주 경계 인근 커뮤니티)' },
    ],
  },
  {
    stateNameEn: 'Delaware',
    stateNameKo: '델라웨어',
    originStateId: 'de',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Ohio', hostStateKo: '오하이오', hostStateId: 'oh', cityDetail: 'Delaware, OH (주도 콜럼버스 북쪽, 제19대 대통령 러더퍼드 헤이스의 출생지)' },
    ],
  },
  {
    stateNameEn: 'Indiana',
    stateNameKo: '인디애나',
    originStateId: 'in',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Pennsylvania', hostStateKo: '펜실베이니아', hostStateId: 'pa', cityDetail: 'Indiana, PA (인디애나 펜실베이니아 주립대(IUP) 소재지, 영화배우 지미 스튜어트의 고향)' },
    ],
  },
  {
    stateNameEn: 'Louisiana',
    stateNameKo: '루이지애나',
    originStateId: 'la',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Missouri', hostStateKo: '미주리', hostStateId: 'mo', cityDetail: 'Louisiana, MO (미시시피강변의 역사적 항구 소도시)' },
    ],
  },
  {
    stateNameEn: 'Virginia',
    stateNameKo: '버지니아',
    originStateId: 'va',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Minnesota', hostStateKo: '미네소타', hostStateId: 'mn', cityDetail: 'Virginia, MN (메사비 철광산 지대 중심 도시, 버지니아 출신 목재업자들이 명명)' },
    ],
  },
  {
    stateNameEn: 'Georgia',
    stateNameKo: '조지아',
    originStateId: 'ga',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Vermont', hostStateKo: '버몬트', hostStateId: 'vt', cityDetail: 'Georgia, VT (섐플레인 호수 연안 프랭클린 카운티 타운, 영국 국왕 조지 3세에서 유래)' },
    ],
  },
  {
    stateNameEn: 'Vermont',
    stateNameKo: '버몬트',
    originStateId: 'vt',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'Illinois', hostStateKo: '일리노이', hostStateId: 'il', cityDetail: 'Vermont, IL (버몬트 출신 정착민들이 일리노이 서부에 세운 마을)' },
    ],
  },
  {
    stateNameEn: 'Maryland',
    stateNameKo: '메릴랜드',
    originStateId: 'md',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'New York', hostStateKo: '뉴욕', hostStateId: 'ny', cityDetail: 'Maryland, NY (뉴욕주 중부 오체고 카운티의 타운)' },
    ],
  },
  {
    stateNameEn: 'Alabama',
    stateNameKo: '앨라배마',
    originStateId: 'al',
    spreadCount: 1,
    targetHostStates: [
      { hostStateEn: 'New York', hostStateKo: '뉴욕', hostStateId: 'ny', cityDetail: 'Alabama, NY (버팔로 동쪽 제네시 카운티 타운)' },
    ],
  },
  {
    stateNameEn: 'New York',
    stateNameKo: '뉴욕',
    originStateId: 'ny',
    spreadCount: 1,
    highlightType: 'self',
    targetHostStates: [
      {
        hostStateEn: 'New York',
        hostStateKo: '뉴욕',
        hostStateId: 'ny',
        cityDetail: 'New York City, NY (★ 유일하게 주 이름과 도시 소재 주가 일치하는 메트로폴리스! 인구 약 848만 명)',
        isSelfMatch: true,
      },
    ],
  },
];

export interface ConfusingNameCase {
  title: string;
  badge: string;
  summary: string;
  leftItem: { name: string; stateId: string; desc: string };
  rightItem: { name: string; stateId: string; desc: string };
}

export const CONFUSING_NAME_CASES: ConfusingNameCase[] = [
  {
    title: '워싱턴 D.C. vs 워싱턴주 (Washington)',
    badge: '동서양단 4,000km 거리',
    summary: '미국 초대 대통령 조지 워싱턴의 이름을 딴 연방 수도(동부)와 태평양 연안의 주(북서부)로, 북미 대륙의 정반대 끝에 위치합니다.',
    leftItem: {
      name: '워싱턴 D.C. (District of Columbia)',
      stateId: 'dc',
      desc: '동부 메릴랜드·버지니아 사이의 연방직할구(수도). 백악관·연방의회 소재지 (인구 약 70.2만).',
    },
    rightItem: {
      name: '워싱턴주 (State of Washington)',
      stateId: 'wa',
      desc: '태평양 북서부 끝의 주(주도: 올림피아, 최대도시: 시애틀). 원래 컬럼비아 준주로 불리다 D.C.와의 혼동을 피하려 오히려 워싱턴주로 개명해 더 헷갈리게 된 사례.',
    },
  },
  {
    title: '캔자스시티(미주리주) vs 캔자스주 (Kansas City)',
    badge: '주 경계선 위의 쌍둥이 도시',
    summary: '가장 유명한 대도시 "캔자스시티(KC)"는 정작 캔자스주가 아니라 옆 동네 미주리주(Missouri)의 최대도시입니다.',
    leftItem: {
      name: '캔자스시티, 미주리 (Kansas City, MO)',
      stateId: 'mo',
      desc: '인구 약 51.6만의 미주리주 최대도시. NFL 캔자스시티 치프스 홈구장과 재즈·바비큐의 본고장 (캔자스강과 미주리강 합류점에서 유래, 캔자스주보다 먼저 명명됨).',
    },
    rightItem: {
      name: '캔자스주 & 캔자스시티, 캔자스 (KS)',
      stateId: 'ks',
      desc: '캔자스주의 주도는 토피카(12.5만), 최대도시는 위치토(40.1만). 주 경계 건너편에도 동명의 위성도시 Kansas City, KS(약 15만)가 맞붙어 있음.',
    },
  },
  {
    title: '뉴욕주(State) vs 뉴욕시(NYC)',
    badge: '주도 올버니 vs 세계 경제 수도',
    summary: '매트릭스에서 유일하게 주 이름과 도시 이름이 자기 주 안에서 겹치는 사례이지만, 뉴욕주의 주도는 뉴욕시가 아닙니다.',
    leftItem: {
      name: '뉴욕시 (New York City, NY)',
      stateId: 'ny',
      desc: '인구 약 848만 명의 미국 최대도시(맨해튼·브루클린·퀸스·브롱크스·스태튼아일랜드 5개 보로). 주 남단 해안에 위치.',
    },
    rightItem: {
      name: '뉴욕주 & 주도 올버니 (Albany, NY)',
      stateId: 'ny',
      desc: '오대호·나이아가라 폭포(버팔로)까지 뻗은 광대한 주. 주도는 허드슨강을 따라 240km 북쪽에 위치한 올버니(약 10.1만).',
    },
  },
  {
    title: '포틀랜드(오리건주) vs 포틀랜드(메인주)',
    badge: '동부 원조 vs 서부 최대도시',
    summary: '오리건주 최대도시 포틀랜드는 동부 메인주 최대도시 포틀랜드 출신 개척자가 동전 던지기(Portland Penny)로 이겨 붙인 이름입니다.',
    leftItem: {
      name: '포틀랜드, 오리건 (Portland, OR)',
      stateId: 'or',
      desc: '인구 약 63.6만의 태평양 북서부 친환경·반도체·스포츠웨어(나이키) 중심 대도시.',
    },
    rightItem: {
      name: '포틀랜드, 메인 (Portland, ME)',
      stateId: 'me',
      desc: '인구 약 6.8만이지만 메인주 최대도시이자 뉴잉글랜드의 유서 깊은 대서양 항구도시.',
    },
  },
  {
    title: '찰스턴(사우스캐롤라이나) vs 찰스턴(웨스트버지니아)',
    badge: '남부 해안 고도 vs 애팔래치아 주도',
    summary: '한글·영문 표기(Charleston)가 완전히 동일한 두 주요 도시입니다.',
    leftItem: {
      name: '찰스턴, 사우스캐롤라이나 (Charleston, SC)',
      stateId: 'sc',
      desc: '인구 약 15.8만으로 사우스캐롤라이나 최대도시(주도는 컬럼비아 14.5만). 남북전쟁 발발지(섬터 요새)이자 대서양 역사 항구.',
    },
    rightItem: {
      name: '찰스턴, 웨스트버지니아 (Charleston, WV)',
      stateId: 'wv',
      desc: '인구 약 4.6만으로 웨스트버지니아의 주도이자 최대도시(★ 골드 스타).',
    },
  },
];
