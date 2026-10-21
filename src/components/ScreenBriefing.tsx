// src/components/ScreenBriefing.tsx
import React from 'react';
import { ArrowRight, FileText, Zap, BookOpen, Server, Cloud, Calculator } from 'lucide-react';

interface ScreenBriefingProps {
  onProceed: () => void;
  xp: number;
}

export const ScreenBriefing: React.FC<ScreenBriefingProps> = ({ onProceed, xp }) => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-white uppercase">
            Stage 1: The Business Without a Server Room
          </h2>
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-400" /> {xp} XP
            </span>
          </div>
        </div>

        {/* Workplace Memo Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-950/60 p-4 px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/40">
                TM
              </div>
              <div>
                <p className="text-sm font-bold text-white">Thandi Mokoena, IT Operations Manager</p>
                <p className="text-xs text-slate-400">SUBJECT: Basement Server Room Outage & Flash Sneaker Drops</p>
              </div>
            </div>
            <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-medium">
              Mandatory Briefing
            </span>
          </div>
          
          <div className="p-6 space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Morning Intern, our last limited-edition sneaker drop had buyers flooding us from Nairobi to Cape Town. Within 4 minutes, our <span className="text-emerald-400 font-medium underline decoration-dotted">on-premises servers</span> in the office basement overheated, our local power backup tripped, and 12,000 shoppers hit a 504 Gateway Error.
            </p>
            <p>
              We have no <span className="text-emerald-400 font-medium underline decoration-dotted">budget</span> to buy another 20 physical machines, wire high-voltage cooling, and hire an on-site security guard just for a flash sale that lasts 2 hours. We need a <span className="text-emerald-400 font-medium underline decoration-dotted">flexible computing strategy</span>.
            </p>
            <p className="text-slate-400 font-medium pt-2">
              Review these 3 key concepts before you propose a solution.
            </p>
          </div>
        </div>

        {/* Interactive Concept Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all cursor-pointer space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Server className="w-4 h-4" /> Flip: On-Premises
            </div>
            <p className="text-xs text-slate-400">Physical servers in your facility. 100% responsible for power, cooling, and security.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all cursor-pointer space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Cloud className="w-4 h-4" /> Flip: Cloud Computing
            </div>
            <p className="text-xs text-slate-400">Renting servers and storage over the internet from a provider like Azure on consumption model.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all cursor-pointer space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Calculator className="w-4 h-4" /> Flip: CapEx vs. OpEx
            </div>
            <p className="text-xs text-slate-400">CapEx = upfront physical hardware purchase. OpEx = recurring cost for exact usage.</p>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={onProceed}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Proceed to Decision Analysis (+25 XP) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};