// src/components/ScreenDecisionEduBridge.tsx
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, BookOpen, ShieldCheck, Server, Zap } from 'lucide-react';
import { EDUBRIDGE_DECISION_DATA } from '../data/eduBridgeData';

interface ScreenDecisionEduBridgeProps {
  onNext: (points: number) => void;
  xp?: number;
}

export const ScreenDecisionEduBridge: React.FC<ScreenDecisionEduBridgeProps> = ({ onNext }) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>('recommended');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const recommendedOpt = EDUBRIDGE_DECISION_DATA.options.find((o) => o.isCorrect);
  const trapOpt = EDUBRIDGE_DECISION_DATA.options.find((o) => !o.isCorrect);

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (selectedChoiceId === 'recommended' || selectedChoiceId === recommendedOpt?.id) {
      onNext(50);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Stage Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" /> {EDUBRIDGE_DECISION_DATA.stageTitle}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          {EDUBRIDGE_DECISION_DATA.domainTitle}
        </h2>
        <p className="text-slate-400 text-sm md:text-base">
          Client: <span className="text-emerald-400 font-semibold">{EDUBRIDGE_DECISION_DATA.companyName}</span> • Review the technical desk incident and study the governance units below before finalizing your strategic response.
        </p>
      </div>

      {/* Incident Report Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/20">
              OA
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Dean Ochieng Adeleke</h3>
              <p className="text-xs text-slate-400">Chief Technical Director • EduBridge Pan-African Academy</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
            Critical Escalation
          </span>
        </div>

        <blockquote className="text-slate-300 text-sm md:text-base italic leading-relaxed border-l-2 border-emerald-500/50 pl-4 py-1">
          &ldquo;{EDUBRIDGE_DECISION_DATA.incidentReport}&rdquo;
        </blockquote>
      </div>

      {/* Required Reading: Governance & Azure Concepts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" /> Required Governance Principles
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EDUBRIDGE_DECISION_DATA.requiredReading.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  {idx === 0 && <Server className="w-4 h-4" />}
                  {idx === 1 && <ShieldCheck className="w-4 h-4" />}
                  {idx === 2 && <Zap className="w-4 h-4" />}
                  {item.title}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-white">Concept:</strong> {item.concept}
                </p>
                <p className="text-slate-400 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                  <strong className="text-emerald-400">EduBridge Application:</strong> {item.application}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Decision Response Options */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Select Strategic Response for the Executive Board</span>
        </h3>

        <div className="space-y-4">
          {recommendedOpt && (
            <div
              onClick={() => !hasSubmitted && setSelectedChoiceId(recommendedOpt.id)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selectedChoiceId === recommendedOpt.id || selectedChoiceId === 'recommended'
                  ? 'bg-emerald-950/20 border-emerald-500 shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${selectedChoiceId === recommendedOpt.id || selectedChoiceId === 'recommended' ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400' : 'border-slate-600'}`}>
                  {(selectedChoiceId === recommendedOpt.id || selectedChoiceId === 'recommended') && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    {recommendedOpt.type}
                  </span>
                  <p className="text-sm text-slate-200 font-medium leading-relaxed pt-1">
                    &ldquo;{recommendedOpt.text}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {trapOpt && (
            <div
              onClick={() => !hasSubmitted && setSelectedChoiceId(trapOpt.id)}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selectedChoiceId === trapOpt.id
                  ? 'bg-rose-950/20 border-rose-500 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${selectedChoiceId === trapOpt.id ? 'border-rose-400 bg-rose-500/20 text-rose-400' : 'border-slate-600'}`}>
                  {selectedChoiceId === trapOpt.id && <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase">
                    {trapOpt.type}
                  </span>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed pt-1">
                    &ldquo;{trapOpt.text}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action / Submit */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {hasSubmitted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strategy registered! Advance to the Study Lab.
              </span>
            ) : (
              <span>Confirm your governance architecture response to proceed.</span>
            )}
          </div>

          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Confirm Strategic Decision <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onNext(50)}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer animate-bounce"
            >
              Proceed to Study Lab (+50 XP) <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenDecisionEduBridge;