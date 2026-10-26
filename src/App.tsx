import { useState } from 'react';
import { ScreenOnboarding } from './components/ScreenOnboarding';
import { ScreenBriefing } from './components/ScreenBriefing';
import { ScreenDecision } from './components/ScreenDecision';
import { ScreenStudyLab } from './components/ScreenStudyLab';
import { ScreenGlossaryDeck } from './components/ScreenGlossaryDeck';
import { ScreenProposalWorkspace } from './components/ScreenProposalWorkspace';
import { ScreenBoardroomDefense } from './components/ScreenBoardroomDefense';
import { ScreenGraduationTransfer } from './components/ScreenGraduationTransfer';
import ResourceDrawer from './ResourceDrawer';
import { Zap, BookOpen } from 'lucide-react';
import {
  EDUBRIDGE_BOARD_CHALLENGES,
  EDUBRIDGE_DECISION_DATA,
  EDUBRIDGE_STUDY_LAB_UNITS,
  EDUBRIDGE_PANIC_MATCHER_DATA,
  EDUBRIDGE_PROPOSAL_DATA,
} from './data/eduBridgeData';

export type DomainId = 'solespace' | 'afrihealth' | 'edubridge';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'onboarding' | 'briefing' | 'decision' | 'studylab' | 'glossary' | 'proposal' | 'defense' | 'transfer'
  >('onboarding');
  const [activeDomain, setActiveDomain] = useState<DomainId>('solespace');
  const [xp, setXp] = useState(50);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getDomainLabel = (domain: DomainId) => {
    switch (domain) {
      case 'edubridge':
        return 'EduBridge Academy Track (Domain 3)';
      case 'afrihealth':
        return 'AfriHealth Track (Domain 2)';
      case 'solespace':
      default:
        return 'SoleSpace Track (Domain 1)';
    }
  };

  // Helper casts to allow passing optional domain datasets without breaking existing component interfaces
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
          
          {/* Logo Lockup */}
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
                  {getDomainLabel(activeDomain)}
                </span>

                {/* Dev Quick Selector: Switching domain immediately resets screen to 'briefing' */}
                <select
                  value={activeDomain}
                  onChange={(e) => {
                    setActiveDomain(e.target.value as DomainId);
                    setCurrentScreen('briefing');
                  }}
                  className="text-[10px] bg-slate-900 border border-slate-700 text-emerald-400 font-bold px-1.5 py-0.5 rounded cursor-pointer outline-none"
                  title="Dev Track Switcher"
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

          {/* Header Controls */}
          <div className="flex items-center gap-4">
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
            onAcceptTrack={() => setCurrentScreen('briefing')}
          />
        )}

        {currentScreen === 'briefing' && (
          <BriefingComp
            xp={xp}
            domain={activeDomain}
            onProceed={() => {
              setXp((prev) => prev + 25);
              setCurrentScreen('decision');
            }}
          />
        )}

        {currentScreen === 'decision' && (
          <DecisionComp
            xp={xp}
            decisionData={activeDomain === 'edubridge' ? EDUBRIDGE_DECISION_DATA : undefined}
            onNext={(points: number) => {
              setXp((prev) => prev + points);
              setCurrentScreen('studylab');
            }}
          />
        )}

        {currentScreen === 'studylab' && (
          <StudyLabComp
            xp={xp}
            studyUnits={activeDomain === 'edubridge' ? EDUBRIDGE_STUDY_LAB_UNITS : undefined}
            onBack={() => {
              setCurrentScreen('decision');
            }}
            onProceed={(points: number) => {
              setXp((prev) => prev + points);
              setCurrentScreen('glossary');
            }}
          />
        )}

        {currentScreen === 'glossary' && (
          <GlossaryComp
            xp={xp}
            glossaryData={activeDomain === 'edubridge' ? EDUBRIDGE_PANIC_MATCHER_DATA : undefined}
            onBack={() => {
              setCurrentScreen('studylab');
            }}
            onProceed={(earnedBonus: number) => {
              setXp((prev) => prev + earnedBonus);
              setCurrentScreen('proposal');
            }}
          />
        )}

        {currentScreen === 'proposal' && (
          <ProposalComp
            xp={xp}
            proposalData={activeDomain === 'edubridge' ? EDUBRIDGE_PROPOSAL_DATA : undefined}
            onBack={() => {
              setCurrentScreen('glossary');
            }}
            onProceed={(earnedBonus: number) => {
              setXp((prev) => prev + earnedBonus);
              setCurrentScreen('defense');
            }}
          />
        )}

        {currentScreen === 'defense' && (
          <DefenseComp
            xp={xp}
            challenges={activeDomain === 'edubridge' ? EDUBRIDGE_BOARD_CHALLENGES : undefined}
            onBack={() => {
              setCurrentScreen('proposal');
            }}
            onRestart={() => {
              setXp(50);
              setCurrentScreen('onboarding');
            }}
            onProceedToTransfer={() => {
              setXp((prev) => prev + 250);
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
            onBack={() => {
              setCurrentScreen('defense');
            }}
            onRestart={() => {
              setXp(50);
              setCurrentScreen('onboarding');
            }}
          />
        )}
      </main>

      {/* Resource Drawer Component */}
      <ResourceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

export default App;