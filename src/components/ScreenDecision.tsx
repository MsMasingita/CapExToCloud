// src/components/ScreenDecision.tsx
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

interface ScreenDecisionProps {
  onNext: (earnedXp: number) => void;
  xp?: number;
}

interface ScreenDecisionProps {
  onNext: (points: number) => void;
  xp?: number;
}

export const ScreenDecision: React.FC<ScreenDecisionProps> = ({ onNext, xp = 50 }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleEvaluate = () => {
    if (selectedOption === 'B') {
      setIsEvaluated(true);
    } else {
      setIsEvaluated(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">
            Architectural Decision 1.1: How Should SoleSpace Scale?
          </h2>
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-400" /> {xp} XP
            </span>
          </div>
        </div>

        {/* Problem Statement Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-2">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Problem Statement</p>
          <p className="text-sm text-slate-200 font-medium">
            How should SoleSpace provision computing power for unpredictable sneaker drops without buying and maintaining dozens of physical servers?
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-4">
          {/* Option A */}
          <div 
            onClick={() => !isEvaluated && setSelectedOption('A')}
            className={`p-4 rounded-xl border transition-all cursor-pointer Kes{
              selectedOption === 'A' ? 'border-amber-500 bg-slate-900/90' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <input type="radio" checked={selectedOption === 'A'} readOnly className="mt-1 accent-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-white">A. Purchase 15 physical server racks and install an industrial generator in the headquarters basement.</p>
                {isEvaluated && selectedOption === 'A' && (
                  <p className="text-xs text-amber-400 mt-2">Diagnostic: Results in idle hardware waste 95% of the month with high CapEx and physical maintenance overhead.</p>
                )}
              </div>
            </div>
          </div>

          {/* Option B (Best Answer) */}
          <div 
            onClick={() => !isEvaluated && setSelectedOption('B')}
            className={`p-4 rounded-xl border transition-all cursor-pointer Kes{
              selectedOption === 'B' 
                ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-950/20' 
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <input type="radio" checked={selectedOption === 'B'} readOnly className="mt-1 accent-emerald-500" />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-white">B. Migrate the store to a Public Cloud provider (like Microsoft Azure) using an on-demand consumption model.</p>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-0.5 rounded font-bold">BEST ANSWER</span>
                </div>
                
                {isEvaluated && selectedOption === 'B' && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Correct Architecture: Public Cloud provides instant elasticity. Resources automatically scale up during the 2-hour sneaker rush and spin down afterward.</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Real-World Nuance (AZ-900 Insight): Cloud is not magic free money. Without cost governance, your OpEx bill can exceed your original CapEx budget.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Option C */}
          <div 
            onClick={() => !isEvaluated && setSelectedOption('C')}
            className={`p-4 rounded-xl border transition-all cursor-pointer Kes{
              selectedOption === 'C' ? 'border-amber-500 bg-slate-900/90' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <input type="radio" checked={selectedOption === 'C'} readOnly className="mt-1 accent-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-white">C. Lease private floor space in a commercial data center to construct a dedicated Private Cloud.</p>
                {isEvaluated && selectedOption === 'C' && (
                  <p className="text-xs text-amber-400 mt-2">Diagnostic: Retains hardware procurement burdens and virtualization staffing costs.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          {!isEvaluated ? (
            <button 
              onClick={handleEvaluate}
              disabled={!selectedOption}
              className={`font-bold px-6 py-3 rounded-lg transition-all cursor-pointer Kes{
                selectedOption ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700' : 'bg-slate-800/40 text-slate-500 cursor-not-allowed'
              }`}
            >
              Evaluate Recommendation
            </button>
          ) : (
            <div />
          )}

          {isEvaluated && (
            <button 
              onClick={() => onNext(100)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer ml-auto"
            >
              Next: Manager Expectations (+100 XP) <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};