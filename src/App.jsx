import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { missions } from './data/missions';
import Sidebar from './components/Sidebar';
import EditorView from './components/EditorView';
import LogicVisual from './components/LogicVisual';
import ScoreBoard from './components/ScoreBoard';
import BackgroundEffect from './components/BackgroundEffect';
import TutorialModal from './components/TutorialModal';
import TermsModal from './components/TermsModal';
import PrivacyModal from './components/PrivacyModal';
import CertificateScreen from './components/CertificateScreen';

function App() {
  const [currentMissionId, setCurrentMissionId] = useState(1);
  const [completedMissions, setCompletedMissions] = useState(() => {
    const saved = localStorage.getItem('devreviewstudy20_completed');
    return saved ? JSON.parse(saved) : [];
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('devreviewstudy20_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isVerified, setIsVerified] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  if (!missions || missions.length === 0) return null;
  const currentMission = missions.find(m => m.id === currentMissionId);

  // 💡 【追加】初回アクセス時に自動でチュートリアルを表示する
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('devreviewstudy20_tutorial_seen');
    if (!hasSeenTutorial) {
      // 少しだけ遅延させて表示（アニメーションの安定化のため）
      const timer = setTimeout(() => {
        setShowTutorial(true);
        // localStorage.setItem('devreviewstudy20_tutorial_seen', 'true'); // 二回目以降表示させない場合はここを有効化
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('devreviewstudy20_completed', JSON.stringify(completedMissions));
    localStorage.setItem('devreviewstudy20_score', score.toString());
  }, [completedMissions, score]);

  useEffect(() => {
    setIsVerified(completedMissions.includes(currentMissionId));
    setIsRevealed(false);
    setAccuracy(100);
  }, [currentMissionId, completedMissions]);

  // ✅ handleGoHome を削除（不要になったため）

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      setCompletedMissions([]);
      setScore(0);
      setCurrentMissionId(1);
      setIsVerified(false);
      setIsRevealed(false);
      setIsAnalyzing(false);
      setAccuracy(100);
      setShowCertificate(false);
      localStorage.removeItem('devreviewstudy20_completed');
      localStorage.removeItem('devreviewstudy20_score');
      // リセット時はチュートリアルフラグも消す
      localStorage.removeItem('devreviewstudy20_tutorial_seen');
      setTimeout(() => setIsResetting(false), 1500);
    }, 800);
  };

  const handleSelectMission = (id) => {
    setCurrentMissionId(id);
    setIsAnalyzing(false);
    setIsRevealed(false);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setIsRevealed(false);
    if (!completedMissions.includes(currentMissionId)) {
      const newCompleted = [...completedMissions, currentMissionId];
      setCompletedMissions(newCompleted);
      setScore(prev => prev + (currentMission?.rewardYen || 100));
    }
  };

  const handleReveal = () => {
    setIsVerified(true);
    setIsRevealed(true);
    if (!completedMissions.includes(currentMissionId)) {
      const newCompleted = [...completedMissions, currentMissionId];
      setCompletedMissions(newCompleted);
    }
  };

  const handleVerificationFailure = (penalty) => {
    setAccuracy(prev => Math.max(0, prev - penalty));
    setIsError(true);
    setTimeout(() => setIsError(false), 1500);
  };

  const handleNextMission = () => {
    if (currentMissionId === missions.length) {
      setShowCertificate(true);
    } else {
      setCurrentMissionId(prev => prev + 1);
    }
  };

  const handleBackFromCertificate = () => {
    setShowCertificate(false);
    setCurrentMissionId(1);
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-200 overflow-hidden relative font-sans">
      <BackgroundEffect />

      {showCertificate && (
        <CertificateScreen
          onBackToDashboard={handleBackFromCertificate}
        />
      )}

      <Sidebar
        missions={missions}
        currentMissionId={currentMissionId}
        completedMissions={completedMissions}
        onSelectMission={handleSelectMission}
        // ✅ onGoHome を削除
        onReset={handleReset}
        onOpenTutorial={() => setShowTutorial(true)}
        onOpenTerms={() => setShowTerms(true)}
        onOpenPrivacy={() => setShowPrivacy(true)}
      />

      <main className="flex-1 flex flex-col relative z-10 w-full">
        <header className="h-20 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="text-indigo-400">ステップ {String(currentMissionId).padStart(2, '0')}:</span>
              {currentMission?.title.replace(/^(演習|ステップ|習)\s*\d*\s*[:：]*/, '')}
            </h1>
          </div>
          <div className="flex items-center gap-5 shrink-0">
            <button
              onClick={() => setShowTutorial(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 border border-slate-700/50 hover:border-indigo-500/30 transition-all cursor-pointer"
              title="使い方ガイド"
            >
              <HelpCircle className="w-4 h-4" />
              使い方
            </button>
            <ScoreBoard score={score} accuracy={accuracy} isVerified={isVerified} />
          </div>
        </header>

        <div className="flex-1 grid grid-cols-[1fr_300px] gap-6 p-6 overflow-hidden relative z-10">
          <div className="flex flex-col gap-6 h-full overflow-hidden">
            <EditorView
              mission={currentMission}
              isVerified={isVerified}
              isRevealed={isRevealed}
              isAnalyzing={isAnalyzing}
              onAnalyzeStart={() => setIsAnalyzing(true)}
              onAnalyzeEnd={() => setIsAnalyzing(false)}
              onSuccess={handleVerificationSuccess}
              onFailure={handleVerificationFailure}
              onReveal={handleReveal}
              onNext={handleNextMission}
              isLast={currentMissionId === missions.length}
            />
          </div>

          <div className="flex flex-col gap-6 h-full relative pointer-events-none">
            <LogicVisual 
              isVerified={isVerified} 
              isRevealed={isRevealed} 
              isResetting={isResetting} 
              isAnalyzing={isAnalyzing} 
              isError={isError} 
              level={accuracy} 
              currentMission={currentMission} 
            />
          </div>
        </div>
      </main>

      {/* モーダル群 */}
      <TutorialModal isOpen={showTutorial} onClose={() => {
        setShowTutorial(false);
        // 閉じたタイミングで「既読」として保存
        localStorage.setItem('devreviewstudy20_tutorial_seen', 'true');
      }} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}

export default App;