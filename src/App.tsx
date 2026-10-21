// src/App.tsx
// src/App.tsx
import { useState } from 'react';
import { ScreenOnboarding } from './components/ScreenOnboarding';
import { ScreenBriefing } from './components/ScreenBriefing';
import { ScreenDecision } from './components/ScreenDecision';
import ResourceDrawer from './ResourceDrawer';
import { Zap } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'briefing' | 'decision'>('onboarding');
  const [xp, setXp] = useState<number>(50);

  const handleAcceptAssignment = () => {
    setXp((prev) => prev + 50);
    setCurrentScreen('briefing');
  };

  const handleProceedToDecision = () => {
    setXp((prev) => prev + 25);
    setCurrentScreen('decision');
  };

  const handleDecisionComplete = (earnedXp: number) => {
    setXp((prev) => prev + earnedXp);
    alert('Stage 1 Decision complete! Ready for Boardroom Defense screens.');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Persistent Global Header */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> CloudClarity AI
          </span>
          <span className="text-xs text-slate-400 border border-slate-800 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
            SoleSpace Track
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-950 px-3.5 py-1.5 rounded-full border border-slate-800 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-amber-400">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Screen Router */}
      {currentScreen === 'onboarding' && (
        <ScreenOnboarding onAcceptAssignment={handleAcceptAssignment} xp={xp} />
      )}

      {currentScreen === 'briefing' && (
        <ScreenBriefing onProceed={handleProceedToDecision} xp={xp} />
      )}

      {currentScreen === 'decision' && (
        <ScreenDecision onNext={handleDecisionComplete} xp={xp} />
      )}

      {/* Global Slide-Over Drawer Rendered at Root */}
      <ResourceDrawer />
    </div>
  );
}