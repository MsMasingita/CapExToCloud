// src/components/ScreenOnboarding.tsx
import React from 'react';
import { Zap, ArrowRight, Lock, Building2, ShieldCheck, Stethoscope } from 'lucide-react';

interface ScreenOnboardingProps {
  onAcceptAssignment: () => void;
  xp: number;
}

export const ScreenOnboarding: React.FC<ScreenOnboardingProps> = ({ onAcceptAssignment, xp }) => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 md:p-10 font-sans">
      {/* Top Bar */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" /> CloudClarity AI
          </span>
          <span className="hidden sm:inline-block text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
            Unofficial AZ-900 Companion | #1MillionDevs
          </span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700">
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-amber-400" /> {xp} XP
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Intern ID Badge Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl md:col-span-1 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                Intern ID Badge
              </p>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl border border-emerald-500/40">
                EK
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Eric Kwendo</h3>
                <p className="text-xs text-slate-400">Junior Cloud Intern</p>
              </div>
            </div>

            <div className="text-xs space-y-2.5 bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              <div className="flex justify-between"><span className="text-slate-400">Role:</span> <span className="text-slate-200 font-medium">Cloud Architecture Trainee</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Manager:</span> <span className="text-slate-200 font-medium">Thandi Mokoena (IT Ops)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="text-emerald-400 font-semibold">Active Intern #4812</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Hubs:</span> <span className="text-slate-200 font-medium">Gauteng • Nairobi • Lagos</span></div>
            </div>
          </div>
        </div>

        {/* Track Selection Grid */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Your First 30 Days as an Intern
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Select your active deployment track to begin solving enterprise infrastructure challenges.
            </p>
          </div>

          {/* Active Track: SoleSpace E-Commerce */}
          <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-xl p-6 shadow-lg shadow-emerald-950/20 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" /> SoleSpace E-Commerce
              </h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full font-semibold">
                Active Track
              </span>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Sneaker drops across Kenya, Nigeria & South Africa are crashing basement servers. Help them scale before the next drop!
            </p>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-amber-400 font-semibold">
                Chapter 1: Cloud Concepts (25-30% Exam Weight)
              </span>
              <button 
                onClick={onAcceptAssignment}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Accept Assignment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Locked Tracks */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 opacity-60 flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-400 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-slate-500" /> AfriHealth Telemed
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Rural health data residency & migration</p>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1 border border-slate-800 px-3 py-1 rounded-full">
              <Lock className="w-3 h-3" /> Coming Soon
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};