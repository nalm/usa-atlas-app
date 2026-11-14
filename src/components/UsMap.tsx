import React, { useState, useRef } from 'react';
import { RegionId, Lens, StateInfo } from '../types/atlas';
import {
  ALL_STATES,
  STATE_MAP,
  REGION_MAP,
  DENSE_STATE_IDS,
  NORTHEAST_CALLOUTS,
  ECONOMIC_BELTS,
  KOREAN_DIASPORA_STEPS,
  STATEHOOD_ERAS,
  POPULATION_RANK,
  ELECTORAL_RANK,
  formatPop,
} from '../data/statesData';
import { US_STATE_PATHS, STATE_BOX_CENTROIDS, projectCoord } from '../data/usMapPaths';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Info,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ArrowDownCircle,
  Star,
  MapPin,
} from 'lucide-react';

interface UsMapProps {
  selectedStateId: string | null;
  selectedCityId: string | null;
  selectedRegion: RegionId | 'all';
  activeLens: Lens;
  selectedEraId: string;
  onSelectState: (id: string, cityId?: string | null) => void;
  onSelectRegion: (region: RegionId | 'all') => void;
}

const REGION_BASE_COLORS: Record<
  RegionId,
  { fill: string; hover: string; active: string; stroke: string; text: string }
> = {
  new_england: {
    fill: '#e0e7ff',
    hover: '#c7d2fe',
    active: '#4f46e5',
    stroke: '#6366f1',
    text: '#312e81',
  },
  mid_atlantic: {
    fill: '#dbeafe',
    hover: '#bfdbfe',
    active: '#2563eb',
    stroke: '#3b82f6',
    text: '#1e3a8a',
  },
  midwest: {
    fill: '#fef3c7',
    hover: '#fde68a',
    active: '#d97706',
    stroke: '#f59e0b',
    text: '#78350f',
  },
  south: {
    fill: '#ffe4e6',
    hover: '#fecdd3',
    active: '#e11d48',
    stroke: '#f43f5e',
    text: '#881337',
  },
  mountain: {
    fill: '#d1fae5',
    hover: '#a7f3d0',
    active: '#059669',
    stroke: '#10b981',
    text: '#064e3b',
  },
  pacific: {
    fill: '#cffafe',
    hover: '#a5f3fc',
    active: '#0891b2',
    stroke: '#06b6d4',
    text: '#164e63',
  },
};

export const UsMap: React.FC<UsMapProps> = ({
  selectedStateId,
  selectedCityId,
  selectedRegion,
  activeLens,
  selectedEraId,
  onSelectState,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<{
    stateId: string;
    cityId: string;
    nameKo: string;
    nameEn: string;
    role: 'capital_largest' | 'capital' | 'major';
    popText: string;
    note: string;
  } | null>(null);
  const [cityDisplayMode, setCityDisplayMode] = useState<'key' | 'all'>('all');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHudMinimized, setIsHudMinimized] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const selectedState: StateInfo | null = selectedStateId ? STATE_MAP[selectedStateId] : null;
  const hoveredState: StateInfo | null = hoveredId ? STATE_MAP[hoveredId] : null;
  const activeRegionInfo = selectedRegion !== 'all' ? REGION_MAP[selectedRegion] : null;
  const activeEra = STATEHOOD_ERAS.find((e) => e.id === selectedEraId) || STATEHOOD_ERAS[0];

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.35, 5));
  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(z / 1.35, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
    setZoom((z) => {
      const next = Math.min(Math.max(z * factor, 1), 5);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  // 주 폴리곤 색상 결정
  const getStateColors = (state: StateInfo) => {
    const isSelected = selectedStateId === state.id;
    const isHovered = hoveredId === state.id;
    const isInRegion = selectedRegion === 'all' || state.regionId === selectedRegion;
    const base = REGION_BASE_COLORS[state.regionId];

    if (!isInRegion) {
      return {
        fill: '#f1f5f9',
        stroke: '#cbd5e1',
        text: '#94a3b8',
        opacity: 0.42,
      };
    }

    if (activeLens === 'capitals') {
      if (state.isCapitalLargest) {
        return {
          fill: isSelected ? '#d97706' : isHovered ? '#fcd34d' : '#fef3c7',
          stroke: isSelected ? '#78350f' : '#d97706',
          text: isSelected ? '#ffffff' : '#78350f',
          opacity: 1,
        };
      }
      return {
        fill: isSelected ? '#334155' : isHovered ? '#e2e8f0' : '#f8fafc',
        stroke: isSelected ? '#0f172a' : '#94a3b8',
        text: isSelected ? '#ffffff' : '#334155',
        opacity: 0.95,
      };
    }

    if (activeLens === 'era') {
      const isEraActive = activeEra.stateIds.includes(state.id);
      if (isEraActive) {
        return {
          fill: isSelected ? '#b45309' : isHovered ? '#fde68a' : '#fef3c7',
          stroke: '#d97706',
          text: isSelected ? '#ffffff' : '#78350f',
          opacity: 1,
        };
      }
      return {
        fill: '#f8fafc',
        stroke: '#cbd5e1',
        text: '#94a3b8',
        opacity: 0.55,
      };
    }

    if (activeLens === 'electoral') {
      if (state.politicalLean === '민주당 우세 (Blue State)') {
        return {
          fill: isSelected ? '#1d4ed8' : isHovered ? '#93c5fd' : '#dbeafe',
          stroke: '#2563eb',
          text: isSelected ? '#ffffff' : '#1e3a8a',
          opacity: 1,
        };
      }
      if (state.politicalLean === '공화당 우세 (Red State)') {
        return {
          fill: isSelected ? '#b91c1c' : isHovered ? '#fca5a5' : '#fee2e2',
          stroke: '#dc2626',
          text: isSelected ? '#ffffff' : '#7f1d1d',
          opacity: 1,
        };
      }
      // Swing State
      return {
        fill: isSelected ? '#7e22ce' : isHovered ? '#d8b4fe' : '#f3e8ff',
        stroke: '#9333ea',
        text: isSelected ? '#ffffff' : '#581c87',
        opacity: 1,
      };
    }

    if (activeLens === 'korea') {
      const hasKorea = state.koreanHistory && state.koreanHistory.length > 0;
      if (hasKorea) {
        return {
          fill: isSelected ? '#be123c' : isHovered ? '#fecdd3' : '#ffe4e6',
          stroke: '#e11d48',
          text: isSelected ? '#ffffff' : '#881337',
          opacity: 1,
        };
      }
      return {
        fill: '#f8fafc',
        stroke: '#cbd5e1',
        text: '#94a3b8',
        opacity: 0.55,
      };
    }

    if (activeLens === 'belts') {
      const inBelt = state.economicBelts && state.economicBelts.length > 0;
      if (inBelt) {
        return {
          fill: isSelected ? base.active : isHovered ? base.hover : base.fill,
          stroke: base.stroke,
          text: isSelected ? '#ffffff' : base.text,
          opacity: 1,
        };
      }
      return {
        fill: '#f8fafc',
        stroke: '#cbd5e1',
        text: '#64748b',
        opacity: 0.65,
      };
    }

    return {
      fill: isSelected ? base.active : isHovered ? base.hover : base.fill,
      stroke: isSelected ? '#0f172a' : base.stroke,
      text: isSelected ? '#ffffff' : base.text,
      opacity: 1,
    };
  };

  // 선거인단 집계 (Electoral 렌즈용)
  const electoralSummary = React.useMemo(() => {
    let blue = 0;
    let swing = 0;
    let red = 0;
    ALL_STATES.forEach((s) => {
      if (s.politicalLean === '민주당 우세 (Blue State)') blue += s.electoralVotes;
      else if (s.politicalLean === '핵심 경합주 (Swing State)') swing += s.electoralVotes;
      else red += s.electoralVotes;
    });
    return { blue, swing, red };
  }, []);

  const focusedCityObj = React.useMemo(() => {
    if (!selectedState || !selectedCityId) return null;
    return selectedState.cities.find((c) => c.id === selectedCityId) || null;
  }, [selectedState, selectedCityId]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-sky-50/80 via-slate-50 to-indigo-50/50 rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col select-none">
      {/* 좌측 상단 플로팅 요약 HUD (접기/펼치기 지원) */}
      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none flex flex-col gap-2 max-w-[295px] sm:max-w-[345px]">
        <div className="bg-white/92 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200/90 shadow-sm pointer-events-auto transition-all">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Compass className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-xs font-extrabold text-slate-900 tracking-tight truncate">
                {selectedState
                  ? `${selectedState.nameKo} (${selectedState.postal})`
                  : activeRegionInfo
                  ? `${activeRegionInfo.nameKo} (${activeRegionInfo.nameEn})`
                  : '미국 6대 권역 · 50개 주 + 워싱턴 D.C.'}
              </span>
            </div>
            <button
              onClick={() => setIsHudMinimized((prev) => !prev)}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors shrink-0"
              title={isHudMinimized ? '요약 카드 펼치기' : '요약 카드 접기 (지도 넓게 보기)'}
            >
              {isHudMinimized ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>

          {!isHudMinimized && (
            <div className="mt-2 pt-2 border-t border-slate-200/70">
              {selectedState ? (
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-blue-600">
                      {REGION_MAP[selectedState.regionId].nameKo} ·{' '}
                      {selectedState.statehoodOrder > 0
                        ? `연방 가입 #${selectedState.statehoodOrder} (${selectedState.statehoodYear}년)`
                        : `연방 수도 (${selectedState.statehoodYear}년)`}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        selectedState.isCapitalLargest
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {selectedState.isCapitalLargest ? '★ 주도 = 최대도시' : '★ 주도 ≠ 최대도시'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug mb-2">
                    {selectedState.slogan}
                  </p>

                  {/* 주도 vs 최대도시 핵심 배지 */}
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] border-t border-slate-100 pt-1.5">
                    <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg px-2 py-1">
                      <span className="text-slate-400 block text-[10px]">
                        ★ 주도 (Capital)
                      </span>
                      <span className="font-extrabold text-slate-800">
                        {selectedState.capitalKo}{' '}
                        <span className="text-[10px] font-semibold text-amber-700">
                          ({selectedState.capitalPopText})
                        </span>
                      </span>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-200/70 rounded-lg px-2 py-1">
                      <span className="text-slate-400 block text-[10px]">
                        ● 최대도시 (Largest)
                      </span>
                      <span className="font-extrabold text-slate-800">
                        {selectedState.largestCityKo}{' '}
                        <span className="text-[10px] font-semibold text-blue-700">
                          ({selectedState.largestCityPopText})
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">주 전체 인구</span>
                      <span className="font-bold text-slate-800">
                        {formatPop(selectedState.populationMan)}{' '}
                        <span className="text-[10px] text-blue-600">
                          (#{POPULATION_RANK[selectedState.id]})
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">대선 선거인단</span>
                      <span className="font-bold text-slate-800">
                        {selectedState.electoralVotes}명{' '}
                        <span className="text-[10px] text-indigo-600">
                          (#{ELECTORAL_RANK[selectedState.id]})
                        </span>
                      </span>
                    </div>
                  </div>

                  {focusedCityObj && (
                    <div className="mt-2 bg-slate-900 text-white rounded-lg px-2.5 py-1.5 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-amber-300">
                          {focusedCityObj.role === 'capital_largest'
                            ? '★ 주도 겸 최대도시'
                            : focusedCityObj.role === 'capital'
                            ? '★ 주도 (Capital)'
                            : '● 주요 도시'}{' '}
                          : {focusedCityObj.nameKo}
                        </span>
                        <span className="text-[10px] font-bold bg-white/15 px-1.5 py-0.5 rounded">
                          {focusedCityObj.populationText}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-2">
                        {focusedCityObj.note}
                      </p>
                    </div>
                  )}

                  <a
                    href="#state-detail-section"
                    className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors shadow-xs"
                  >
                    <ArrowDownCircle className="w-3.5 h-3.5" />
                    아래에서 {selectedState.shortNameKo} 상세 리포트 보기
                  </a>
                </div>
              ) : activeRegionInfo ? (
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${activeRegionInfo.badgeBg} ${activeRegionInfo.badgeText}`}
                  >
                    {activeRegionInfo.subRegionsSummary}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {activeRegionInfo.description}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  지도에서 50개 주·워싱턴 D.C. 폴리곤이나{' '}
                  <strong className="text-amber-600">★주도</strong> ·{' '}
                  <strong className="text-blue-600">●주요 도시</strong> 마커를 클릭하면 하단에
                  역사·도시·인물·한국 연고 종합 리포트가 펼쳐집니다.
                </p>
              )}
            </div>
          )}
        </div>

        {/* 테마 렌즈 활성 배지 */}
        {activeLens !== 'none' && !isHudMinimized && (
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-md border border-slate-700 pointer-events-auto">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              {activeLens === 'capitals' && '주도 vs 최대도시 비교 렌즈 (Threads 인포그래픽 모드)'}
              {activeLens === 'era' && `건국·서부개척 연방 가입사: ${activeEra.name}`}
              {activeLens === 'belts' && '미국 5대 핵심 경제·산업 벨트 렌즈'}
              {activeLens === 'korea' && '한인 이민 120년사 & K-산업 진출 벨트'}
              {activeLens === 'electoral' && '미국 대선 선거인단 (총 538명 · 과반 270명)'}
            </div>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              {activeLens === 'capitals' &&
                '황금색 주(18곳)는 ★주도가 곧 주내 최대도시(피닉스·보스턴·애틀랜타·덴버 등)이며, 나머지 33개 주는 중소도시가 주도(올버니·새크라멘토·스프링필드 등)를 맡고 있습니다.'}
              {activeLens === 'era' && activeEra.description}
              {activeLens === 'belts' &&
                '보스워시 금융·정치 회랑, 태평양 빅테크 코스트, 텍사스 트라이앵글, 오대호 러스트벨트, 남부 선벨트 5대 경제 축을 표시합니다.'}
              {activeLens === 'korea' &&
                '1903년 하와이 사탕수수 농장 이민부터 샌프란시스코·필라델피아 독립운동, LA 한인타운, 현대 조지아·텍사스 K-첨단산업 벨트까지 7대 거점을 잇습니다.'}
              {activeLens === 'electoral' &&
                `민주당 우세(Blue) ${electoralSummary.blue}명 · 핵심 경합주(Swing) ${electoralSummary.swing}명 · 공화당 우세(Red) ${electoralSummary.red}명 구도를 보여줍니다.`}
            </p>
          </div>
        )}
      </div>

      {/* 호버 툴팁 (상단 중앙) */}
      {(hoveredCity || (hoveredState && hoveredState.id !== selectedStateId)) && (
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 bg-slate-900/95 text-white px-3.5 py-2 rounded-xl shadow-lg border border-slate-700 pointer-events-none flex items-center gap-2.5 animate-fade-in">
          {hoveredCity ? (
            <>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                  hoveredCity.role === 'capital_largest'
                    ? 'bg-amber-400 text-slate-950'
                    : hoveredCity.role === 'capital'
                    ? 'bg-rose-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {hoveredCity.role === 'capital_largest'
                  ? '★ 주도=최대도시'
                  : hoveredCity.role === 'capital'
                  ? '★ 주도'
                  : '● 주요 도시'}
              </span>
              <span className="text-xs font-bold">
                {hoveredCity.nameKo} ({hoveredCity.nameEn})
              </span>
              <span className="text-[11px] text-amber-300 font-bold">
                인구 {hoveredCity.popText}
              </span>
              <span className="text-[11px] text-slate-300 hidden md:inline">
                | {hoveredCity.note}
              </span>
            </>
          ) : hoveredState ? (
            <>
              <span className="text-xs font-extrabold text-amber-400">
                [{hoveredState.postal}] {hoveredState.nameKo}
              </span>
              <span className="text-[11px] text-slate-300">
                ★주도: {hoveredState.capitalKo}({hoveredState.capitalPopText}) · 최대도시:{' '}
                {hoveredState.largestCityKo}({hoveredState.largestCityPopText}) · 선거인단{' '}
                {hoveredState.electoralVotes}명
              </span>
            </>
          ) : null}
        </div>
      )}

      {/* 우측 상단 도시 마커 밀도 토글 & 줌 컨트롤 */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1">
          <button
            onClick={() => setCityDisplayMode('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              cityDisplayMode === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Threads 원문 인포그래픽의 모든 주요 도시와 인구를 지도에 표시"
          >
            <MapPin className="w-3 h-3" />
            전체 주요 도시
          </button>
          <button
            onClick={() => setCityDisplayMode('key')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              cityDisplayMode === 'key'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="각 주의 주도(★)와 최대도시만 간결하게 표시"
          >
            <Star className="w-3 h-3" />
            주도·최대도시만
          </button>
        </div>

        <div className="flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
            title="확대"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
            title="축소"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
            title="초기 화면"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 메인 인터랙티브 SVG 지도 */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 580"
        className={`w-full h-full flex-1 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <defs>
          <filter id="map-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.08" />
          </filter>
          <filter id="city-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.35" />
          </filter>
        </defs>

        <g
          transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          style={{
            transformOrigin: '500px 290px',
            transition: isDragging ? 'none' : 'transform 0.16s ease-out',
          }}
        >
          {/* 배경 그리드 및 대양 라벨 */}
          <text
            x="65"
            y="260"
            className="fill-sky-300/70 font-extrabold text-[13px] tracking-[0.25em] pointer-events-none"
          >
            PACIFIC OCEAN
          </text>
          <text
            x="775"
            y="435"
            className="fill-sky-300/70 font-extrabold text-[12px] tracking-[0.2em] pointer-events-none"
          >
            ATLANTIC OCEAN
          </text>
          <text
            x="495"
            y="538"
            className="fill-sky-300/70 font-extrabold text-[11px] tracking-[0.18em] pointer-events-none"
          >
            GULF OF MEXICO
          </text>

          {/* 좌하단 알래스카(AK) · 하와이(HI) 인셋 구분 프레임 */}
          <g className="pointer-events-none">
            <rect
              x="18"
              y="402"
              width="355"
              height="164"
              rx="12"
              fill="#f8fafc"
              fillOpacity="0.65"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="5 4"
            />
            <text x="30" y="420" fontSize="9.5" fontWeight="800" fill="#475569">
              알래스카(AK) · 하와이(HI) 역외 주 인셋 (축척 별도)
            </text>
          </g>

          {/* 50개 주 + D.C. 폴리곤 렌더링 */}
          <g filter="url(#map-shadow)">
            {ALL_STATES.map((state) => {
              const pathD = US_STATE_PATHS[state.id];
              if (!pathD) return null;
              const colors = getStateColors(state);
              const isSelected = selectedStateId === state.id;

              return (
                <path
                  key={state.id}
                  d={pathD}
                  fill={colors.fill}
                  fillOpacity={colors.opacity}
                  stroke={colors.stroke}
                  strokeWidth={isSelected ? 2.2 / Math.sqrt(zoom) : 0.9 / Math.sqrt(zoom)}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-colors duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectState(state.id, null);
                  }}
                  onMouseEnter={() => setHoveredId(state.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </g>

          {/* 5대 경제·산업 벨트 오버레이 (belts 렌즈) */}
          {activeLens === 'belts' && (
            <g className="pointer-events-none">
              {ECONOMIC_BELTS.map((belt) => {
                const pts = belt.coords.map((c) => projectCoord(c));
                const d = pts
                  .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
                  .join(' ');
                const mid = pts[Math.floor(pts.length / 2)];
                return (
                  <g key={belt.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={belt.color}
                      strokeWidth={6 / Math.sqrt(zoom)}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={0.28}
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke={belt.color}
                      strokeWidth={2.4 / Math.sqrt(zoom)}
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {mid && (
                      <g transform={`translate(${mid[0]}, ${mid[1] - 10})`}>
                        <rect
                          x="-62"
                          y="-9"
                          width="124"
                          height="16"
                          rx="4"
                          fill={belt.color}
                          opacity="0.92"
                        />
                        <text
                          textAnchor="middle"
                          y="2"
                          fill="#ffffff"
                          fontSize="8.5"
                          fontWeight="800"
                        >
                          {belt.nameKo}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* 한인 이민·독립운동·K-산업 7대 루트 오버레이 (korea 렌즈) */}
          {activeLens === 'korea' && (
            <g>
              {(() => {
                const pts = KOREAN_DIASPORA_STEPS.map((st) => projectCoord(st.coord));
                const d = pts
                  .map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
                  .join(' ');
                return (
                  <path
                    d={d}
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth={2.2 / Math.sqrt(zoom)}
                    strokeDasharray="5 4"
                    className="pointer-events-none"
                    opacity={0.75}
                  />
                );
              })()}
              {KOREAN_DIASPORA_STEPS.map((step) => {
                const [cx, cy] = projectCoord(step.coord);
                return (
                  <g
                    key={step.step}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectState(step.stateId, null);
                    }}
                  >
                    <circle
                      r={10 / Math.sqrt(zoom)}
                      fill="#be123c"
                      stroke="#ffffff"
                      strokeWidth={1.8 / Math.sqrt(zoom)}
                    />
                    <text
                      textAnchor="middle"
                      y={3.5 / Math.sqrt(zoom)}
                      fill="#ffffff"
                      fontSize={9.5 / Math.sqrt(zoom)}
                      fontWeight="900"
                    >
                      {step.step}
                    </text>
                    <g transform={`translate(0, ${-14 / Math.sqrt(zoom)})`}>
                      <rect
                        x={-48 / Math.sqrt(zoom)}
                        y={-9 / Math.sqrt(zoom)}
                        width={96 / Math.sqrt(zoom)}
                        height={14 / Math.sqrt(zoom)}
                        rx={3 / Math.sqrt(zoom)}
                        fill="#881337"
                        opacity="0.92"
                      />
                      <text
                        textAnchor="middle"
                        y={1 / Math.sqrt(zoom)}
                        fill="#fecdd3"
                        fontSize={7.5 / Math.sqrt(zoom)}
                        fontWeight="800"
                      >
                        {step.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          )}

          {/* 주 이름 라벨 (내륙 일반 주) */}
          <g className="pointer-events-none">
            {ALL_STATES.map((state) => {
              if (DENSE_STATE_IDS.has(state.id)) return null;
              const center = STATE_BOX_CENTROIDS[state.id];
              if (!center) return null;

              const isSelected = selectedStateId === state.id;
              const isInRegion =
                selectedRegion === 'all' || state.regionId === selectedRegion;
              if (!isInRegion && zoom < 1.5) return null;

              return (
                <g key={`label-${state.id}`} transform={`translate(${center[0]}, ${center[1]})`}>
                  <text
                    textAnchor="middle"
                    y={-2}
                    fontSize={(isSelected ? 10 : 8.5) / Math.sqrt(zoom)}
                    fontWeight="900"
                    fill={isSelected ? '#ffffff' : '#1e293b'}
                    stroke={isSelected ? '#0f172a' : '#ffffff'}
                    strokeWidth={2.4 / Math.sqrt(zoom)}
                    paintOrder="stroke"
                  >
                    {state.shortNameKo}
                  </text>
                  {activeLens === 'electoral' && (
                    <text
                      textAnchor="middle"
                      y={8 / Math.sqrt(zoom)}
                      fontSize={8 / Math.sqrt(zoom)}
                      fontWeight="900"
                      fill={isSelected ? '#fef08a' : '#0f172a'}
                      stroke={isSelected ? '#0f172a' : '#ffffff'}
                      strokeWidth={2 / Math.sqrt(zoom)}
                      paintOrder="stroke"
                    >
                      선거인단 {state.electoralVotes}명
                    </text>
                  )}
                  {activeLens === 'era' && state.statehoodOrder > 0 && (
                    <text
                      textAnchor="middle"
                      y={8 / Math.sqrt(zoom)}
                      fontSize={7.5 / Math.sqrt(zoom)}
                      fontWeight="800"
                      fill="#92400e"
                      stroke="#ffffff"
                      strokeWidth={1.8 / Math.sqrt(zoom)}
                      paintOrder="stroke"
                    >
                      #{state.statehoodOrder} ({state.statehoodYear})
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* 주요 도시 마커 (★ 골드스타 주도=최대도시, ★ 레드스타 일반 주도, ● 블루닷 주요 도시) */}
          <g>
            {ALL_STATES.map((state) => {
              const isInRegion =
                selectedRegion === 'all' || state.regionId === selectedRegion;
              if (!isInRegion) return null;

              const isStateSelected = selectedStateId === state.id;

              return state.cities.map((city, cityIdx) => {
                // 필터 모드('key'일 때는 주도 또는 각 주 제1최대도시만 표시, 단 선택된 주는 모두 표시)
                const isLargestCity = city.nameKo === state.largestCityKo || cityIdx === 0;
                const isKeyCity =
                  city.role === 'capital_largest' ||
                  city.role === 'capital' ||
                  isLargestCity;

                if (cityDisplayMode === 'key' && !isKeyCity && !isStateSelected && zoom < 1.6) {
                  return null;
                }

                const [cx, cy] = projectCoord(city.coord);
                const isCitySelected =
                  selectedStateId === state.id && selectedCityId === city.id;

                // 북동부 과밀 주의 경우 폴리곤 위에는 마커만 깔끔히 찍고 라벨은 선택/줌인 시 또는 콜아웃에서 표시
                const showCityLabel =
                  isStateSelected ||
                  isCitySelected ||
                  zoom >= 1.45 ||
                  (!DENSE_STATE_IDS.has(state.id) &&
                    (city.role !== 'major' ||
                      city.populationMan >= 55 ||
                      state.cities.length <= 2 ||
                      cityDisplayMode === 'all'));

                return (
                  <g
                    key={city.id}
                    transform={`translate(${cx}, ${cy})`}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectState(state.id, city.id);
                    }}
                    onMouseEnter={() =>
                      setHoveredCity({
                        stateId: state.id,
                        cityId: city.id,
                        nameKo: city.nameKo,
                        nameEn: city.nameEn,
                        role: city.role,
                        popText: city.populationText,
                        note: city.note,
                      })
                    }
                    onMouseLeave={() => setHoveredCity(null)}
                  >
                    {/* 선택된 도시 강조 링 */}
                    {isCitySelected && (
                      <circle
                        r={9 / Math.sqrt(zoom)}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth={2 / Math.sqrt(zoom)}
                      />
                    )}

                    {/* 심볼: ★ (capital_largest = 골드, capital = 레드) vs ● (major = 블루) */}
                    {city.role === 'capital_largest' || city.role === 'capital' ? (
                      <text
                        textAnchor="middle"
                        y={3.8 / Math.sqrt(zoom)}
                        fontSize={(isCitySelected ? 13.5 : 10.5) / Math.sqrt(zoom)}
                        fill={city.role === 'capital_largest' ? '#f59e0b' : '#ef4444'}
                        stroke="#0f172a"
                        strokeWidth={0.8 / Math.sqrt(zoom)}
                        paintOrder="stroke"
                        filter="url(#city-glow)"
                      >
                        ★
                      </text>
                    ) : (
                      <circle
                        r={(isCitySelected ? 4.2 : 2.9) / Math.sqrt(zoom)}
                        fill="#2563eb"
                        stroke="#ffffff"
                        strokeWidth={1.1 / Math.sqrt(zoom)}
                        filter="url(#city-glow)"
                      />
                    )}

                    {/* 도시명 + 인구 라벨 (Threads 이미지 1 스타일) */}
                    {showCityLabel && (
                      <text
                        x={5.5 / Math.sqrt(zoom)}
                        y={2.5 / Math.sqrt(zoom)}
                        fontSize={(isCitySelected ? 8.5 : 6.8) / Math.sqrt(zoom)}
                        fontWeight={city.role !== 'major' || isCitySelected ? '800' : '700'}
                        fill={
                          city.role === 'capital_largest'
                            ? '#92400e'
                            : city.role === 'capital'
                            ? '#991b1b'
                            : '#1e3a8a'
                        }
                        stroke="#ffffff"
                        strokeWidth={2.2 / Math.sqrt(zoom)}
                        paintOrder="stroke"
                        className="pointer-events-none"
                      >
                        {city.nameKo}
                        {(isStateSelected || zoom >= 1.35 || city.populationMan >= 75) &&
                          `(${city.populationText.replace('약 ', '')})`}
                      </text>
                    )}
                  </g>
                );
              })}
            )}
          </g>

          {/* 북동부 소면적 주 우측 인출선(Callout) 박스 스택 (Threads 이미지 1 우측 정렬 반영) */}
          <g>
            {NORTHEAST_CALLOUTS.map((callout) => {
              const state = STATE_MAP[callout.id];
              if (!state) return null;
              const center = STATE_BOX_CENTROIDS[callout.id];
              if (!center) return null;

              const isSelected = selectedStateId === state.id;
              const isHovered = hoveredId === state.id;
              const isInRegion =
                selectedRegion === 'all' || state.regionId === selectedRegion;

              return (
                <g
                  key={`callout-${callout.id}`}
                  className="cursor-pointer"
                  opacity={isInRegion ? 1 : 0.4}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectState(state.id, null);
                  }}
                  onMouseEnter={() => setHoveredId(state.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* 인출선 */}
                  <polyline
                    points={`${center[0]},${center[1]} ${callout.boxX - 12},${callout.boxY + 14} ${callout.boxX},${callout.boxY + 14}`}
                    fill="none"
                    stroke={isSelected ? '#2563eb' : '#64748b'}
                    strokeWidth={isSelected ? 1.5 : 0.85}
                    strokeDasharray={isSelected ? 'none' : '2.5 2.5'}
                  />
                  <circle
                    cx={center[0]}
                    cy={center[1]}
                    r={2.4}
                    fill={isSelected ? '#2563eb' : '#475569'}
                  />

                  {/* 우측 콜아웃 카드 */}
                  <rect
                    x={callout.boxX}
                    y={callout.boxY}
                    width="136"
                    height="33"
                    rx="6"
                    fill={isSelected ? '#1e293b' : isHovered ? '#eff6ff' : '#ffffff'}
                    stroke={
                      isSelected
                        ? '#f59e0b'
                        : state.isCapitalLargest
                        ? '#f59e0b'
                        : '#cbd5e1'
                    }
                    strokeWidth={isSelected ? 1.8 : 1}
                  />
                  <text
                    x={callout.boxX + 6}
                    y={callout.boxY + 12.5}
                    fontSize="8.2"
                    fontWeight="900"
                    fill={isSelected ? '#ffffff' : '#0f172a'}
                  >
                    [{state.postal}] {state.shortNameKo}
                  </text>
                  <text
                    x={callout.boxX + 130}
                    y={callout.boxY + 12.5}
                    textAnchor="end"
                    fontSize="7.2"
                    fontWeight="800"
                    fill={
                      state.isCapitalLargest
                        ? '#f59e0b'
                        : isSelected
                        ? '#93c5fd'
                        : '#64748b'
                    }
                  >
                    {state.isCapitalLargest ? '★주도=최대' : `선거인단 ${state.electoralVotes}`}
                  </text>
                  <text
                    x={callout.boxX + 6}
                    y={callout.boxY + 25}
                    fontSize="7.1"
                    fontWeight="700"
                    fill={isSelected ? '#e2e8f0' : '#475569'}
                  >
                    ★{state.capitalKo}({state.capitalPopText.replace('약 ', '')})
                    {!state.isCapitalLargest &&
                      ` · ●${state.largestCityKo}(${state.largestCityPopText.replace('약 ', '')})`}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* 하단 범례 바 (Threads 이미지 1의 ★ 골드스타 / ★ 레드스타 / ● 주요 도시 범례 포함) */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-extrabold text-slate-800 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-600" /> 도시 심볼 범례:
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            <span className="text-amber-500 text-xs">★</span> 주도 = 주내 최대도시 (18곳)
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            <span className="text-rose-500 text-xs">★</span> 일반 주도 (33곳)
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
            <span className="text-blue-600 text-xs">●</span> 주내 주요 대도시
          </span>

          <span className="text-slate-300 hidden lg:inline">|</span>

          <div className="hidden xl:flex items-center gap-2.5">
            {(Object.keys(REGION_MAP) as RegionId[]).map((rId) => {
              const r = REGION_MAP[rId];
              return (
                <span key={rId} className="inline-flex items-center gap-1 font-medium text-slate-600">
                  <span
                    className="w-2.5 h-2.5 rounded-xs inline-block border"
                    style={{
                      backgroundColor: REGION_BASE_COLORS[rId].fill,
                      borderColor: REGION_BASE_COLORS[rId].stroke,
                    }}
                  />
                  {r.nameKo}
                </span>
              );
            })}
          </div>
        </div>
        <div className="text-slate-400 text-[10px] hidden sm:block">
          마우스 휠: 확대/축소 · 드래그: 이동 · 주 폴리곤 또는 ★/● 도시 클릭: 상세 리포트
        </div>
      </div>
    </div>
  );
};
