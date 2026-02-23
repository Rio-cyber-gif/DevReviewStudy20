import React, { useState } from 'react';
import { BookOpen, CheckCircle2, CircleDashed, Home, RotateCcw } from 'lucide-react';

const Sidebar = ({ missions, currentMissionId, completedMissions, onSelectMission, onOpenTutorial, onOpenTerms, onOpenPrivacy, onGoHome, onReset }) => {
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    const handleResetConfirm = () => {
        setShowResetConfirm(false);
        onReset();
    };

    return (
        <>
            {/* リセット確認ダイアログ */}
            {showResetConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)} />
                    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 max-w-md w-full relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/40">
                                <RotateCcw className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-200">学習記録をリセット</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            学習記録をすべて消去して、最初からやり直しますか？<br />
                            <span className="text-red-400 text-xs font-bold">※ この操作は取り消せません。進捗・スコアがすべて初期化されます。</span>
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleResetConfirm}
                                className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 transition-all cursor-pointer"
                            >
                                リセット実行
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <aside className="w-80 h-full bg-slate-950/95 backdrop-blur-md border-r border-slate-800 flex flex-col font-mono text-sm overflow-hidden z-20 shadow-2xl shrink-0">
                {/* ヘッダー */}
                <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={onGoHome}
                            className="text-xl font-bold text-indigo-400 flex items-center gap-2 hover:text-indigo-300 transition-colors cursor-pointer"
                            title="ダッシュボードへ戻る"
                        >
                            <BookOpen className="w-6 h-6" />
                            論理検証ラボ
                        </button>
                        <button
                            onClick={onGoHome}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer pointer-events-auto"
                            title="ダッシュボードへ戻る"
                        >
                            <Home className="w-3.5 h-3.5" />
                            ホーム
                        </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Logic Verification Lab</div>
                </div>

                {/* ミッションリスト */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                    {missions.map((mission) => {
                        const isCompleted = completedMissions.includes(mission.id);
                        const isActive = currentMissionId === mission.id;
                        const isLocked = mission.id > 1 && !completedMissions.includes(mission.id - 1) && mission.id !== currentMissionId;

                        return (
                            <button
                                key={mission.id}
                                onClick={() => !isLocked && onSelectMission(mission.id)}
                                disabled={isLocked}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden tracking-tight border-l-4
                    ${isActive
                                        ? 'bg-slate-800 border-indigo-500 text-white shadow-lg'
                                        : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
                    ${isLocked ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}
                  `}
                            >
                                <div className="flex justify-between items-start relative z-10 mb-2">
                                    <span className={`font-black text-sm opacity-90 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                                        ステップ {String(mission.id).padStart(2, '0')}
                                    </span>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    ) : (
                                        <CircleDashed className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-700'}`} />
                                    )}
                                </div>

                                <h3 className={`font-bold mt-1 relative z-10 leading-snug ${isActive ? 'text-white text-base' : isCompleted ? 'text-emerald-300' : 'text-slate-300'}`}>
                                    {mission.title}
                                </h3>
                            </button>
                        );
                    })}
                </div>

                {/* フッター */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex flex-col gap-3 relative z-30">
                    {/* リセットボタン */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowResetConfirm(true); }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer pointer-events-auto"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        進捗をリセット
                    </button>

                    <div className="text-[10px] text-center text-slate-500 tracking-widest font-black uppercase">
                        Logic Verification - Online
                    </div>
                    <div className="flex justify-center gap-4 text-xs font-sans tracking-normal font-normal text-slate-500">
                        <button onClick={(e) => { e.stopPropagation(); onOpenTerms(); }} className="hover:text-white transition-colors cursor-pointer pointer-events-auto">利用規約</button>
                        <button onClick={(e) => { e.stopPropagation(); onOpenPrivacy(); }} className="hover:text-white transition-colors cursor-pointer pointer-events-auto">プライバシーポリシー</button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
