// src/components/ScreenDecision.tsx
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, BookOpen, ShieldCheck, Server } from 'lucide-react';

interface ScreenDecisionProps {
  onNext: (points: number) => void;
  xp?: number;
}

export const ScreenDecision: React.FC<ScreenDecisionProps> = ({ onNext }) => {
  const [selectedChoice, setSelectedChoice] = useState<'recommended' | 'traditional' | null>('recommended');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedChoice === 'recommended') {
      setHasSubmitted(true);
      onNext(50);
    } else {
      setHasSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* Stage Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" /> Stage 1: Operational Emergency
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          The Business Without a Server Room
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Review the IT Operations Manager briefing memo and study the fundamental cloud concepts below before selecting your strategic response.
        </p>
      </div>

      {/* 1. Thandi's Briefing Memo Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
              TM
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Thandi Mokoena</h3>
              <p className="text-xs text-slate-400">IT Operations Manager • SoleSpace E-Commerce</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            Mandatory Briefing
          </span>
        </div>

        <blockquote className="text-slate-300 text-sm md:text-base italic leading-relaxed border-l-2 border-amber-500/50 pl-4 py-1">
          &ldquo;Morning Intern, welcome to SoleSpace. I wish we had time for coffee, but we have an emergency. Yesterday was our exclusive Nairobi &amp; Jo&apos;burg sneaker drop. Within 4 minutes, 15,000 concurrent shoppers flooded our custom storefront. Our on-premises servers in the office basement overheated, our backup power tripped, and customers hit 504 Gateway Timeouts. We lost thousands in sales. The founders want to budget KES 40,000 to buy 20 more physical servers. That&apos;s total madness: servers sit idle every month until the next drop.&rdquo;
        </blockquote>
      </div>

      {/* 2. Fundamental Concept Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Required Reading: AZ-900 Core Cloud Concepts Before Deciding
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Concept Card 1 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Server className="w-4 h-4" /> Cloud Models (IaaS &amp; Migration)
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Concept:</strong> Moving physical servers to virtual machines (VMs) in the cloud is called migration (specifically lift-and-shift), which mitigates on-premises hardware risks.
              </p>
              <p className="text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                <strong className="text-emerald-400">SoleSpace Application:</strong> Rented Azure VMs remove the need for a basement server room and prevent physical cooling failures.
              </p>
            </div>
          </div>

          {/* Concept Card 2 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" /> Cloud Elasticity
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Concept:</strong> The ability to automatically and dynamically expand or contract computing resources in real time to match sudden spikes and drops in workload.
              </p>
              <p className="text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                <strong className="text-emerald-400">SoleSpace Application:</strong> SoleSpace&apos;s application automatically scales out to handle 15,000 flash drop shoppers, then shrinks to zero idle waste.
              </p>
            </div>
          </div>

          {/* Concept Card 3 */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" /> CapEx vs. OpEx
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">Concept:</strong> Capital Expenditure (CapEx) requires upfront spending on physical hardware with depreciation. Operational Expenditure (OpEx) is a consumption-based operational model where you pay for resources used.
              </p>
              <p className="text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                <strong className="text-emerald-400">SoleSpace Application:</strong> Shifting from buying KES 40,000 worth of idle servers to paying only for checkout compute during active drop windows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Strategic Decision Response Options */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Select Your Professional Response to Thandi</span>
        </h3>

        <div className="space-y-4">
          
          {/* Option A: Recommended Strategy (Correct) */}
          <div
            onClick={() => !hasSubmitted && setSelectedChoice('recommended')}
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
              selectedChoice === 'recommended'
                ? 'bg-emerald-950/20 border-emerald-500 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${selectedChoice === 'recommended' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400' : 'border-slate-600'}`}>
                {selectedChoice === 'recommended' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    Recommended Strategy (Correct Choice)
                  </span>
                </div>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  &ldquo;Understood, Thandi. Buying 20 physical servers is a classic CapEx trap—we&apos;d sink thousands into hardware that sits idle 28 days a month. Let&apos;s run an agile migration strategy to Azure (IaaS) for better risk mitigation. This stops our capital losses and allows elasticity.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Option B: Traditional On-Premises Strategy (Incorrect Trap) */}
          <div
            onClick={() => !hasSubmitted && setSelectedChoice('traditional')}
            className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
              selectedChoice === 'traditional'
                ? 'bg-rose-950/20 border-rose-500 shadow-lg shadow-rose-500/10'
                : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${selectedChoice === 'traditional' ? 'border-rose-400 bg-rose-500/20 text-rose-400' : 'border-slate-600'}`}>
                {selectedChoice === 'traditional' && <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                    Traditional On-Premises Strategy (Incorrect Trap)
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  &ldquo;Support the founders&apos; plan to budget for 20 more physical servers in the basement. It&apos;s better to have 100% control over the hardware, even if it is a major Capital Expense (CapEx).&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Action / Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {hasSubmitted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Decision registered successfully! Ready for solution prep.
              </span>
            ) : (
              <span>Select the correct cloud-native strategy to unlock your path forward.</span>
            )}
          </div>

          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedChoice}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
            >
              Confirm Strategic Decision <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNext(50)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer animate-bounce"
            >
              Move to Solution Prep for the Board Meeting (+50 XP) <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default ScreenDecision;