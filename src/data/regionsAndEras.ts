import {
  RegionInfo,
  StatehoodEra,
  EconomicBeltInfo,
  HierarchyLevel,
} from '../types/atlas';

export const REGIONS: RegionInfo[] = [
  {
    id: 'new_england',
    number: 1,
    nameKo: '뉴잉글랜드',
    nameEn: 'New England',
    subRegionsSummary: '북동부 대서양 연안 6개 주 (청교도 정착 · 미국 독립혁명 발상지)',
    fullTitle: '제1권역 · 뉴잉글랜드 (New England)',
    description:
      '1620년 메이플라워호 청교도들이 정착한 미국 역사의 출발점이자, 보스턴 차 사건과 렉싱턴-콩코드 전투 등 독립혁명의 불씨가 타오른 지역입니다. 하버드·MIT·예일·브라운·다트머스 등 세계 최고 수준의 아이비리그 교육·바이오·첨단 연구 생태계가 밀집해 있습니다.',
    historicalContext:
      '영국 식민지 시대의 타운미팅(직접민주주의) 전통과 노예제 폐지 운동, 초기 방직 산업혁명을 이끌었습니다.',
    economicContext:
      '보스턴·케임브리지를 중심으로 한 글로벌 바이오·제약·로보틱스·고등교육·자산운용 허브.',
    themeColor: '#2563EB',
    fillColor: '#DBEAFE',
    activeFillColor: '#60A5FA',
    strokeColor: '#1D4ED8',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    statePostalCodes: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT'],
  },
  {
    id: 'mid_atlantic',
    number: 2,
    nameKo: '중부대서양',
    nameEn: 'Mid-Atlantic',
    subRegionsSummary: '뉴욕 · 필라델피아 · 워싱턴 D.C. 메가로폴리스 심장부 (5개 주 + D.C.)',
    fullTitle: '제2권역 · 중부대서양 (Mid-Atlantic)',
    description:
      '세계 경제·금융·문화의 수도 뉴욕시(약 848만), 미국 독립선언과 헌법 제정의 고도 필라델피아(약 157만), 그리고 연방 수도 워싱턴 D.C.(약 70.2만)가 촘촘히 이어진 보스워시(BosWash) 메가로폴리스의 핵심 축입니다.',
    historicalContext:
      '네덜란드(뉴암스테르담)·퀘이커교(펜실베이니아) 등 다문화·관용의 전통 속에서 건국 초기 임시수도(뉴욕·필라델피아)와 영구 연방수도(워싱턴 D.C.)가 자리 잡았습니다.',
    economicContext:
      '월스트리트 글로벌 금융, 유엔(UN) 외교, 연방정부·방산·제약 빅파마(뉴저지)·기업 법인 등록의 성지(델라웨어).',
    themeColor: '#4F46E5',
    fillColor: '#E0E7FF',
    activeFillColor: '#818CF8',
    strokeColor: '#4338CA',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-900',
    statePostalCodes: ['NY', 'NJ', 'PA', 'DE', 'MD', 'DC'],
  },
  {
    id: 'midwest',
    number: 3,
    nameKo: '중서부 (오대호·대평원)',
    nameEn: 'Midwest (Great Lakes & Great Plains)',
    subRegionsSummary: '오대호 산업벨트 6개 주 + 대평원 곡창지대 6개 주 (총 12개 주)',
    fullTitle: '제3권역 · 중서부 오대호 & 대평원 (Midwest)',
    description:
      '오대호 수운과 미시시피강 수계를 연결하는 내륙 교통·물류의 수도 시카고(약 272만), 세계 자동차 산업을 일으킨 디트로이트(약 64.6만), 그리고 세계 최대의 옥수수·밀 곡창지대(Corn & Wheat Belt)를 품은 미국의 산업·농업 척추입니다.',
    historicalContext:
      '1787년 북서부 조례(노예제 금지 및 공교육 의무화)와 1803년 루이지애나 매입을 통해 개척되었으며, 에이브러햄 링컨을 배출하고 남북전쟁 승리의 원동력이 되었습니다.',
    economicContext:
      '자동차·기계·철강 제조업, 시카고 상품거래소(CME) 선물 금융, 세계적 농업·바이오에탄올·의료기기(미네소타) 산업.',
    themeColor: '#0D9488',
    fillColor: '#CCFBF1',
    activeFillColor: '#2DD4BF',
    strokeColor: '#0F766E',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-900',
    statePostalCodes: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
  },
  {
    id: 'south',
    number: 4,
    nameKo: '남부 (남부대서양·걸프)',
    nameEn: 'The South (South Atlantic & Gulf Coast)',
    subRegionsSummary: '텍사스 · 플로리다 · 조지아 · 버지니아 등 14개 주 (미국 인구·산업 성장 1위 권역)',
    fullTitle: '제4권역 · 남부 & 선벨트 (The South)',
    description:
      '미국 최대의 인구 유입과 기업 이전을 기록 중인 선벨트(Sun Belt)의 중심입니다. 독자적 공화국 역사를 지닌 텍사스(휴스턴·샌안토니오·댈러스·오스틴), 대서양·카리브해 관문 플로리다(마이애미·잭슨빌·올랜도), 동남부 허브 조지아(애틀랜타)까지 역동적인 성장을 이끌고 있습니다.',
    historicalContext:
      '버지니아 제임스타운(1607 최초 영구 정착지)과 조지 워싱턴·토머스 제퍼슨 등 건국의 아버지들을 배출했으며, 남북전쟁(1861~1865)의 아픔과 1950~60년대 흑인 민권운동(몽고메리·애틀랜타·멤피스)을 거쳐 신남부(New South)로 도약했습니다.',
    economicContext:
      '에너지·석유화학·우주항공(휴스턴·케이프커내버럴), 글로벌 물류·항공 허브(애틀랜타), 테크·반도체(오스틴·롤리 리서치트라이앵글), 한국 자동차·배터리 생산벨트(조지아·앨라배마·테네시·텍사스).',
    themeColor: '#D97706',
    fillColor: '#FEF3C7',
    activeFillColor: '#FBBF24',
    strokeColor: '#B45309',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    statePostalCodes: ['VA', 'WV', 'KY', 'TN', 'NC', 'SC', 'GA', 'FL', 'AL', 'MS', 'AR', 'LA', 'OK', 'TX'],
  },
  {
    id: 'mountain',
    number: 5,
    nameKo: '산악서부 (로키·남서부)',
    nameEn: 'Mountain West & Southwest',
    subRegionsSummary: '로키산맥 · 그랜드캐니언 · 콜로라도고원 8개 주',
    fullTitle: '제5권역 · 산악서부 (Mountain West)',
    description:
      '로키산맥의 웅장한 봉우리와 그랜드캐니언·옐로스톤 등 대자연을 품은 권역입니다. 미국에서 유일하게 인구 100만을 넘긴 주도 피닉스(약 167만), 마일하이 시티 덴버(약 72.9만), 세계 엔터테인먼트 수도 라스베이거스(약 67.9만), 실리콘 슬로프 솔트레이크시티가 빠르게 성장하고 있습니다.',
    historicalContext:
      '아메리카 원주민(나바호·푸에블로) 유산과 스페인 식민 개척사(1610년 건설된 미국 최고(最古) 주도 산타페), 서부 개척 시대 금·은광 붐과 대륙횡단철도 합류점(유타 프로몬토리)의 역사를 간직하고 있습니다.',
    economicContext:
      '첨단 반도체 파운드리(애리조나 피닉스), 항공우주·위성·클라우드(콜로라도·유타), 관광·컨벤션(라스베이거스), 핵심 광물·에너지.',
    themeColor: '#E11D48',
    fillColor: '#FFE4E6',
    activeFillColor: '#FB7185',
    strokeColor: '#BE123C',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
    statePostalCodes: ['MT', 'ID', 'WY', 'NV', 'UT', 'CO', 'AZ', 'NM'],
  },
  {
    id: 'pacific',
    number: 6,
    nameKo: '태평양 (서해안·알래스카·하와이)',
    nameEn: 'Pacific & Non-Contiguous',
    subRegionsSummary: '캘리포니아 · 워싱턴 · 오리건 + 알래스카 · 하와이 (5개 주)',
    fullTitle: '제6권역 · 태평양 연안 & 역외 주 (Pacific)',
    description:
      '단일 주로서 세계 4~5위권 경제 규모를 자랑하는 캘리포니아(LA·샌디에이고·새너제이·샌프란시스코·새크라멘토), 빅테크와 항공의 본산 시애틀(워싱턴주), 반도체·친환경의 포틀랜드(오리건주), 그리고 북극권 자원 보고 알래스카와 태평양의 허브 하와이를 아우릅니다.',
    historicalContext:
      '1848년 캘리포니아 골드러시와 오리건 트레일로 서부 해안 시대를 열었으며, 1959년 알래스카(49번째)와 하와이(50번째)가 연방에 가입하며 오늘날의 50개 주 체제가 완성되었습니다.',
    economicContext:
      '실리콘밸리 AI·반도체·빅테크(애플·구글·엔비디아·메타·마이크로소프트·아마존), 할리우드 문화콘텐츠, 태평양 관문 항만(LA·롱비치·시애틀) 및 인도·태평양 안보 거점.',
    themeColor: '#0284C7',
    fillColor: '#E0F2FE',
    activeFillColor: '#38BDF8',
    strokeColor: '#0369A1',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-900',
    statePostalCodes: ['WA', 'OR', 'CA', 'AK', 'HI'],
  },
];

export const STATEHOOD_ERAS: StatehoodEra[] = [
  {
    id: 'colonies13',
    name: '① 독립혁명 오리지널 13개 주 & 수도 창설',
    period: '1787~1790년',
    description:
      '영국으로부터 독립을 선언(1776)하고 미국 헌법을 비준한 최초의 13개 식민지 주와 연방수도 워싱턴 D.C.입니다. 성조기의 13개 줄(Stripes)이 바로 이 13개 주를 상징합니다.',
    highlightNote: '제1호 비준주 델라웨어(1787.12.7)부터 13번째 로드아일랜드(1790.5.29)까지 대서양 연안 동부 주들',
    stateIds: ['de', 'pa', 'nj', 'ga', 'ct', 'ma', 'md', 'sc', 'nh', 'va', 'ny', 'nc', 'ri', 'dc'],
  },
  {
    id: 'expansion',
    name: '② 애팔래치아 돌파 & 루이지애나 매입 확장기',
    period: '1791~1845년 (14~28번째 주)',
    description:
      '애팔래치아산맥을 넘어 오대호와 미시시피강 유역으로 영토를 넓히고, 1803년 나폴레옹으로부터 루이지애나 영토를 매입하며 국토를 두 배로 확장한 시기입니다. 1845년 텍사스 공화국 병합으로 마무리됩니다.',
    highlightNote: '버몬트(14번째)·켄터키(15번째)부터 오하이오·루이지애나·일리노이·미주리·플로리다·텍사스(28번째)까지',
    stateIds: ['vt', 'ky', 'tn', 'oh', 'la', 'in', 'ms', 'il', 'al', 'me', 'mo', 'ar', 'mi', 'fl', 'tx'],
  },
  {
    id: 'civil_west',
    name: '③ 골드러시 · 서부 개척 & 남북전쟁 재건기',
    period: '1846~1876년 (29~38번째 주)',
    description:
      '멕시코 전쟁과 오리건 조약으로 태평양 연안까지 도달(Manifest Destiny)하고, 1849년 골드러시로 캘리포니아가 급성장한 시기입니다. 남북전쟁(1861~1865) 중에 웨스트버지니아와 네바다가 연방에 편입되었습니다.',
    highlightNote: '아이오와·위스콘신·캘리포니아(31번째)·미네소타·오리건·캔자스·웨스트버지니아·네바다·네브래스카·콜로라도(38번째, 건국 100주년 기념주)',
    stateIds: ['ia', 'wi', 'ca', 'mn', 'or', 'ks', 'wv', 'nv', 'ne', 'co'],
  },
  {
    id: 'modern50',
    name: '④ 대평원·산악주 편입 & 50개 주 체제 완성',
    period: '1889~1959년 (39~50번째 주)',
    description:
      '대륙횡단철도 완공 이후 다코타·몬태나·워싱턴 등 서부 내륙 주들이 대거 승격되었고, 1912년 애리조나·뉴멕시코로 본토 48주가 완성된 뒤, 1959년 알래스카(49번째)와 하와이(50번째)가 가입하며 현재의 50주 성조기가 완성되었습니다.',
    highlightNote: '1889년 6개 주 동시 승격(ND·SD·MT·WA·ID·WY), 1912년 본토 완성(NM·AZ), 1959년 AK·HI 최종 합류',
    stateIds: ['nd', 'sd', 'mt', 'wa', 'id', 'wy', 'ut', 'ok', 'nm', 'az', 'ak', 'hi'],
  },
];

export const ECONOMIC_BELTS: EconomicBeltInfo[] = [
  {
    id: 'boswash',
    nameKo: '보스워시 메가로폴리스 (BosWash Corridor)',
    nameEn: 'Northeast Megalopolis',
    color: '#4F46E5',
    description:
      '보스턴(MA)~프로비던스(RI)~뉴욕(NY)~필라델피아(PA)~볼티모어(MD)~워싱턴 D.C.를 잇는 세계 최초·최대의 연담 대도시권. 미국 국토 면적의 2%에 불과하지만 미국 인구의 약 17%(5,600만 명), GDP의 20% 이상이 집중되어 있습니다.',
    keyIndustries: '글로벌 금융(월가), 연방 행정·외교, 아이비리그 고등교육, 바이오·제약(보스턴·뉴저지)',
    stateIds: ['ma', 'ri', 'ct', 'ny', 'nj', 'pa', 'de', 'md', 'dc', 'va'],
    coords: [
      [-71.06, 42.36], // Boston
      [-71.41, 41.82], // Providence
      [-72.68, 41.76], // Hartford
      [-74.01, 40.71], // NYC
      [-75.16, 39.95], // Philadelphia
      [-76.61, 39.29], // Baltimore
      [-77.04, 38.91], // Washington DC
    ],
  },
  {
    id: 'silicon_pacific',
    nameKo: '퍼시픽 테크 & 항공우주 코리더 (West Coast Tech Belt)',
    nameEn: 'Pacific Innovation Corridor',
    color: '#0284C7',
    description:
      '시애틀(WA)~포틀랜드(OR)~샌프란시스코·실리콘밸리(새너제이)~LA~샌디에이고(CA)로 이어지는 태평양 연안 혁신 벨트. 전 세계 AI, 클라우드, 반도체 설계, 우주항공, 바이오테크, 엔터테인먼트 산업의 수도입니다.',
    keyIndustries: 'AI·빅테크(실리콘밸리·시애틀), 반도체(실리콘 포레스트·샌디에이고), 문화콘텐츠·우주항공(LA)',
    stateIds: ['wa', 'or', 'ca'],
    coords: [
      [-122.33, 47.61], // Seattle
      [-122.68, 45.52], // Portland
      [-122.42, 37.77], // San Francisco
      [-121.89, 37.34], // San Jose
      [-118.24, 34.05], // LA
      [-117.16, 32.72], // San Diego
    ],
  },
  {
    id: 'texas_triangle',
    nameKo: '텍사스 트라이앵글 (Texas Triangle)',
    nameEn: 'Texas Megaregion',
    color: '#D97706',
    description:
      '댈러스-포트워스(DFW), 휴스턴, 샌안토니오-오스틴을 세 꼭짓점으로 연결하는 초대형 경제 삼각지대. 텍사스 인구의 75% 이상(약 2,200만 명)이 거주하며 테슬라·오라클 등 빅테크 이전("실리콘 힐스")과 에너지·우주산업의 중심입니다.',
    keyIndustries: '에너지·석유화학·NASA 우주산업(휴스턴), 반도체·테크(오스틴), 금융·통신·항공물류(댈러스)',
    stateIds: ['tx', 'ok', 'la'],
    coords: [
      [-96.8, 32.78], // Dallas
      [-95.37, 29.76], // Houston
      [-98.49, 29.42], // San Antonio
      [-97.74, 30.27], // Austin
      [-96.8, 32.78], // back to Dallas
    ],
  },
  {
    id: 'rust_belt',
    nameKo: '오대호 제조·모빌리티 벨트 (Great Lakes / Rust Belt)',
    nameEn: 'Great Lakes Manufacturing Belt',
    color: '#0D9488',
    description:
      '밀워키·시카고(IL)~디트로이트(MI)~인디애나폴리스(IN)~콜럼버스·클리블랜드(OH)~피츠버그(PA)~버팔로(NY)로 이어지는 전통 공업지대. 20세기 미국을 세계 1위 제조 대국으로 만든 심장부이며, 현재는 전기차·배터리·로보틱스·의료로 재도약 중입니다.',
    keyIndustries: '완성차·미래 모빌리티(디트로이트), 철강·로봇·AI(피츠버그), 파생금융·물류(시카고), 반도체(오하이오)',
    stateIds: ['wi', 'il', 'mi', 'in', 'oh', 'pa', 'ny'],
    coords: [
      [-87.91, 43.04], // Milwaukee
      [-87.63, 41.88], // Chicago
      [-83.05, 42.33], // Detroit
      [-82.99, 39.96], // Columbus
      [-79.99, 40.44], // Pittsburgh
      [-78.88, 42.89], // Buffalo
    ],
  },
  {
    id: 'sun_belt',
    nameKo: '남부 선벨트 & K-제조 코리더 (Southern Sun Belt)',
    nameEn: 'Sun Belt Growth Corridor',
    color: '#E11D48',
    description:
      '북위 36도 이남의 온화한 기후와 친기업 정책을 바탕으로 미국 내 인구 증가율 1위를 달리는 벨트(피닉스~텍사스~애틀랜타~샬럿~플로리다). 특히 조지아·앨라배마·테네시·텍사스·애리조나는 한국 반도체·전기차·배터리 기업의 북미 최대 생산 거점입니다.',
    keyIndustries: '반도체 파운드리(피닉스·오스틴), 전기차·배터리 벨트(조지아·앨라배마·테네시), 금융(샬럿), 항공우주·관광(플로리다)',
    stateIds: ['az', 'nm', 'tx', 'la', 'al', 'tn', 'ga', 'sc', 'nc', 'fl'],
    coords: [
      [-112.07, 33.45], // Phoenix
      [-97.74, 30.27], // Austin
      [-90.07, 29.95], // New Orleans
      [-86.3, 32.38], // Montgomery
      [-84.39, 33.75], // Atlanta
      [-80.84, 35.23], // Charlotte
      [-81.66, 30.33], // Jacksonville
      [-80.19, 25.76], // Miami
    ],
  },
];

export const KOREAN_DIASPORA_STEPS = [
  {
    step: 1,
    name: '호놀룰루 (하와이주)',
    stateId: 'hi',
    coord: [-157.86, 21.31] as [number, number],
    periodOrRole: '1903년 갤릭호 사탕수수 농장 첫 공식 한인 이민(102명) 상륙지 · 미주 독립운동 자금의 원천',
  },
  {
    step: 2,
    name: '샌프란시스코 (캘리포니아주)',
    stateId: 'ca',
    coord: [-122.42, 37.77] as [number, number],
    periodOrRole: '1908년 장인환·전명운 의사 스티븐스 처단 의거 · 1909년 대한인국민회 총회관 설립 (미주 한인 본토 관문)',
  },
  {
    step: 3,
    name: '로스앤젤레스 · 리버사이드 (캘리포니아주)',
    stateId: 'ca',
    coord: [-118.24, 34.05] as [number, number],
    periodOrRole: '도산 안창호 선생 파차파 캠프(최초 한인타운) 및 흥사단 본부 · 세계 최대 재외동포 커뮤니티(LA 한인타운)',
  },
  {
    step: 4,
    name: '필라델피아 (펜실베이니아주)',
    stateId: 'pa',
    coord: [-75.16, 39.95] as [number, number],
    periodOrRole: '1919년 4월 서재필·이승만 등 제1차 한인회의(First Korean Congress) 개최 및 리틀 시어터 독립선언 행진',
  },
  {
    step: 5,
    name: '워싱턴 D.C. (연방직할구)',
    stateId: 'dc',
    coord: [-77.04, 38.91] as [number, number],
    periodOrRole: '1889년 고종 황제가 개설한 주미대한제국공사관 · 구미위원부 · 워싱턴 내셔널 몰 한국전 참전용사 기념비',
  },
  {
    step: 6,
    name: '뉴욕 · 뉴저지 (NY · NJ)',
    stateId: 'ny',
    coord: [-74.01, 40.71] as [number, number],
    periodOrRole: '1921년 뉴욕 한인교회(독립운동 거점) · 맨해튼 32번가 K-타운 · 뉴저지 포트리·팰리세이즈파크 동부 최대 한인벨트',
  },
  {
    step: 7,
    name: '애틀랜타 · 서배너 (조지아주)',
    stateId: 'ga',
    coord: [-84.39, 33.75] as [number, number],
    periodOrRole: '미국 남부 최대 신흥 한인 사회(둘루스) · 현대차 메타플랜트·SK·LG 등 K-모빌리티·배터리 핵심 생산 거점',
  },
];

export const HIERARCHY_LEVELS: HierarchyLevel[] = [
  {
    level: 1,
    titleKo: '연방정부 (Federal Government)',
    titleEn: 'United States of America (Federal Union)',
    subtitle:
      '미국 헌법에 따라 외교·국방·화폐 발행·주간(Interstate) 통상권을 보유하며, 나머지 광범위한 자치권(교육·경찰·민형사법·세제)은 각 주에 유보된 연방공화국 체제입니다.',
    koreaComparison: '대한민국 중앙정부 (단, 미국은 50개 주가 헌법적 주권을 나눈 연방제)',
    colorClass: 'bg-blue-50/70',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-800 text-white',
    units: [
      {
        nameKo: '연방 3부 (입법·행정·사법)',
        nameEn: 'Congress (Senate 100 + House 435) · President · Supreme Court',
        description:
          '인구와 무관하게 주당 2명씩 선출하는 상원(100명)과 인구 비례로 선출하는 하원(435명)의 양원제 구조. 대선 선거인단(538명 = 상원 100 + 하원 435 + D.C. 3) 역시 이 구조를 그대로 따릅니다.',
        example: '캘리포니아 선거인단 54명(상원2+하원52) vs 와이오밍·버몬트 3명(상원2+하원1)',
      },
      {
        nameKo: '연방직할구 (Federal District)',
        nameEn: 'Washington, D.C. (District of Columbia)',
        description:
          '특정 주가 연방 수도를 독점하는 것을 막기 위해 메릴랜드주 땅을 할양받아 만든 헌법상 특별구역. 어느 주에도 속하지 않으며 상원 의석이 없으나 1961년 수정헌법 제23조로 대선 선거인단 3명을 배정받았습니다.',
        example: '워싱턴 D.C. (인구 약 70.2만 명 — 와이오밍·버몬트주보다 인구가 많음)',
        isSpecial: true,
      },
    ],
  },
  {
    level: 2,
    titleKo: '광역 주권 단위: 50개 주 (State & Commonwealth)',
    titleEn: '50 States (46 States + 4 Commonwealths)',
    subtitle:
      '각 주는 자체 헌법, 주지사(Governor), 주의회, 주 대법원, 주방위군을 가진 사실상의 독립 국가에 준하는 자치 단위입니다. 주마다 소득세·판매세·운전면허·교육제도가 모두 다릅니다.',
    koreaComparison: '광역자치단체(도·특별시)보다 훨씬 강력한 헌법적 자치 주권 보유',
    colorClass: 'bg-amber-50/60',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-600 text-white',
    units: [
      {
        nameKo: '일반 주 (46개 State) & 커먼웰스 (4개 Commonwealth)',
        nameEn: 'State vs Commonwealth (MA, PA, VA, KY)',
        description:
          '매사추세츠(MA), 펜실베이니아(PA), 버지니아(VA), 켄터키(KY) 4개 주는 공식 명칭으로 "State" 대신 공화적 공동체를 뜻하는 "Commonwealth"를 사용하지만 법적 지위는 다른 46개 주와 완전히 동일합니다.',
        example: 'Commonwealth of Virginia (버지니아주), State of California (캘리포니아주)',
      },
      {
        nameKo: '주도(State Capital) ≠ 최대도시(Largest City)의 비밀',
        nameEn: 'Why Capitals Are Often Small Inland Cities',
        description:
          '50개 주 중 무려 33개 주에서 주도가 최대도시가 아닙니다! ① 해안 대도시(뉴욕·필라델피아·시카고·LA)의 정치 권력 독점을 견제하고, ② 당시 마차로 주 전역에서 접근하기 쉬운 내륙 정중앙이나 강변 요충지를 타협점으로 골랐기 때문입니다.',
        example: '뉴욕주(주도 올버니 10.1만 vs 뉴욕시 848만), 일리노이주(주도 스프링필드 11.3만 vs 시카고 272만)',
        isSpecial: true,
      },
    ],
  },
  {
    level: 3,
    titleKo: '중간 광역 행정구역: 카운티 (County / Parish / Borough)',
    titleEn: '3,143 Counties & County Equivalents',
    subtitle:
      '주(State) 아래의 기본 구획 단위로 전국에 3,143개가 있습니다. 법원·보안관(Sheriff)·부동산 등기·선거 관리·공립학교 학구 등을 관할하며 중심 도시를 카운티 시트(County Seat, 군청 소재지)라고 부릅니다.',
    koreaComparison: '대한민국의 시·군·구 (광역과 기초의 중간 역할)',
    colorClass: 'bg-emerald-50/60',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-700 text-white',
    units: [
      {
        nameKo: '카운티 (County) · 패리시 (Parish) · 버러 (Borough)',
        nameEn: '48 States Counties · Louisiana Parishes · Alaska Boroughs',
        description:
          '48개 주는 카운티(County)라 부르지만, 프랑스·스페인 가톨릭 교구 전통이 남은 루이지애나주는 패리시(Parish, 64개), 광활한 알래스카주는 자치구인 버러(Borough)라는 명칭을 씁니다.',
        example: '로스앤젤레스 카운티(인구 966만 명, 미국 최대 카운티 — 40개 주보다 인구가 많음)',
      },
      {
        nameKo: '시·카운티 통합시 & 독립시 (Consolidated / Independent City)',
        nameEn: '5 Boroughs of NYC · San Francisco · Virginia Independent Cities',
        description:
          '뉴욕시는 예외적으로 1개 도시 안에 5개 카운티(맨해튼=뉴욕 카운티, 브루클린=킹스 카운티 등)를 품고 있으며, 샌프란시스코·필라델피아·덴버는 시와 카운티가 1:1 통합되어 있습니다.',
        example: '뉴욕시 5개 보로(자치구), 버지니아주 38개 독립시(카운티에 속하지 않음)',
        isSpecial: true,
      },
    ],
  },
  {
    level: 4,
    titleKo: '기초 자치단체: 시·타운·빌리지 & 미편입 지역',
    titleEn: 'Incorporated Municipalities vs Unincorporated Areas',
    subtitle:
      '주민투표로 시 헌장(Charter)을 채택해 법인격(Incorporation)을 얻은 도시(City·Town·Village)와, 별도 시청 없이 카운티가 직접 관할하는 미편입 지역(Unincorporated Area)으로 나뉩니다.',
    koreaComparison: '자치시·읍·면 vs 군 직할 리(里) 지역',
    colorClass: 'bg-slate-50',
    borderClass: 'border-slate-200',
    badgeClass: 'bg-slate-800 text-white',
    units: [
      {
        nameKo: '시 본체(City Proper) vs 광역 대도시권(Metro Area / MSA)',
        nameEn: 'Why US City Populations Look Smaller Than Expected',
        description:
          '미국 통계에서 도시 인구(예: 애틀랜타 약 52만, 마이애미 약 48.7만, 보스턴 약 67.3만)가 생각보다 작아 보이는 이유는 좁은 "시 행정경계(City Proper)" 기준이기 때문입니다. 주변 교외 자치시를 합친 대도시권(Metro Area) 인구는 애틀랜타 630만, 마이애미 620만, 보스턴 490만에 달합니다.',
        example: 'Threads 지도의 인구는 모두 공식 행정구역(City Proper) 2024년 기준 수치입니다.',
        isSpecial: true,
      },
      {
        nameKo: '미편입 지역 (Unincorporated Area)',
        nameEn: 'Las Vegas Strip (Paradise, NV) · Honolulu County',
        description:
          '유명한 "라스베이거스 스트립(카지노 호텔 밀집가)"은 사실 라스베이거스시 행정구역 밖인 클라크 카운티 직할 미편입 구역(파라다이스·윈체스터)에 있습니다(시 세금을 피하기 위해 시 편입을 거부).',
        example: '네바다주 라스베이거스 스트립, 메릴랜드·버지니아의 수많은 교외 주거지(CDP)',
      },
    ],
  },
];
