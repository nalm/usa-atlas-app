import React from 'react';
import { RegionId, Lens } from '../types/atlas';
import {
  REGIONS,
  ALL_STATES,
  STATE_MAP,
  POSTAL_TO_ID_MAP,
  STATEHOOD_ERAS,
  ECONOMIC_BELTS,
  KOREAN_DIASPORA_STEPS,
  CONFUSING_NAME_CASES,
} from '../data/statesData';
import {
  Compass,
  Star,
  Landmark,
  Cpu,
  Globe2,
  Vote,
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface OverviewPanelProps {
  selectedRegion: RegionId | 'all';
  activeLens: Lens;
  selectedEraId: string;
  onSelectState: (id: string, cityId?: string | null) => void;
  onSelectRegion: (region: RegionId | 'all') => void;
  onOpenHierarchyModal: () => void;
}

export const OverviewPanel: React.FC<OverviewPanelProps> = ({
  selectedRegion,
  activeLens,
  selectedEraId,
  onSelectState,
  onSelectRegion,
  onOpenHierarchyModal,
}) => {
  const goldStarStates = React.useMemo(
    () => ALL_STATES.filter((s) => s.isCapitalLargest),
    []
  );
  const separatedCapitalStates = React.useMemo(
    () => ALL_STATES.filter((s) => !s.isCapitalLargest),
    []
  );

  return (
    <div className="space-y-6">
      {/* 1. 활성 렌즈 전용 심층 인터랙티브 패널 */}
      {activeLens === 'capitals' && (
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-rose-50/50 rounded-2xl border border-amber-200/90 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full mb-1.5">
                <Star className="w-3.5 h-3.5 text-amber-600" />
                Threads 인포그래픽 핵심 해설
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                왜 미국은 대도시(뉴욕·LA·시카고)가 주도가 아닐까?
              </h3>
            </div>
            <button
              onClick={onOpenHierarchyModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              18×18 '어느 주 이름이 어느 주로 흩어졌나' 매트릭스 열기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
            미국 50개 주와 워싱턴 D.C. 총 51개 구역 가운데{' '}
            <strong className="text-amber-800">
              주도가 곧 주내 최대도시인 곳(★ 골드스타)은 18곳
            </strong>
            뿐이며, 나머지{' '}
            <strong className="text-rose-700">33개 주는 중소도시가 주도</strong>를
            맡고 있습니다. 건국·서부개척 시기 ① 주 내 지리적 정중앙의 교통 요충지를
            선택하거나, ② 뉴욕·시카고·필라델피아 등 거대 상업 항구도시에 정치 권력까지
            독점되는 것을 막기 위해 의도적으로 내륙 중소도시(올버니·새크라멘토·스프링필드·탤러해시 등)에
            주의회를 배치했기 때문입니다.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 골드스타 18곳 */}
            <div className="bg-white rounded-xl p-4 border border-amber-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-sm font-extrabold text-amber-900 flex items-center gap-1.5">
                  <span className="text-amber-500 text-base">★</span>
                  주도 = 최대도시 일치 (18곳 · 골드스타)
                </h4>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  클릭 시 이동
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {goldStarStates.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => onSelectState(st.id, null)}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 text-xs font-bold text-slate-800 transition-colors flex items-center gap-1"
                  >
                    <span className="text-amber-500">★</span>
                    <span>{st.shortNameKo}</span>
                    <span className="text-[11px] text-amber-800 font-extrabold">
                      ({st.capitalKo} {st.capitalPopText.replace('약 ', '')})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 대표적 주도 != 최대도시 분리 주 */}
            <div className="bg-white rounded-xl p-4 border border-rose-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-sm font-extrabold text-rose-900 flex items-center gap-1.5">
                  <span className="text-rose-500 text-base">★</span>
                  주도 ≠ 최대도시 분리 (33개 주)
                </h4>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  주도 → 최대도시
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[175px] overflow-y-auto pr-1">
                {separatedCapitalStates.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => onSelectState(st.id, null)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1"
                  >
                    <span className="font-extrabold text-slate-900">{st.postal}</span>
                    <span>{st.shortNameKo}:</span>
                    <span className="text-rose-700 font-bold">★{st.capitalKo}</span>
                    <span className="text-slate-400">vs</span>
                    <span className="text-blue-700 font-bold">●{st.largestCityKo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeLens === 'era' && (
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-slate-50 rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Landmark className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-black text-slate-900">
              미국 건국 13개 식민지부터 50개 주 완성까지의 역사적 확장
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {STATEHOOD_ERAS.map((era) => {
              const isSelected = era.id === selectedEraId;
              return (
                <div
                  key={era.id}
                  className={`rounded-xl p-4 border transition-all ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 ring-1 ring-amber-300 shadow-xs'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="text-[11px] font-extrabold text-amber-700 mb-0.5">
                    {era.period}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-1.5">
                    {era.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {era.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                    {era.stateIds.map((id) => {
                      const st = STATE_MAP[id];
                      if (!st) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => onSelectState(id, null)}
                          className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-amber-200 text-slate-700 hover:text-amber-950 transition-colors"
                        >
                          {st.shortNameKo}({st.statehoodYear})
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeLens === 'belts' && (
        <div className="bg-gradient-to-br from-indigo-50/70 via-white to-sky-50/50 rounded-2xl border border-indigo-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900">
              미국을 움직이는 5대 초광역 경제·산업 벨트 (Economic Belts)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {ECONOMIC_BELTS.map((belt) => (
              <div
                key={belt.id}
                className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: belt.color }}
                    />
                    <h4 className="text-sm font-black text-slate-900">
                      {belt.nameKo}
                    </h4>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 mb-2">
                    {belt.nameEn}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {belt.description}
                  </p>
                  <div className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg mb-3">
                    핵심 산업: {belt.keyIndustries}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                  {belt.stateIds.map((id) => {
                    const st = STATE_MAP[id];
                    if (!st) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => onSelectState(id, null)}
                        className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white transition-colors"
                      >
                        {st.postal} {st.shortNameKo}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeLens === 'korea' && (
        <div className="bg-gradient-to-br from-rose-50/80 via-white to-indigo-50/50 rounded-2xl border border-rose-200/90 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-black text-slate-900">
              미주 한인 이민 120년사 · 독립운동 사적 · K-첨단산업 진출 7대 거점
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {KOREAN_DIASPORA_STEPS.map((st) => (
              <div
                key={st.step}
                onClick={() => onSelectState(st.stateId, null)}
                className="bg-white hover:bg-rose-50/50 rounded-xl p-4 border border-rose-200/80 shadow-2xs cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    STEP {st.step}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-1.5">
                  📍 {st.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.periodOrRole}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeLens === 'electoral' && (
        <div className="bg-gradient-to-br from-blue-50/70 via-purple-50/50 to-rose-50/70 rounded-2xl border border-indigo-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-black text-slate-900">
                미국 대통령 선거인단(Electoral College 538명) 구조와 7대 경합주
              </h3>
            </div>
            <span className="text-xs font-extrabold text-indigo-900 bg-indigo-100 px-3 py-1 rounded-full">
              연방 상원 100명(주별 2명) + 연방 하원 435명(인구 비례) + 워싱턴 D.C. 3명 = 총 538명 (당선 매직넘버 270명)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            미국 대선은 유권자 직접투표가 아니라 각 주에 배정된 선거인단을 확보하는 간접선거입니다.
            메인주(ME)와 네브래스카주(NE) 두 곳을 제외한 48개 주와 워싱턴 D.C.는 주에서 1표라도 더 얻은 후보가
            그 주의 선거인단을 모두 가져가는 <strong className="text-slate-900">승자독식제(Winner-take-all)</strong>를
            채택하고 있어, 펜실베이니아(19)·조지아(16)·노스캐롤라이나(16)·미시간(15)·위스콘신(10)·애리조나(11)·네바다(6) 등
            7대 경합주(Swing States)가 대선 승패를 결정짓습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_STATES.filter((s) => s.politicalLean === '핵심 경합주 (Swing State)').map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectState(s.id, null)}
                className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 text-xs font-extrabold transition-colors flex items-center gap-1.5"
              >
                <span>🎯 핵심 경합주: {s.nameKo}</span>
                <span className="bg-purple-700 text-white px-1.5 py-0.5 rounded text-[11px]">
                  선거인단 {s.electoralVotes}명
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. 미국 6대 권역(Regions) 종합 탐색 카드 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              미국 6대 권역 (50개 주 + 워싱턴 D.C.) 입체 총람
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              권역 카드를 클릭해 지도를 필터링하거나, 각 주 배지를 클릭해 상세 리포트를 확인하세요.
            </p>
          </div>
          {selectedRegion !== 'all' && (
            <button
              onClick={() => onSelectRegion('all')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl"
            >
              전체 권역 필터 해제
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGIONS.map((region) => {
            const isSelected = selectedRegion === region.id;
            return (
              <div
                key={region.id}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-400 ring-2 ring-blue-200 shadow-xs'
                    : 'bg-slate-50/60 hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() =>
                        onSelectRegion(isSelected ? 'all' : region.id)
                      }
                      className="text-left group"
                    >
                      <span
                        className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1 ${region.badgeBg} ${region.badgeText}`}
                      >
                        권역 {region.number} · {region.nameEn}
                      </span>
                      <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {region.fullTitle}
                      </h4>
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                    {region.description}
                  </p>
                  <div className="text-[11px] text-slate-500 bg-white/80 rounded-lg p-2.5 border border-slate-200/60 mb-3 space-y-1">
                    <div>
                      <strong className="text-slate-700">역사 배경:</strong>{' '}
                      {region.historicalContext}
                    </div>
                    <div>
                      <strong className="text-slate-700">경제 중심:</strong>{' '}
                      {region.economicContext}
                    </div>
                  </div>
                </div>

                {/* 소속 주 버튼들 */}
                <div className="pt-2.5 border-t border-slate-200/70 flex flex-wrap gap-1.5">
                  {region.statePostalCodes.map((postal) => {
                    const stId = POSTAL_TO_ID_MAP[postal];
                    const st = stId ? STATE_MAP[stId] : null;
                    if (!st) return null;
                    return (
                      <button
                        key={postal}
                        onClick={() => onSelectState(st.id, null)}
                        className="px-2 py-1 rounded-lg bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200/90 hover:border-blue-600 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                      >
                        <span
                          className={
                            st.isCapitalLargest ? 'text-amber-500' : 'text-rose-500'
                          }
                        >
                          ★
                        </span>
                        <span>{st.shortNameKo}</span>
                        <span className="text-[10px] opacity-65">({st.postal})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 가장 많이 헷갈리는 미국 지명 & 행정구역 상식 배너 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              가장 많이 헷갈리는 미국 주·도시 지명 TOP 5
            </h3>
          </div>
          <button
            onClick={onOpenHierarchyModal}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            18×18 타 주 동명 도시 전체 매트릭스 보기 <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {CONFUSING_NAME_CASES.map((item, idx) => {
            const relatedIds = Array.from(
              new Set([item.leftItem.stateId, item.rightItem.stateId])
            );
            return (
              <div
                key={idx}
                className="rounded-xl p-3.5 bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded mb-1.5">
                    {item.badge}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {item.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-200/60">
                  {relatedIds.map((sid) => {
                    const st = STATE_MAP[sid];
                    if (!st) return null;
                    return (
                      <button
                        key={sid}
                        onClick={() => onSelectState(sid, null)}
                        className="text-[11px] font-bold px-2 py-0.5 rounded bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 transition-colors"
                      >
                        {st.shortNameKo}({st.postal}) 보기
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
