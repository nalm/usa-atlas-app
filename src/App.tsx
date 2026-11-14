import React, { useState, useMemo } from 'react';
import { RegionId, Lens } from './types/atlas';
import {
  REGIONS,
  ALL_STATES,
  STATE_MAP,
  STATEHOOD_ERAS,
} from './data/statesData';
import { UsMap } from './components/UsMap';
import { StateDetail } from './components/StateDetail';
import { OverviewPanel } from './components/OverviewPanel';
import { HierarchyModal } from './components/HierarchyModal';
import { CompareModal } from './components/CompareModal';
import { StatsModal } from './components/StatsModal';
import {
  Search,
  Layers,
  Scale,
  BarChart3,
  Map,
  Star,
  Landmark,
  Cpu,
  Globe2,
  Vote,
  X,
  RotateCcw,
} from 'lucide-react';

export function App() {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [activeLens, setActiveLens] = useState<Lens>('none');
  const [selectedEraId, setSelectedEraId] = useState<string>('colonies13');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  // 모달 상태
  const [isHierarchyOpen, setIsHierarchyOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);

  // 비교함 상태 (기본 프리셋: 캘리포니아, 텍사스, 뉴욕)
  const [compareList, setCompareList] = useState<string[]>(['ca', 'tx', 'ny']);

  const selectedState = selectedStateId ? STATE_MAP[selectedStateId] : null;

  const handleToggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  // 통합 검색 자동완성 결과 (주 이름, 우편약어, 도시명, 인물, 랜드마크, 한인사 연고)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: {
      stateId: string;
      postal: string;
      stateNameKo: string;
      stateNameEn: string;
      capitalKo: string;
      largestCityKo: string;
      isCapitalLargest: boolean;
      matchedCityId?: string;
      matchTag: string;
    }[] = [];

    for (const st of ALL_STATES) {
      const matchedCity = st.cities.find(
        (c) =>
          c.nameKo.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q)
      );
      const stateMatch =
        st.nameKo.toLowerCase().includes(q) ||
        st.shortNameKo.toLowerCase().includes(q) ||
        st.nameEn.toLowerCase().includes(q) ||
        st.postal.toLowerCase() === q ||
        st.nicknameKo.toLowerCase().includes(q);
      const personMatch = st.famousPeople.find(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q)
      );
      const landmarkMatch = st.landmarks.find((l) =>
        l.toLowerCase().includes(q)
      );
      const koreaMatch = st.koreanHistory?.find(
        (k) =>
          k.title.toLowerCase().includes(q) ||
          k.description.toLowerCase().includes(q)
      );

      if (stateMatch || matchedCity || personMatch || landmarkMatch || koreaMatch) {
        let matchTag = `★주도: ${st.capitalKo} · 최대: ${st.largestCityKo}`;
        if (matchedCity) {
          matchTag = `📍 도시 매칭: ${matchedCity.nameKo} (${matchedCity.populationText})`;
        } else if (personMatch) {
          matchTag = `👤 인물 매칭: ${personMatch.name}`;
        } else if (koreaMatch) {
          matchTag = `🇰🇷 한인사·K산업: ${koreaMatch.title}`;
        } else if (landmarkMatch) {
          matchTag = `🏛️ 명소: ${landmarkMatch}`;
        }

        results.push({
          stateId: st.id,
          postal: st.postal,
          stateNameKo: st.nameKo,
          stateNameEn: st.nameEn,
          capitalKo: st.capitalKo,
          largestCityKo: st.largestCityKo,
          isCapitalLargest: st.isCapitalLargest,
          matchedCityId: matchedCity?.id,
          matchTag,
        });
      }
      if (results.length >= 10) break;
    }
    return results;
  }, [searchQuery]);

  const handleSelectState = (id: string, cityId: string | null = null) => {
    setSelectedStateId(id);
    setSelectedCityId(cityId);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleResetAll = () => {
    setSelectedStateId(null);
    setSelectedCityId(null);
    setSelectedRegion('all');
    setActiveLens('none');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* 상단 고정 헤더 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* 브랜드 타이틀 */}
          <div
            onClick={handleResetAll}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-900 to-rose-700 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              US
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  미국 50개 주 · 주요 도시 입체 총람
                </h1>
                <span className="hidden md:inline-block text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  ★주도 vs 최대도시 · 6대 권역 · 538 선거인단
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                미국 각 주의 주도와 주요 도시 인구 지도 · 18×18 타 주 동명 도시 매트릭스 · 역사·인물·한인 디아스포라 아틀라스
              </p>
            </div>
          </div>

          {/* 우측 검색창 & 3대 모달 액션 버튼 */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial justify-end">
            {/* 검색창 */}
            <div className="relative w-full sm:w-64 md:w-76">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
                  placeholder="주, 약어(CA), 도시(시애틀), 인물, 한인사 검색..."
                  className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-slate-100 hover:bg-slate-200/70 focus:bg-white rounded-xl border border-slate-200/90 focus:border-blue-500 focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 자동완성 드롭다운 */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100">
                  {searchResults.map((res) => (
                    <button
                      key={`${res.stateId}-${res.matchedCityId || 'st'}`}
                      onMouseDown={() =>
                        handleSelectState(res.stateId, res.matchedCityId || null)
                      }
                      className="w-full px-3.5 py-2.5 text-left hover:bg-blue-50/70 flex items-center justify-between gap-2 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-slate-900 text-amber-300">
                            {res.postal}
                          </span>
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                            {res.stateNameKo}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {res.stateNameEn}
                          </span>
                        </div>
                        <div className="text-[11px] text-blue-700 font-semibold mt-0.5 truncate">
                          {res.matchTag}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded shrink-0 ${
                          res.isCapitalLargest
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {res.isCapitalLargest ? '★주도=최대' : '주도≠최대'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 행정체계 & 18x18 매트릭스 모달 버튼 */}
            <button
              onClick={() => setIsHierarchyOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 transition-colors shrink-0"
              title="미국 행정구역 위계 및 18×18 타 주 동명 도시 매트릭스"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden lg:inline">행정체계 · 18×18 지명 매트릭스</span>
              <span className="lg:hidden">지명 매트릭스</span>
            </button>

            {/* 비교함 모달 버튼 */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200/90 transition-colors shrink-0"
              title="주 1:1:1 비교함"
            >
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">비교함</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">
                {compareList.length}
              </span>
            </button>

            {/* 전국 통계·순위 모달 버튼 */}
            <button
              onClick={() => setIsStatsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-slate-900 hover:bg-slate-800 text-white transition-colors shrink-0"
              title="50개 주 + D.C. 총괄 통계 및 순위표"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">전국 통계·순위</span>
            </button>
          </div>
        </div>

        {/* 서브 컨트롤 바: 6대 권역 필터 + 5대 테마 렌즈 */}
        <div className="bg-slate-50/90 border-t border-slate-200/70">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
            {/* 6대 권역 탭 */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all shrink-0 ${
                  selectedRegion === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/80'
                }`}
              >
                전체 (50주+DC)
              </button>
              {REGIONS.map((reg) => {
                const isSelected = selectedRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => {
                      setSelectedRegion(isSelected ? 'all' : reg.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200/80'
                    }`}
                  >
                    <span>{reg.nameKo}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {reg.statePostalCodes.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 5대 테마 렌즈 스위처 */}
            <div className="flex items-center gap-1 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 mr-1 hidden xl:inline">
                테마 렌즈:
              </span>
              <button
                onClick={() => setActiveLens('none')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'none'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/80'
                }`}
              >
                <Map className="w-3 h-3" /> 기본 권역도
              </button>
              <button
                onClick={() =>
                  setActiveLens(activeLens === 'capitals' ? 'none' : 'capitals')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'capitals'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200/80'
                }`}
              >
                <Star className="w-3 h-3" /> ★주도 vs 최대도시
              </button>
              <button
                onClick={() =>
                  setActiveLens(activeLens === 'era' ? 'none' : 'era')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'era'
                    ? 'bg-amber-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-amber-50 border border-slate-200/80'
                }`}
              >
                <Landmark className="w-3 h-3" /> 연방 가입사
              </button>
              <button
                onClick={() =>
                  setActiveLens(activeLens === 'belts' ? 'none' : 'belts')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'belts'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200/80'
                }`}
              >
                <Cpu className="w-3 h-3" /> 5대 경제벨트
              </button>
              <button
                onClick={() =>
                  setActiveLens(activeLens === 'korea' ? 'none' : 'korea')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'korea'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-rose-50 border border-slate-200/80'
                }`}
              >
                <Globe2 className="w-3 h-3" /> 한인사·K산업
              </button>
              <button
                onClick={() =>
                  setActiveLens(activeLens === 'electoral' ? 'none' : 'electoral')
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  activeLens === 'electoral'
                    ? 'bg-purple-700 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-purple-50 border border-slate-200/80'
                }`}
              >
                <Vote className="w-3 h-3" /> 대선 선거인단(538)
              </button>

              {(selectedStateId || selectedRegion !== 'all' || activeLens !== 'none') && (
                <button
                  onClick={handleResetAll}
                  className="px-2 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1 shrink-0"
                  title="필터 초기화"
                >
                  <RotateCcw className="w-3 h-3" /> 초기화
                </button>
              )}
            </div>
          </div>

          {/* 연방 가입사 렌즈 활성 시 시대 선택 서브바 */}
          {activeLens === 'era' && (
            <div className="bg-amber-50/90 border-t border-amber-200/80 px-4 sm:px-6 py-2">
              <div className="max-w-[1600px] mx-auto flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-amber-900">
                  시대별 연방 가입 단계 선택:
                </span>
                {STATEHOOD_ERAS.map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEraId(era.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedEraId === era.id
                        ? 'bg-amber-700 text-white shadow-2xs'
                        : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-300/80'
                    }`}
                  >
                    {era.name} ({era.period})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠: 상단 풀와이드 지도 + 하단 상세 리포트 및 권역 총람 */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-5 space-y-6">
        {/* 1. 상단 풀와이드 인터랙티브 지도 섹션 */}
        <section className="w-full">
          <div className="h-[520px] sm:h-[600px] lg:h-[660px]">
            <UsMap
              selectedStateId={selectedStateId}
              selectedCityId={selectedCityId}
              selectedRegion={selectedRegion}
              activeLens={activeLens}
              selectedEraId={selectedEraId}
              onSelectState={handleSelectState}
              onSelectRegion={setSelectedRegion}
            />
          </div>

          {/* 지도 직하단 빠른 주 선택 바 */}
          <div className="mt-3 bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-700">
                빠른 주·수도 선택 (클릭 시 아래 상세 리포트 표시)
              </span>
              <span className="text-[11px] text-slate-400">
                {selectedRegion === 'all'
                  ? '미국 전체 50개 주 + 워싱턴 D.C.'
                  : `${REGIONS.find((r) => r.id === selectedRegion)?.nameKo} 소속 주`}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_STATES.filter(
                (st) => selectedRegion === 'all' || st.regionId === selectedRegion
              ).map((st) => {
                const isSelected = selectedStateId === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() =>
                      handleSelectState(isSelected ? '' : st.id, null)
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span
                      className={
                        isSelected
                          ? 'text-amber-300'
                          : st.isCapitalLargest
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }
                    >
                      ★
                    </span>
                    <span className="font-black text-[10px] opacity-75">
                      {st.postal}
                    </span>
                    <span>{st.shortNameKo}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. 하단 상세 정보 & 권역/테마 패널 섹션 (풀와이드 배치) */}
        <section className="w-full space-y-6">
          {selectedState && (
            <StateDetail
              state={selectedState}
              selectedCityId={selectedCityId}
              onSelectCity={(cid) => setSelectedCityId(cid)}
              onClose={() => {
                setSelectedStateId(null);
                setSelectedCityId(null);
              }}
              compareList={compareList}
              onToggleCompare={handleToggleCompare}
              onOpenCompareModal={() => setIsCompareOpen(true)}
            />
          )}

          <OverviewPanel
            selectedRegion={selectedRegion}
            activeLens={activeLens}
            selectedEraId={selectedEraId}
            onSelectState={handleSelectState}
            onSelectRegion={setSelectedRegion}
            onOpenHierarchyModal={() => setIsHierarchyOpen(true)}
          />
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-6 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>미국 50개 주 · 주요 도시 입체 총람 (US States & Cities Interactive Atlas)</strong> —
            연방·주·카운티·자치시 위계 및 ★주도 vs 최대도시·역사·산업·한인 디아스포라 가이드
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>50개 주(4개 커먼웰스 포함) · 워싱턴 D.C. · 주요 도시 인구 인포그래픽</span>
            <span>|</span>
            <a
              href="https://china.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              중국 성·직할시 총람 보러가기 →
            </a>
            <span>|</span>
            <a
              href="https://japan.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              일본 47개 도도부현 총람 보러가기 →
            </a>
          </div>
        </div>
      </footer>

      {/* 모달들 */}
      <HierarchyModal
        isOpen={isHierarchyOpen}
        onClose={() => setIsHierarchyOpen(false)}
        onSelectState={(id) => handleSelectState(id, null)}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onSetCompareList={setCompareList}
        onSelectState={(id) => handleSelectState(id, null)}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        onSelectState={(id) => handleSelectState(id, null)}
      />
    </div>
  );
}

export default App;
