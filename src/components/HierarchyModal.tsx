import React, { useState } from 'react';
import {
  HIERARCHY_LEVELS,
  MATRIX_HOST_COLUMNS,
  MATRIX_STATE_NAME_ROWS,
  CONFUSING_NAME_CASES,
  STATE_MAP,
} from '../data/statesData';
import {
  X,
  Layers,
  Grid,
  HelpCircle,
  ArrowRight,
  Info,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface HierarchyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectState: (id: string) => void;
}

export const HierarchyModal: React.FC<HierarchyModalProps> = ({
  isOpen,
  onClose,
  onSelectState,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'hierarchy' | 'confusing'>('matrix');
  const [selectedCell, setSelectedCell] = useState<{
    rowIdx: number;
    hostStateId: string;
  } | null>({ rowIdx: 0, hostStateId: 'oh' });

  if (!isOpen) return null;

  const activeRow =
    selectedCell !== null ? MATRIX_STATE_NAME_ROWS[selectedCell.rowIdx] : null;
  const activeIntersection =
    activeRow && selectedCell
      ? activeRow.targetHostStates.find((it) => it.hostStateId === selectedCell.hostStateId)
      : null;
  const activeHostCol =
    selectedCell !== null
      ? MATRIX_HOST_COLUMNS.find((c) => c.stateId === selectedCell.hostStateId)
      : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                미국 행정체계 위계 & ‘어느 주 이름이, 어느 주로 흩어졌나’ 매트릭스
              </h2>
              <p className="text-xs text-slate-300">
                연방·주·카운티·자치시 4단계 구조와 타 주에 흩어진 동명(同名) 도시 18×18 교차표
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

        {/* 상단 탭 전환 바 */}
        <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-emerald-400" />
            ① 어느 주 이름이, 어느 주로 흩어졌나 (18×18 매트릭스)
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'hierarchy'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            ② 미국 연방·주·카운티·시 4단계 행정체계
          </button>

          <button
            onClick={() => setActiveTab('confusing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'confusing'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            ③ 헷갈리는 미국 주·도시 지명 TOP 5 해설
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/50">
          {/* 탭 1: Threads 이미지 2의 18x18 매트릭스 완벽 재현 */}
          {activeTab === 'matrix' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-emerald-800/50 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 rounded-full mb-1.5">
                      <Sparkles className="w-3 h-3" /> Threads 인포그래픽 2 원문 데이터 인터랙티브 복원
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">
                      어느 주 이름이, 어느 주로 흩어졌나 (18×18 교차 매트릭스)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-3xl">
                      미국에는 다른 주의 이름을 그대로 도시(City/Town) 이름으로 쓰는 곳이 매우 많습니다.
                      예컨대 <strong className="text-emerald-300">‘와이오밍(Wyoming)’</strong>과{' '}
                      <strong className="text-emerald-300">‘워싱턴(Washington)’</strong>은 각각 5개 주에
                      동명 도시가 분포하며, 반대로{' '}
                      <strong className="text-amber-300">일리노이주(IL, 5개)</strong>와{' '}
                      <strong className="text-amber-300">오하이오·미주리·펜실베이니아·뉴욕주(각 4개)</strong>는
                      다른 주 이름을 딴 도시를 가장 많이 보유한 주입니다. 표의 초록색 점(
                      <span className="text-emerald-400 font-black">●</span>)을 클릭해 실제 도시 정보와 유래를 확인하세요!
                    </p>
                  </div>
                </div>

                {/* 선택된 교차점 상세 스포트라이트 */}
                {activeRow && activeIntersection && activeHostCol && (
                  <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-extrabold bg-emerald-400 text-slate-950 px-2 py-0.5 rounded">
                          {activeIntersection.isSelfMatch
                            ? '자기 주 내부 동명 도시 (유일 사례)'
                            : '타 주 소재 동명 도시'}
                        </span>
                        <span className="text-sm font-black text-white">
                          ‘{activeRow.stateNameKo}({activeRow.stateNameEn})’ 이름을 쓰는 도시 →{' '}
                          <span className="text-amber-300">
                            {activeHostCol.stateKo}주({activeHostCol.stateId.toUpperCase()})에 위치
                          </span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-200">
                        📍 <strong>{activeIntersection.cityDetail}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectState(activeRow.originStateId);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
                      >
                        원래 주 ({activeRow.stateNameKo}주) 보기
                      </button>
                      <button
                        onClick={() => {
                          onSelectState(activeHostCol.stateId);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors flex items-center gap-1"
                      >
                        도시 소재 주 ({activeHostCol.stateKo}주) 이동
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 18 x 18 인터랙티브 테이블 */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
                <table className="w-full border-collapse text-center min-w-[820px]">
                  <thead>
                    <tr className="bg-slate-900 text-white text-[11px]">
                      <th className="py-2.5 px-3 text-left font-extrabold sticky left-0 bg-slate-900 z-10 border-r border-slate-700">
                        도시로 쓰인 주 이름 \ 소재 주
                      </th>
                      <th className="py-2.5 px-2 font-extrabold text-amber-300 border-r border-slate-700 w-14">
                        분포 수
                      </th>
                      {MATRIX_HOST_COLUMNS.map((col) => {
                        const isColSelected = selectedCell?.hostStateId === col.stateId;
                        return (
                          <th
                            key={col.stateId}
                            className={`py-2 px-1.5 font-bold border-r border-slate-800 transition-colors ${
                              isColSelected ? 'bg-emerald-800 text-amber-300' : ''
                            }`}
                            title={`${col.stateKo} (${col.stateEn})`}
                          >
                            <div className="text-[11px] font-black">
                              {col.stateId.toUpperCase()}
                            </div>
                            <div className="text-[9px] text-slate-300 font-medium truncate max-w-[44px] mx-auto">
                              {col.stateKo}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {MATRIX_STATE_NAME_ROWS.map((row, rIdx) => {
                      const isRowSelected = selectedCell?.rowIdx === rIdx;
                      return (
                        <tr
                          key={row.stateNameEn}
                          className={
                            isRowSelected ? 'bg-emerald-50/70' : 'hover:bg-slate-50/90'
                          }
                        >
                          <td className="py-2 px-3 text-left font-extrabold text-slate-900 sticky left-0 bg-white border-r border-slate-200 z-10">
                            <div className="flex items-center justify-between gap-1">
                              <span>{row.stateNameKo}</span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {row.stateNameEn}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-2 font-black text-emerald-700 bg-emerald-50/50 border-r border-slate-200">
                            {row.spreadCount}곳
                          </td>
                          {MATRIX_HOST_COLUMNS.map((col) => {
                            const hit = row.targetHostStates.find(
                              (it) => it.hostStateId === col.stateId
                            );
                            const isSelected =
                              selectedCell?.rowIdx === rIdx &&
                              selectedCell?.hostStateId === col.stateId;
                            return (
                              <td
                                key={col.stateId}
                                className={`py-1.5 px-1 border-r border-slate-100 ${
                                  hit
                                    ? 'cursor-pointer hover:bg-emerald-100/80'
                                    : ''
                                } ${
                                  isSelected
                                    ? 'bg-emerald-200/90 ring-2 ring-inset ring-emerald-600'
                                    : ''
                                }`}
                                onClick={() => {
                                  if (hit) {
                                    setSelectedCell({
                                      rowIdx: rIdx,
                                      hostStateId: col.stateId,
                                    });
                                  }
                                }}
                                title={hit ? hit.cityDetail : undefined}
                              >
                                {hit ? (
                                  <span
                                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-black transition-transform ${
                                      isSelected
                                        ? 'bg-emerald-700 text-white scale-110 shadow-xs'
                                        : hit.isSelfMatch
                                        ? 'bg-amber-400/30 text-amber-700 hover:scale-110'
                                        : 'bg-emerald-500/20 text-emerald-600 hover:scale-110'
                                    }`}
                                  >
                                    ●
                                  </span>
                                ) : (
                                  <span className="text-slate-200 text-[10px]">·</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-extrabold text-xs border-t-2 border-slate-300">
                      <td className="py-2.5 px-3 text-left text-slate-800 sticky left-0 bg-slate-100 border-r border-slate-200">
                        해당 주가 보유한 타 주 이름 도시 합계
                      </td>
                      <td className="py-2.5 px-2 text-emerald-800 bg-emerald-100/70 border-r border-slate-200">
                        총 37곳
                      </td>
                      {MATRIX_HOST_COLUMNS.map((col) => (
                        <td
                          key={col.stateId}
                          className="py-2.5 px-1 text-slate-900 border-r border-slate-200"
                        >
                          {col.hostedCount}
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* 탭 2: 미국 연방·주·카운티·자치시 4단계 행정구역 위계 */}
          {activeTab === 'hierarchy' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  미국은 50개 주가 각자의 헌법·삼권분립을 갖춘{' '}
                  <strong className="text-slate-900">연방공화국(Federal Republic)</strong>입니다.
                  한국의 중앙집권적 광역·기초자치단체 위계와 달리, 주(State) 아래에{' '}
                  <strong className="text-blue-800">카운티(County, 광역 자치군)</strong>가 있고,
                  주민들이 자치 헌장(Charter)을 제정해 법인화한 구역만{' '}
                  <strong className="text-blue-800">시·타운(Incorporated Municipality)</strong>이 됩니다.
                </div>
              </div>

              <div className="space-y-4">
                {HIERARCHY_LEVELS.map((tier) => (
                  <div
                    key={tier.level}
                    className={`rounded-2xl border p-5 ${tier.colorClass} ${tier.borderClass}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-xs font-black px-2.5 py-1 rounded-lg ${tier.badgeClass}`}
                        >
                          STEP {tier.level}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {tier.titleKo}{' '}
                          <span className="text-xs sm:text-sm font-bold text-slate-500">
                            ({tier.titleEn})
                          </span>
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/80">
                        🇰🇷 한국 비유: {tier.koreaComparison}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3.5">{tier.subtitle}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tier.units.map((u, idx) => (
                        <div
                          key={idx}
                          className={`bg-white rounded-xl p-3.5 border shadow-2xs ${
                            u.isSpecial ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200/80'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-extrabold text-slate-900 text-sm">
                              {u.nameKo}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {u.nameEn}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-2">
                            {u.description}
                          </p>
                          <div className="text-[11px] font-bold text-blue-800 bg-blue-50/70 px-2.5 py-1 rounded-lg">
                            예시: {u.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 탭 3: 헷갈리는 미국 주·도시 지명 TOP 5 */}
          {activeTab === 'confusing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONFUSING_NAME_CASES.map((item, idx) => {
                  const relatedIds = Array.from(
                    new Set([item.leftItem.stateId, item.rightItem.stateId])
                  );
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-base font-black text-slate-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                          {item.summary}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                            <div className="text-xs font-extrabold text-slate-900 mb-1">
                              ① {item.leftItem.name}
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {item.leftItem.desc}
                            </p>
                          </div>
                          <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-200/80">
                            <div className="text-xs font-extrabold text-blue-950 mb-1">
                              ② {item.rightItem.name}
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {item.rightItem.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                        {relatedIds.map((sid) => {
                          const st = STATE_MAP[sid];
                          if (!st) return null;
                          return (
                            <button
                              key={sid}
                              onClick={() => {
                                onSelectState(sid);
                                onClose();
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center gap-1"
                            >
                              [{st.postal}] {st.nameKo} 상세 보기
                              <ArrowRight className="w-3.5 h-3.5" />
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
        </div>
      </div>
    </div>
  );
};
