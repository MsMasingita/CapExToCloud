// src/components/ScreenOnboarding.tsx
import React from 'react';
import { ArrowRight, Lock, Building2, UserCheck, Zap, Server, ShieldCheck, Database } from 'lucide-react';

interface ScreenOnboardingProps {
  onAcceptTrack: () => void;
  internName?: string;
  internRole?: string;
}

export const ScreenOnboarding: React.FC<ScreenOnboardingProps> = ({
  onAcceptTrack,
  internName = "Eric Kwendo",
  internRole = "Junior Cloud Intern"
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10 animate-fadeIn">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> Interactive Onboarding
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          YOUR FIRST 30 DAYS AS AN INTERN
        </h1>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl font-normal">
          Select your active enterprise deployment track to begin solving real-world cloud infrastructure challenges across official AZ-900 domains.
        </p>
      </div>

      {/* Main Grid: Intern ID & Track Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Intern ID Badge */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Intern ID Badge
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/20">
              EK
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white leading-tight">{internName}</h2>
              <p className="text-sm text-slate-400 font-medium">{internRole}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-sm border-t border-slate-800/80">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Assigned Role</span>
              <span className="text-white font-semibold">Cloud Architecture Trainee</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Reporting Manager</span>
              <span className="text-emerald-400 font-semibold">Thandi Mokoena (IT Ops)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Internship Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                Active Intern #4812
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-400">Operational Hubs</span>
              <span className="text-slate-300 font-medium text-xs">Nairobi • Lagos • Johannesburg</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Company Track Selector */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* TRACK 1: SoleSpace E-Commerce (ACTIVE) */}
          <div className="bg-slate-900/90 border-2 border-emerald-500/50 hover:border-emerald-500/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl transition-all relative overflow-hidden group">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    SoleSpace E-Commerce
                  </h2>
                  <p className="text-xs text-slate-400">Retail &amp; High-Scale Infrastructure Track</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-wider">
                Active Track
              </span>
            </div>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Sneaker drops across Kenya, Nigeria &amp; South Africa are crashing basement servers during peak traffic spikes. Help the engineering team scale before the next drop!
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <Server className="w-4 h-4" />
                Domain 1: Cloud Concepts (25–30% Exam Weight)
              </div>

              <button
                onClick={onAcceptTrack}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Accept SoleSpace Assignment <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* TRACK 2: AfriHealth Telemed (LOCKED) */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 opacity-75 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-slate-500 border border-slate-700/50">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-300">AfriHealth Telemed</h3>
                  <p className="text-xs text-slate-500">Healthcare Data Residency &amp; Hybrid Cloud Migration</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Locked • Domain 2
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/50 text-xs">
              <span className="text-slate-400 font-medium">
                Domain 2: Azure Architecture &amp; Services (35–40% Exam Weight)
              </span>
              <button disabled className="px-5 py-2 rounded-lg bg-slate-800/80 text-slate-500 text-xs font-semibold cursor-not-allowed border border-slate-700/40">
                Unlocks After Domain 1
              </button>
            </div>
          </div>

          {/* TRACK 3: EduBridge Academy (LOCKED) */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 opacity-75 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 text-slate-500 border border-slate-700/50">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-300">EduBridge Academy</h3>
                  <p className="text-xs text-slate-500">Pan-African Student Portal Security &amp; Cost Management</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Locked • Domain 3
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/50 text-xs">
              <span className="text-slate-400 font-medium">
                Domain 3: Management &amp; Governance (30–35% Exam Weight)
              </span>
              <button disabled className="px-5 py-2 rounded-lg bg-slate-800/80 text-slate-500 text-xs font-semibold cursor-not-allowed border border-slate-700/40">
                Unlocks After Domain 2
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ScreenOnboarding;