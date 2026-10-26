// src/App.tsx
import { useState, useEffect } from 'react';
import { ScreenOnboarding } from './components/ScreenOnboarding';
import { ScreenDecision } from './components/ScreenDecision';
import { ScreenStudyLab } from './components/ScreenStudyLab';
import { ScreenGlossaryDeck } from './components/ScreenGlossaryDeck';
import { ScreenProposalWorkspace } from './components/ScreenProposalWorkspace';
import ScreenBoardroomDefense from './components/ScreenBoardroomDefense';
import { ScreenGraduationTransfer } from './components/ScreenGraduationTransfer';
import { ScreenAfriHealthDomain2 } from './components/ScreenAfriHealthDomain2';
import ResourceDrawer from './ResourceDrawer';
import { Zap, BookOpen } from 'lucide-react';

type ScreenType = 'onboarding' | 'decision' | 'studylab' | 'glossary' | 'proposal' | 'defense' | 'transfer' | 'afrihealth';

const STORAGE_KEY = 'capextocloud_state_v1';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.currentScreen || 'onboarding';
      } catch (e) {
        console.error('Failed to parse state from localStorage', e);
      }
    }
    return 'onboarding';
  });

  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return typeof parsed.xp === 'number' ? parsed.xp : 50;
      } catch (e) {
        console.error('Failed to parse state from localStorage', e);
      }
    }
    return 50;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentScreen, xp }));
  }, [currentScreen, xp]);

  // Screen sequence
  const screenSequence: ScreenType[] = [
    'onboarding',
    'decision',
    'studylab',
    'glossary',
    'proposal',
    'defense',
    'transfer',
    'afrihealth'
  ];

  const handleBack = () => {
    const currentIndex = screenSequence.indexOf(currentScreen);
    if (currentIndex > 0) {
      setCurrentScreen(screenSequence[currentIndex - 1]);
    } else {
      setCurrentScreen('onboarding');
    }
  };

  const handleResetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setXp(50);
    setCurrentScreen('onboarding');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
                CC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-black text-white tracking-tight">
                    CapExTo<span className="text-emerald-400">Cloud</span>
                  </h1>
                  <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                    {currentScreen === 'afrihealth' ? 'AfriHealth Track (Domain 2)' : 'SoleSpace Track (Domain 1)'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Unofficial AZ-900 Companion • Interactive Scenario Engine
                </p>
              </div>
            </div>

            {currentScreen !== 'onboarding' && (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg transition border border-slate-700/50 cursor-pointer"
                >
                  <span>← Back</span>
                </button>

                <button
                  onClick={handleResetDemo}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg transition border border-slate-700/50 cursor-pointer"
                >
                  <span>Return to Desk</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {currentScreen !== 'onboarding' && (
              <div className="md:hidden flex items-center gap-1.5">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700/50 cursor-pointer"
                >
                  <span>← Back</span>
                </button>
                <button
                  onClick={handleResetDemo}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700/50 cursor-pointer"
                >
                  <span>Desk</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>{xp} XP</span>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">My Files &amp; Tutorials</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'onboarding' && (
          <ScreenOnboarding
            onAcceptTrack={() => setCurrentScreen('decision')}
            onSelectAfriHealthTrack={() => setCurrentScreen('afrihealth')}
          />
        )}

        {currentScreen === 'decision' && (
          <ScreenDecision
            xp={xp}
            onNext={(points) => {
              setXp((prev) => prev + points);
              setCurrentScreen('studylab');
            }}
          />
        )}

        {currentScreen === 'studylab' && (
          <ScreenStudyLab
            xp={xp}
            onBack={() => setCurrentScreen('decision')}
            onProceed={(points) => {
              setXp((prev) => prev + points);
              setCurrentScreen('glossary');
            }}
          />
        )}

        {currentScreen === 'glossary' && (
          <ScreenGlossaryDeck
            xp={xp}
            onBack={() => setCurrentScreen('studylab')}
            onProceed={(earnedBonus) => {
              setXp((prev) => prev + earnedBonus);
              setCurrentScreen('proposal');
            }}
          />
        )}

        {currentScreen === 'proposal' && (
          <ScreenProposalWorkspace
            xp={xp}
            onBack={() => setCurrentScreen('glossary')}
            onProceed={(earnedBonus) => {
              setXp((prev) => prev + earnedBonus);
              setCurrentScreen('defense');
            }}
          />
        )}

        {currentScreen === 'defense' && (
          <ScreenBoardroomDefense
            xp={xp}
            onBack={() => setCurrentScreen('proposal')}
            onRestart={handleResetDemo}
            onProceedToTransfer={() => {
              setXp((prev) => prev + 250);
              setCurrentScreen('transfer');
            }}
          />
        )}

        {currentScreen === 'transfer' && (
          <ScreenGraduationTransfer
            xp={xp}
            onBack={() => setCurrentScreen('defense')}
            onRestart={handleResetDemo}
          />
        )}

        {currentScreen === 'afrihealth' && (
          <ScreenAfriHealthDomain2
            xp={xp}
            onBack={() => setCurrentScreen('onboarding')}
            onCompleteDomain2={() => {
              setXp((prev) => prev + 100);
              setCurrentScreen('onboarding');
            }}
          />
        )}
      </main>

      <ResourceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default App;