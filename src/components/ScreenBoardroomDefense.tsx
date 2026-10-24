// src/components/ScreenBoardroomDefense.tsx
import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, RefreshCcw, CheckCircle, } from 'lucide-react';

interface ScreenBoardroomDefenseProps {
  xp?: number;
  onBack: () => void;
  onRestart: () => void;
  onProceedToTransfer: () => void;
}

export const ScreenBoardroomDefense: React.FC<ScreenBoardroomDefenseProps> = ({
  xp = 0,
  onBack,
  onRestart,
  onProceedToTransfer,
}) => {
  const [_selectedAnswers, _setSelectedAnswers] = useState<Record<number, string>>({});
  const [_defensePassed, _setDefensePassed] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Proposal</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
            Stage 5: Boardroom Defense
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Current XP: {xp}
          </span>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-bold"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          <span>Restart Simulation</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white">Executive Panel Defense</h1>
          <p className="text-sm text-slate-400">
            Defend your cloud migration architecture against C-suite objections to secure final sign-off and unlock your Azure Domain 1 certification badge.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Board Review in Progress</h3>
              <p className="text-xs text-slate-400">Chairman Jomo &amp; CTO Chinedu are evaluating your OpEx cost-saving model.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={onProceedToTransfer}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer uppercase"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Pass Defense &amp; Claim Certification Badge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenBoardroomDefense;