// src/App.tsx
import { useState, useEffect } from 'react';
import ScreenOnboarding from './components/ScreenOnboarding';
import { ScreenBriefing } from './components/ScreenBriefing';
import { ScreenDecision } from './components/ScreenDecision';
import { ScreenDecisionEduBridge } from './components/ScreenDecisionEduBridge';
import { ScreenStudyLab } from './components/ScreenStudyLab';
import { ScreenGlossaryDeck } from './components/ScreenGlossaryDeck';
import { ScreenProposalWorkspace } from './components/ScreenProposalWorkspace';
import ScreenBoardroomDefense from './components/ScreenBoardroomDefense';
import { ScreenGraduationTransfer } from './components/ScreenGraduationTransfer';
import { ScreenAfriHealthDomain2 } from './components/ScreenAfriHealthDomain2';
import { ScreenAfriHealthGraduationTransfer } from './components/ScreenAfriHealthGraduationTransfer';
import ResourceDrawer from './ResourceDrawer';
import { Zap, BookOpen } from 'lucide-react';
import {
  EDUBRIDGE_BOARD_CHALLENGES,
  EDUBRIDGE_STUDY_LAB_UNITS,
  EDUBRIDGE_PANIC_MATCHER_DATA,
  EDUBRIDGE_PROPOSAL_DATA,
} from './data/eduBridgeData';

export type DomainId = 'solespace' | 'afrihealth' | 'edubridge';

type ScreenType =
  | 'onboarding'
  | 'briefing'
  | 'decision'
  | 'studylab'
  | 'glossary'
  | 'proposal'
  | 'defense'
  | 'transfer'
  | 'afrihealth'
  | 'afrihealth-transfer'
  | 'edubridge';

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

  const [activeDomain, setActiveDomain] = useState<DomainId>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.activeDomain || 'solespace';
      } catch (e) {}
    }
    return 'solespace';
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

  const [domain1Completed, setDomain1Completed] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return !!parsed.domain1Completed;
      } catch (e) {}
    }
    return false;
  });

  const [domain2Completed, setDomain2Completed] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return !!parsed.domain2Completed;
      } catch (e) {}
    }
    return false;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentScreen, activeDomain, xp, domain1Completed, domain2Completed })
    );
  }, [currentScreen, activeDomain, xp, domain1Completed, domain2Completed]);

  const getDomainLabel = () => {
    if (activeDomain === 'edubridge' || currentScreen === 'edubridge') {
      return 'EduBridge Academy Track (Domain 3)';
    }
    if (activeDomain === 'afrihealth' || currentScreen === 'afrihealth' || currentScreen === 'afrihealth-transfer') {
      return 'AfriHealth Track (Domain 2)';
    }
    return 'SoleSpace Track (Domain 1)';
  };

  const handleReturnToDesk = () => {
    setCurrentScreen('onboarding');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'briefing':
        setCurrentScreen('onboarding');
        break;
      case 'decision':
        setCurrentScreen('briefing');
        break;
      case 'studylab':
        setCurrentScreen('decision');
        break;
      case 'glossary':
        setCurrentScreen('studylab');
        break;
      case 'proposal':
        setCurrentScreen('glossary');
        break;
      case 'defense':
        setCurrentScreen('proposal');
        break;
      case 'transfer':
        setCurrentScreen('defense');
        break;
      case 'afrihealth':
        setCurrentScreen('onboarding');
        break;
      case 'afrihealth-transfer':
        setCurrentScreen('afrihealth');
        break;
      default:
        setCurrentScreen('onboarding');
        break;
    }
  };

  const BriefingComp = ScreenBriefing as any;
  const DecisionComp = ScreenDecision as any;
  const StudyLabComp = ScreenStudyLab as any;
  const GlossaryComp = ScreenGlossaryDeck as any;
  const ProposalComp = ScreenProposalWorkspace as any;
  const DefenseComp = ScreenBoardroomDefense as any;
  const TransferComp = ScreenGraduationTransfer as any;

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
                    {getDomainLabel()}
                  </span>

                  {/* Track Switcher */}
                  <select
                    value={activeDomain}
                    onChange={(e) => {
                      const selected = e.target.value as DomainId;
                      setActiveDomain(selected);
                      if (selected === 'afrihealth') {
                        setCurrentScreen('afrihealth');
                      } else {
                        setCurrentScreen('briefing');
                      }
                    }}
                    className="text-[10px] bg-slate-900 border border-slate-700 text-emerald-400 font-bold px-1.5 py-0.5 rounded cursor-pointer outline-none"
                    title="Track Switcher"
                  >
                    <option value="solespace">SoleSpace (D1)</option>
                    <option value="afrihealth">AfriHealth (D2)</option>
                    <option value="edubridge">EduBridge (D3)</option>
                  </select>
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
                  onClick={handleReturnToDesk}
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
                  onClick={handleReturnToDesk}
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
            domain1Completed={domain1Completed}
            domain2Completed={domain2Completed}
            onAcceptTrack={() => {
              setActiveDomain('solespace');
              setCurrentScreen('briefing');
            }}
            onSelectAfriHealthTrack={() => {
              setActiveDomain('afrihealth');
              setCurrentScreen('afrihealth');
            }}
            onSelectEduBridgeTrack={() => {
              setActiveDomain('edubridge');
              setCurrentScreen('briefing');
            }}
          />
        )}

        {currentScreen === 'briefing' && (
          <BriefingComp
            xp={xp}
            domain={activeDomain}
            onProceed={() => {
              setXp((prev: number) => prev + 25);
              setCurrentScreen('decision');
            }}
          />
        )}

        {currentScreen === 'decision' && (
          activeDomain === 'edubridge' ? (
            <ScreenDecisionEduBridge
              xp={xp}
              onNext={(points: number) => {
                setXp((prev: number) => prev + points);
                setCurrentScreen('studylab');
              }}
            />
          ) : (
            <DecisionComp
              xp={xp}
              decisionData={undefined}
              onNext={(points: number) => {
                setXp((prev: number) => prev + points);
                setCurrentScreen('studylab');
              }}
            />
          )
        )}

        {currentScreen === 'studylab' && (
          <StudyLabComp
            xp={xp}
            studyUnits={activeDomain === 'edubridge' ? EDUBRIDGE_STUDY_LAB_UNITS : undefined}
            onBack={() => setCurrentScreen('decision')}
            onProceed={(points: number) => {
              setXp((prev: number) => prev + points);
              setCurrentScreen('glossary');
            }}
          />
        )}

        {currentScreen === 'glossary' && (
          <GlossaryComp
            xp={xp}
            glossaryData={activeDomain === 'edubridge' ? EDUBRIDGE_PANIC_MATCHER_DATA : undefined}
            onBack={() => setCurrentScreen('studylab')}
            onProceed={(earnedBonus: number) => {
              setXp((prev: number) => prev + earnedBonus);
              setCurrentScreen('proposal');
            }}
          />
        )}

        {currentScreen === 'proposal' && (
          <ProposalComp
            xp={xp}
            proposalData={activeDomain === 'edubridge' ? EDUBRIDGE_PROPOSAL_DATA : undefined}
            onBack={() => setCurrentScreen('glossary')}
            onProceed={(earnedBonus: number) => {
              setXp((prev: number) => prev + earnedBonus);
              setCurrentScreen('defense');
            }}
          />
        )}

        {currentScreen === 'defense' && (
          <DefenseComp
            xp={xp}
            challenges={activeDomain === 'edubridge' ? EDUBRIDGE_BOARD_CHALLENGES : undefined}
            onBack={() => setCurrentScreen('proposal')}
            onRestart={handleReturnToDesk}
            onProceedToTransfer={() => {
              if (activeDomain === 'solespace') {
                setDomain1Completed(true);
              }
              setXp((prev: number) => prev + 250);
              setCurrentScreen('transfer');
            }}
          />
        )}

        {currentScreen === 'transfer' && (
          <TransferComp
            xp={xp}
            domain={activeDomain}
            videoSrc={
              activeDomain === 'edubridge'
                ? '/videos/zawadi-domain3-complete.mp4'
                : '/videos/zawadi-transfer.mp4'
            }
            onBack={() => setCurrentScreen('defense')}
            onRestart={handleReturnToDesk}
            onLaunchDomain2={() => {
              setActiveDomain('afrihealth');
              setCurrentScreen('afrihealth');
            }}
          />
        )}

        {currentScreen === 'afrihealth' && (
          <ScreenAfriHealthDomain2
            xp={xp}
            onBack={() => setCurrentScreen('onboarding')}
            onCompleteDomain2={() => {
              setDomain2Completed(true);
              setXp((prev: number) => prev + 150);
              setCurrentScreen('afrihealth-transfer');
            }}
          />
        )}

        {currentScreen === 'afrihealth-transfer' && (
          <ScreenAfriHealthGraduationTransfer
            xp={xp}
            onBack={() => setCurrentScreen('afrihealth')}
            onRestart={handleReturnToDesk}
            onLaunchDomain3={() => {
              setActiveDomain('edubridge');
              setCurrentScreen('briefing');
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