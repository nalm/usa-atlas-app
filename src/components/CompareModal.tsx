import React from 'react';
import {
  ALL_STATES,
  STATE_MAP,
  REGION_MAP,
  POPULATION_RANK,
  AREA_RANK,
  GDP_RANK,
  ELECTORAL_RANK,
  COMPARE_PRESETS,
  formatPop,
  formatArea,
  formatGdp,
} from '../data/statesData';
import { X, Scale, Sparkles, Trash2, ArrowRight } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: string[];
  onSetCompareList: (ids: string[]) => void;
  onSelectState: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onSetCompareList,
  onSelectState,
}) => {
  if (!isOpen) return null;

  const states = compareList.map((id) => STATE_MAP[id]).filter(Boolean);

  const handleAddOrReplace = (slotIdx: number, newId: string) => {
    if (!newId) return;
    const next = [...compareList];
    if (next.includes(newId)) return;
    if (slotIdx < next.length) {
      next[slotIdx] = newId;
    } else if (next.length < 3) {
      next.push(newId);
    }
    onSetCompareList(next);
  };

  const handleRemove = (id: string) => {
    onSetCompareList(compareList.filter((item) => item !== id));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                미국 주·연방수도 1:1:1 입체 비교함 (최대 3곳)
              </h2>
              <p className="text-xs text-slate-300">
                주도 vs 최대도시, 인구·면적·1인당 GDP·선거인단·역사·핵심 산업을 나란히 비교합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 추천 프리셋 바 */}
        <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            테마별 추천 비교 조합 (클릭 시 즉시 적용):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMPARE_PRESETS.map((preset, idx) => {
              const isCurrent =
                preset.ids.length === compareList.length &&
                preset.ids.every((id, i) => compareList[i] === id);
              return (
                <button
                  key={idx}
                  onClick={() => onSetCompareList(preset.ids)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white hover:bg-blue-50 text-slate-700 border-slate-200/90'
                  }`}
                  title={preset.desc}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 슬롯 선택 및 비교 본문 */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-5">
          {/* 3개 슬롯 드롭다운 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((slotIdx) => {
              const st = states[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      비교 슬롯 #{slotIdx + 1}
                    </label>
                    <select
                      value={st?.id || ''}
                      onChange={(e) => handleAddOrReplace(slotIdx, e.target.value)}
                      className="w-full text-xs sm:text-sm font-extrabold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">+ 주 선택...</option>
                      {ALL_STATES.map((item) => (
                        <option key={item.id} value={item.id}>
                          [{item.postal}] {item.nameKo} ({item.nameEn})
                        </option>
                      ))}
                    </select>
                  </div>
                  {st && (
                    <button
                      onClick={() => handleRemove(st.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors mt-4"
                      title="슬롯 비우기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {states.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-bold text-slate-500">
                상단 추천 프리셋을 클릭하거나 드롭다운에서 비교할 주를 선택해 주세요.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {states.map((st) => {
                const region = REGION_MAP[st.regionId];
                return (
                  <div
                    key={st.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* 카드 상단 */}
                      <div className="bg-slate-900 text-white p-4">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${region.badgeBg} ${region.badgeText}`}
                          >
                            {region.nameKo}
                          </span>
                          <span className="text-[11px] font-bold text-amber-300">
                            {st.statehoodOrder > 0
                              ? `연방 가입 #${st.statehoodOrder} (${st.statehoodYear})`
                              : `연방 수도 (${st.statehoodYear})`}
                          </span>
                        </div>
                        <h3 className="text-lg font-black">
                          [{st.postal}] {st.nameKo}{' '}
                          <span className="text-xs font-semibold text-slate-300">
                            {st.nameEn}
                          </span>
                        </h3>
                        <p className="text-[11px] text-amber-200/90 mt-1 line-clamp-2">
                          {st.slogan}
                        </p>
                      </div>

                      {/* 비교 항목들 */}
                      <div className="p-4 space-y-3 text-xs divide-y divide-slate-100">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">
                            ★ 주도 vs ● 최대도시 구조
                          </div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                                st.isCapitalLargest
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {st.isCapitalLargest ? '★ 주도=최대도시 일치' : '★ 주도≠최대도시 분리'}
                            </span>
                          </div>
                          <div className="font-bold text-slate-800">
                            ★ 주도: {st.capitalKo} ({st.capitalPopText})
                          </div>
                          <div className="font-bold text-blue-800">
                            ● 최대도시: {st.largestCityKo} ({st.largestCityPopText})
                          </div>
                        </div>

                        <div className="pt-2.5 grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              주 전체 인구
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              {formatPop(st.populationMan)}
                            </span>
                            <span className="text-[10px] text-blue-600 font-bold block">
                              전국 {POPULATION_RANK[st.id]}위
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              면적
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              {formatArea(st.areaKm2)}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold block">
                              전국 {AREA_RANK[st.id]}위
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              1인당 GDP
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              {formatGdp(st.gdpPerCapitaUsd)}
                            </span>
                            <span className="text-[10px] text-amber-600 font-bold block">
                              전국 {GDP_RANK[st.id]}위
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block">
                              대선 선거인단
                            </span>
                            <span className="font-extrabold text-slate-900 text-sm">
                              {st.electoralVotes}명 (#{ELECTORAL_RANK[st.id]})
                            </span>
                            <span className="text-[10px] text-indigo-600 font-bold block">
                              {st.politicalLean.split(' ')[0]}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2.5">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            수록 주요 도시 ({st.cities.length}곳)
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {st.cities.map((c) => (
                              <span
                                key={c.id}
                                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]"
                              >
                                {c.role === 'major' ? '●' : '★'}
                                {c.nameKo}({c.populationText.replace('약 ', '')})
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            핵심 산업
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {st.keyIndustries.map((ind, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 font-semibold text-[11px]"
                              >
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2.5">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">
                            미국사적 위상
                          </span>
                          <p className="text-slate-600 leading-relaxed">
                            {st.historicalRoleSummary}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100">
                      <button
                        onClick={() => {
                          onSelectState(st.id);
                          onClose();
                        }}
                        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1"
                      >
                        {st.nameKo} 전체 리포트로 이동
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
