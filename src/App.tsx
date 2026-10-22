import React, { useState } from 'react';
import { ScreenOnboarding } from './components/ScreenOnboarding';
import { ScreenBriefing } from './components/ScreenBriefing';
import { ScreenDecision } from './components/ScreenDecision';
import ResourceDrawer from './ResourceDrawer';
import { Zap, BookOpen } from 'lucide-react';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'briefing' | 'decision'>('onboarding');
  const [xp, setXp] = useState(50);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Rebranded Logo Lockup: CapExToCloud */}
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
                  SoleSpace Track
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Unofficial AZ-900 Companion • Interactive Scenario Engine
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-4">
            {/* XP Badge */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full text-xs font-bold">
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>{xp} XP</span>
            </div>

            {/* Resources Button */}
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
          <ScreenBriefing
            xp={xp}
            onProceed={() => {
              setXp((prev) => prev + 25);
              setCurrentScreen('decision');
            }}
          />
        )}

        {currentScreen === 'decision' && (
          <ScreenDecision
            onProceed={() => {
              setXp((prev) => prev + 50);
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