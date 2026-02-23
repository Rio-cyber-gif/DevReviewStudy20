import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, ArrowLeft } from 'lucide-react';

const CertificateScreen = ({ onBackToDashboard }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] bg-slate-950 flex items-center justify-center overflow-hidden"
        >
            {/* Background glow effects — neon blue theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/8 rounded-full blur-[150px]" />
                <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/6 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-sky-400/6 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px]" />
            </div>

            {/* Certificate Card */}
            <motion.div
                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="relative z-10 max-w-2xl w-full mx-6"
            >
                {/* Outer border frame — neon cyan */}
                <div className="border-2 border-cyan-400/30 rounded-3xl p-1 bg-slate-900/50 backdrop-blur-md shadow-[0_0_80px_rgba(6,182,212,0.12)]">
                    <div className="border border-slate-700/50 rounded-2xl p-10 bg-slate-900/90 text-center relative overflow-hidden">

                        {/* Corner ornaments — cyan */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-lg" />

                        {/* Glowing diamond — neon blue */}
                        <motion.div
                            animate={{
                                scale: [1, 1.08, 1],
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="mx-auto mb-6 w-20 h-20 relative flex items-center justify-center"
                        >
                            <div className="absolute inset-0 rotate-45 border-2 border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.5)]" />
                            <Sparkles className="w-10 h-10 text-cyan-400 relative z-10 drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                        </motion.div>

                        {/* Title */}
                        <div className="text-[11px] uppercase tracking-[0.35em] text-cyan-400/60 font-bold mb-4">
                            Certificate of Completion
                        </div>
                        <h1 className="text-5xl font-black tracking-[0.18em] mb-1 bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]" style={{ fontFamily: "'Inter', sans-serif" }}>
                            MASTER LOGICIAN
                        </h1>
                        <div className="text-sm text-slate-500 font-mono tracking-wider mb-3">— 認定証 —</div>
                        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mx-auto mb-8" />

                        {/* Body */}
                        <p className="text-slate-300 text-base leading-relaxed mb-2">
                            論理検証ラボの全プログラムを完遂したことを証します。
                        </p>
                        <p className="text-cyan-400 text-lg font-bold mb-8">
                            20の論理を攻略しました
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center gap-10 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-black text-amber-400 font-mono">S</div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Rank</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-black text-cyan-400 font-mono">20 / 20</div>
                                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Completed</div>
                            </div>
                        </div>

                        {/* Award icon row */}
                        <div className="flex justify-center gap-2 mb-8">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + i * 0.15 }}
                                >
                                    <Award className="w-6 h-6 text-cyan-400/70" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Signature line */}
                        <div className="text-xs text-slate-600 font-mono mb-1">論理検証ラボ — Logic Verification Lab</div>
                        <div className="w-40 h-px bg-slate-700 mx-auto mb-10" />

                        {/* Dashboard button — neon blue */}
                        <button
                            onClick={onBackToDashboard}
                            className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto cursor-pointer text-base"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            ダッシュボードに戻る
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CertificateScreen;
