import React, { useState, useMemo } from 'react';
import { RegionId } from '../types/atlas';
import {
  ALL_STATES,
  REGIONS,
  REGION_MAP,
  formatPop,
  formatArea,
  formatGdp,
} from '../data/statesData';
import {
  X,
  BarChart3,
  ArrowUpDown,
  Search,
  Star,
} from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (id: string) => void;
}

type SortKey =
  | 'populationMan'
  | 'areaKm2'
  | 'gdpPerCapitaUsd'
  | 'electoralVotes'
  | 'statehoodYear';

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  onSelectState,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('populationMan');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [regionFilter, setRegionFilter] = useState<RegionId | 'all'>('all');
  const [capitalFilter, setCapitalFilter] = useState<'all' | 'gold' | 'separated'>('all');
  const [keyword, setKeyword] = useState<string>('');

  const regionStats = useMemo(() => {
    return REGIONS.map((r) => {
      const states = ALL_STATES.filter((s) => s.regionId === r.id);
      const totalPop = states.reduce((acc, s) => acc + s.populationMan, 0);
      const totalArea = states.reduce((acc, s) => acc + s.areaKm2, 0);
      const totalEv = states.reduce((acc, s) => acc + s.electoralVotes, 0);
      const avgGdp = Math.round(
        states.reduce((acc, s) => acc + s.gdpPerCapitaUsd, 0) / states.length
      );
      return {
        ...r,
        count: states.length,
        totalPop,
        totalArea,
        totalEv,
        avgGdp,
      };
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return ALL_STATES.filter((s) => {
      if (regionFilter !== 'all' && s.regionId !== regionFilter) return false;
      if (capitalFilter === 'gold' && !s.isCapitalLargest) return false;
      if (capitalFilter === 'separated' && s.isCapitalLargest) return false;
      if (q) {
        const hit =
          s.nameKo.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q) ||
          s.postal.toLowerCase().includes(q) ||
          s.capitalKo.toLowerCase().includes(q) ||
          s.largestCityKo.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    }).sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortAsc ? diff : -diff;
    });
  }, [regionFilter, capitalFilter, keyword, sortKey, sortAsc]);

  if (!isOpen) return null;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(key === 'statehoodYear');
    }
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
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                미국 6대 권역 & 50개 주 + 워싱턴 D.C. 총괄 통계·순위표
              </h2>
              <p className="text-xs text-slate-300">
                인구·면적·1인당 GDP·대선 선거인단(총 538명)·연방 가입순·주도=최대도시 일치 여부 정렬
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

        {/* 본문 */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50 space-y-5">
          {/* 6대 권역 요약 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {regionStats.map((r) => {
              const isSelected = regionFilter === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRegionFilter(isSelected ? 'all' : r.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : `${r.badgeBg} ${r.badgeText}`
                      }`}
                    >
                      {r.nameKo}
                    </span>
                    <span className="text-[10px] font-bold opacity-75">
                      {r.count}곳
                    </span>
                  </div>
                  <div className="text-xs font-extrabold mt-1">
                    인구 {formatPop(Math.round(r.totalPop))}
                  </div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    선거인단 {r.totalEv}명 · 평균 {formatGdp(r.avgGdp)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 필터 및 검색 컨트롤 바 */}
          <div className="bg-white rounded-xl p-3.5 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setCapitalFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  capitalFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                전체 (51곳)
              </button>
              <button
                onClick={() => setCapitalFilter('gold')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                  capitalFilter === 'gold'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <Star className="w-3 h-3" /> ★ 주도 = 최대도시 (18곳)
              </button>
              <button
                onClick={() => setCapitalFilter('separated')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  capitalFilter === 'separated'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                ★ 주도 ≠ 최대도시 분리 (33곳)
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="주 이름, 약어, 주도, 최대도시 검색..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 51개 주 + D.C. 정렬 테이블 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[860px]">
              <thead>
                <tr className="bg-slate-900 text-white text-xs">
                  <th className="py-3 px-3 font-extrabold w-12 text-center">#</th>
                  <th className="py-3 px-3 font-extrabold">주 이름 (약어)</th>
                  <th className="py-3 px-3 font-extrabold">권역</th>
                  <th className="py-3 px-3 font-extrabold">★ 주도 (인구)</th>
                  <th className="py-3 px-3 font-extrabold">● 최대도시 (인구)</th>
                  <th
                    className="py-3 px-3 font-extrabold cursor-pointer hover:text-amber-300"
                    onClick={() => handleSort('populationMan')}
                  >
                    <span className="inline-flex items-center gap-1">
                      주 전체 인구 <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="py-3 px-3 font-extrabold cursor-pointer hover:text-amber-300"
                    onClick={() => handleSort('areaKm2')}
                  >
                    <span className="inline-flex items-center gap-1">
                      면적 <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="py-3 px-3 font-extrabold cursor-pointer hover:text-amber-300"
                    onClick={() => handleSort('gdpPerCapitaUsd')}
                  >
                    <span className="inline-flex items-center gap-1">
                      1인당 GDP <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="py-3 px-3 font-extrabold cursor-pointer hover:text-amber-300"
                    onClick={() => handleSort('electoralVotes')}
                  >
                    <span className="inline-flex items-center gap-1">
                      선거인단 <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="py-3 px-3 font-extrabold cursor-pointer hover:text-amber-300"
                    onClick={() => handleSort('statehoodYear')}
                  >
                    <span className="inline-flex items-center gap-1">
                      연방 가입 <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredAndSorted.map((st, idx) => {
                  const region = REGION_MAP[st.regionId];
                  return (
                    <tr
                      key={st.id}
                      onClick={() => {
                        onSelectState(st.id);
                        onClose();
                      }}
                      className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-extrabold text-slate-900">
                        <span className="inline-block w-7 text-center text-[11px] font-black bg-slate-100 text-slate-700 rounded py-0.5 mr-1.5">
                          {st.postal}
                        </span>
                        {st.nameKo}{' '}
                        <span className="text-[11px] text-slate-400 font-normal">
                          {st.nameEn}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${region.badgeBg} ${region.badgeText}`}
                        >
                          {region.nameKo}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold">
                        <span
                          className={
                            st.isCapitalLargest ? 'text-amber-500' : 'text-rose-500'
                          }
                        >
                          ★
                        </span>{' '}
                        {st.capitalKo}{' '}
                        <span className="text-[11px] text-slate-400 font-medium">
                          ({st.capitalPopText.replace('약 ', '')})
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold">
                        {st.isCapitalLargest ? (
                          <span className="text-[11px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            ★ 주도와 동일
                          </span>
                        ) : (
                          <>
                            <span className="text-blue-600">●</span> {st.largestCityKo}{' '}
                            <span className="text-[11px] text-slate-400 font-medium">
                              ({st.largestCityPopText.replace('약 ', '')})
                            </span>
                          </>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-extrabold text-slate-900">
                        {formatPop(st.populationMan)}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-700">
                        {formatArea(st.areaKm2)}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        {formatGdp(st.gdpPerCapitaUsd)}
                      </td>
                      <td className="py-2.5 px-3 font-extrabold text-indigo-700">
                        {st.electoralVotes}명
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-medium">
                        {st.statehoodOrder > 0
                          ? `#${st.statehoodOrder} (${st.statehoodYear}년)`
                          : `수도 (${st.statehoodYear}년)`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
