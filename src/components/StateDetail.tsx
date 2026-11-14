import React from 'react';
import { StateInfo } from '../types/atlas';
import {
  REGION_MAP,
  POPULATION_RANK,
  AREA_RANK,
  GDP_RANK,
  ELECTORAL_RANK,
  formatPop,
  formatArea,
  formatGdp,
} from '../data/statesData';
import {
  MapPin,
  Users,
  Maximize2,
  Coins,
  Vote,
  Landmark,
  History,
  Award,
  Sparkles,
  Building2,
  Utensils,
  Compass,
  Scale,
  X,
  Check,
  Plus,
  Flag,
  Star,
  Globe2,
} from 'lucide-react';

interface StateDetailProps {
  state: StateInfo;
  selectedCityId: string | null;
  onSelectCity: (cityId: string | null) => void;
  onClose: () => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
  onOpenCompareModal: () => void;
}

export const StateDetail: React.FC<StateDetailProps> = ({
  state,
  selectedCityId,
  onSelectCity,
  onClose,
  compareList,
  onToggleCompare,
  onOpenCompareModal,
}) => {
  const region = REGION_MAP[state.regionId];
  const popRank = POPULATION_RANK[state.id];
  const areaRank = AREA_RANK[state.id];
  const gdpRank = GDP_RANK[state.id];
  const electoralRank = ELECTORAL_RANK[state.id];
  const isCompared = compareList.includes(state.id);

  const focusedCity =
    state.cities.find((c) => c.id === selectedCityId) || state.cities[0] || null;

  return (
    <div
      id="state-detail-section"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-md overflow-hidden animate-fade-in scroll-mt-24"
    >
      {/* 상단 헤더 배너 */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${region.badgeBg} ${region.badgeText}`}
              >
                {region.nameKo} ({region.nameEn})
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-xs">
                {state.type} · 우편약어 {state.postal}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {state.statehoodOrder > 0
                  ? `연방 가입 #${state.statehoodOrder} (${state.statehoodYear}년)`
                  : `연방 수도 설치 (${state.statehoodYear}년)`}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-200 border border-sky-400/30">
                별칭: {state.nicknameKo}
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {state.nameKo}
              </h2>
              <span className="text-lg sm:text-xl font-bold text-slate-300">
                {state.nameEn}
              </span>
              <span className="text-sm font-extrabold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md">
                {state.postal}
              </span>
            </div>

            <p className="mt-1.5 text-sm text-amber-300/95 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 shrink-0" />
              {state.slogan}
            </p>
          </div>

          {/* 우측 비교함 추가 & 닫기 버튼 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(state.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isCompared
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  비교함에 담김 ({compareList.length}/3)
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  비교함 추가 ({compareList.length}/3)
                </>
              )}
            </button>

            {compareList.length >= 2 && (
              <button
                onClick={onOpenCompareModal}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
              >
                <Scale className="w-3.5 h-3.5" />
                비교 보기
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="선택 해제"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 핵심 지표 4단 그리드 (인구 / 면적 / 1인당 GDP / 대선 선거인단) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-sky-400" /> 주 전체 인구
              </span>
              <span className="text-[11px] font-bold text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded">
                전국 {popRank}위 / 51
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold">
              {formatPop(state.populationMan)}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              최대도시: {state.largestCityKo} ({state.largestCityPopText})
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" /> 면적
              </span>
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                전국 {areaRank}위 / 51
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold">
              {formatArea(state.areaKm2)}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              남한 면적 대비 약 {(state.areaKm2 / 100210).toFixed(1)}배
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" /> 1인당 GDP
              </span>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">
                전국 {gdpRank}위 / 51
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold">
              {formatGdp(state.gdpPerCapitaUsd)}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              명목 1인당 지역내총생산 기준
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Vote className="w-3.5 h-3.5 text-rose-400" /> 대선 선거인단
              </span>
              <span className="text-[11px] font-bold text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded">
                전국 {electoralRank}위
              </span>
            </div>
            <div className="text-base sm:text-lg font-extrabold">
              {state.electoralVotes}명{' '}
              <span className="text-xs font-semibold text-slate-300">
                (전체의 {((state.electoralVotes / 538) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="text-[11px] text-amber-200 font-semibold mt-0.5">
              {state.politicalLean}
            </div>
          </div>
        </div>
      </div>

      {/* ★ 주도 vs 최대도시 스토리 배너 (Threads 인포그래픽 핵심 테마) */}
      <div
        className={`px-5 sm:px-6 py-4 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
          state.isCapitalLargest
            ? 'bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-50/40 border-amber-200'
            : 'bg-gradient-to-r from-slate-50 via-rose-50/40 to-blue-50/40 border-slate-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-lg shadow-xs ${
              state.isCapitalLargest
                ? 'bg-amber-400 text-slate-950'
                : 'bg-rose-600 text-white'
            }`}
          >
            ★
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                  state.isCapitalLargest
                    ? 'bg-amber-200/80 text-amber-950'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {state.isCapitalLargest
                  ? '★ 골드스타 주 (주도 = 주내 최대도시, 18곳 중 하나)'
                  : '★ 주도 ≠ 최대도시 분리형 (33곳 중 하나)'}
              </span>
              <span className="text-xs font-bold text-slate-700">
                주도(Capital):{' '}
                <strong className="text-slate-950">
                  {state.capitalKo} ({state.capitalEn}, {state.capitalPopText})
                </strong>
              </span>
              {!state.isCapitalLargest && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-bold text-blue-800">
                    최대도시(Largest):{' '}
                    <strong className="text-blue-950">
                      {state.largestCityKo} ({state.largestCityEn}, {state.largestCityPopText})
                    </strong>
                  </span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {state.capitalStory}
            </p>
          </div>
        </div>
      </div>

      {/* 주내 주요 도시 퀵 셀렉터 탭 바 (클릭 시 도시 스포트라이트 전환) */}
      <div className="bg-slate-100/80 px-5 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 mr-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          {state.shortNameKo} 핵심 도시 ({state.cities.length}곳):
        </span>
        {state.cities.map((city) => {
          const isFocused = focusedCity?.id === city.id;
          return (
            <button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isFocused
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90'
              }`}
            >
              <span
                className={
                  city.role === 'capital_largest'
                    ? 'text-amber-400'
                    : city.role === 'capital'
                    ? 'text-rose-500'
                    : 'text-blue-500'
                }
              >
                {city.role === 'major' ? '●' : '★'}
              </span>
              <span>{city.nameKo}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isFocused
                    ? 'bg-white/15 text-amber-300'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {city.populationText}
              </span>
            </button>
          );
        })}
      </div>

      {/* 본문 3단 대시보드 */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/50">
        {/* 좌측 컬럼 (4칸): 선택된 도시 스포트라이트 + 전체 주요 도시 리스트 + 지리·산업 특성 */}
        <div className="lg:col-span-4 space-y-5">
          {/* 선택된 도시 스포트라이트 카드 */}
          {focusedCity && (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 shadow-sm border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${
                    focusedCity.role === 'capital_largest'
                      ? 'bg-amber-400 text-slate-950'
                      : focusedCity.role === 'capital'
                      ? 'bg-rose-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {focusedCity.role === 'capital_largest'
                    ? '★ 주도 겸 최대도시'
                    : focusedCity.role === 'capital'
                    ? '★ 주도 (State Capital)'
                    : '● 주내 주요 대도시'}
                </span>
                <span className="text-xs font-extrabold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
                  시 인구 {focusedCity.populationText}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <h4 className="text-lg font-black">{focusedCity.nameKo}</h4>
                <span className="text-xs text-slate-300 font-semibold">
                  {focusedCity.nameEn}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {focusedCity.note}
              </p>
              {focusedCity.landmarks && focusedCity.landmarks.length > 0 && (
                <div className="pt-2.5 border-t border-white/15 flex flex-wrap gap-1.5">
                  {focusedCity.landmarks.map((lm, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-semibold bg-white/10 text-sky-200 px-2 py-0.5 rounded-md"
                    >
                      📍 {lm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 주내 주요 도시 일람 (Threads 이미지 1 수록 도시 전체) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-3">
              <Star className="w-4 h-4 text-amber-500" />
              {state.shortNameKo} 주요 도시 및 인구 ({state.cities.length}곳)
            </h3>
            <div className="space-y-2.5">
              {state.cities.map((city) => {
                const isSelected = focusedCity?.id === city.id;
                return (
                  <div
                    key={city.id}
                    onClick={() => onSelectCity(city.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-200'
                        : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-black ${
                            city.role === 'capital_largest'
                              ? 'text-amber-500'
                              : city.role === 'capital'
                              ? 'text-rose-600'
                              : 'text-blue-600'
                          }`}
                        >
                          {city.role === 'major' ? '●' : '★'}
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {city.nameKo}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {city.nameEn}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-800 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {city.populationText}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {city.note}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 지리·사회·경제 종합 특성 */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-2.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              지리·경제·사회적 특징
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
              {state.characteristicsSummary}
            </p>

            {state.economicBelts && state.economicBelts.length > 0 && (
              <div className="mb-3 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  소속 핵심 경제·산업 벨트
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {state.economicBelts.map((belt, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200"
                    >
                      ⚡ {belt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                주력 핵심 산업
              </span>
              <div className="flex flex-wrap gap-1.5">
                {state.keyIndustries.map((ind, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 중앙 컬럼 (4칸): 미국사에서의 역할 & 시대별 핵심 역사 연표 */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-2.5">
              <Landmark className="w-4 h-4 text-amber-600" />
              미국사에서의 위상과 역할
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60">
              {state.historicalRoleSummary}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-3.5">
              <History className="w-4 h-4 text-blue-600" />
              결정적 역사 타임라인
            </h3>
            <div className="relative pl-4 border-l-2 border-blue-200 space-y-4">
              {state.historicalEvents.map((ev, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
                  <span className="inline-block text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mb-1">
                    {ev.era}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    {ev.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측 컬럼 (4칸): 대표 인물, 한국/한인사 연고, 랜드마크·국립공원·향토 문화 */}
        <div className="lg:col-span-4 space-y-5">
          {/* 한국사 · 한인 디아스포라 · K-산업 연고 */}
          {state.koreanHistory && state.koreanHistory.length > 0 && (
            <div className="bg-gradient-to-br from-rose-50/90 via-white to-indigo-50/60 rounded-xl p-4 border border-rose-200/90 shadow-2xs">
              <h3 className="text-sm font-extrabold text-rose-950 flex items-center gap-1.5 mb-3">
                <Globe2 className="w-4 h-4 text-rose-600" />
                한국사 · 한인 사회 · K-산업 연고
              </h3>
              <div className="space-y-2.5">
                {state.koreanHistory.map((kh, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 rounded-xl p-3 border border-rose-100 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {kh.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {kh.year}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1">
                      {kh.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {kh.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 주요 역사·현대 인물 */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 mb-3">
              <Award className="w-4 h-4 text-indigo-600" />
              대표 배출·연고 인물
            </h3>
            <div className="space-y-3">
              {state.famousPeople.map((person, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm">
                        {person.name}
                      </span>{' '}
                      <span className="text-xs text-slate-500 font-medium">
                        ({person.nameEn})
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {person.connectionType} · {person.era}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-blue-700 mb-1">
                    {person.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {person.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 랜드마크 · 국립공원 · 향토 문화 */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 mb-2">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                대표 랜드마크 & 명소
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {state.landmarks.map((lm, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50/80 text-blue-900 border border-blue-200/60"
                  >
                    🏛️ {lm}
                  </span>
                ))}
              </div>
            </div>

            {state.nationalParksAndHeritage && state.nationalParksAndHeritage.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 mb-2">
                  <Flag className="w-3.5 h-3.5 text-emerald-600" />
                  국립공원 · 유네스코 · 자연유산
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {state.nationalParksAndHeritage.map((np, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/70"
                    >
                      🌲 {np}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 mb-2">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                향토 음식 · 스포츠 · 문화 상징
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {state.specialtyAndCulture.map((sp, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200/70"
                  >
                    🍔 {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
