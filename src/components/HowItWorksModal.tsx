import React from 'react';
import { ArrowLeft, ShieldCheck, AlertTriangle, BookOpen, Cpu, Award,  Sparkles } from 'lucide-react';

interface HowItWorksViewProps {
  onBack: () => void;
  onStart: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onBack, onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Intensive Methodology</span>
          </div>

          <button
            onClick={onStart}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Start Simulator →
          </button>
        </div>

        {/* Page Title & Intro */}
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            How <span className="text-emerald-400">CapExToCloud</span> Works
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            A comprehensive look under the hood at how our interactive scenario engine bridges the gap between abstract AZ-900 cloud theory and real-world corporate decision-making.
          </p>
        </div>

        {/* Deep Dive Steps */}
        <div className="space-y-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm">
                01
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Intern ID Badge & Track Initialization
                </h3>
                <p className="text-xs text-slate-400">Setting up your professional sandbox environment.</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-13">
              When launching the platform, learners input their credentials to generate a secure virtual ID badge. They select their enterprise industry track—such as the <strong className="text-emerald-400">SoleSpace E-Commerce Track</strong>—which tailors the upcoming technical crises, operational constraints, and budget metrics to real regional challenges (e.g., managing flash sales across Nairobi and Johannesburg data centers).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-black text-sm">
                02
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Incident Briefing & The Corporate Crisis
                </h3>
                <p className="text-xs text-slate-400">Analyzing live outage logs and financial traps.</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-13">
              Instead of reading passive flashcards, learners are immediately confronted with a live system outage report. In SoleSpace, a 15,000-shopper flash drop crashes basement servers. Management reacts by proposing a catastrophic <strong className="text-amber-400">KES 4,800,000 Capital Expenditure (CapEx)</strong> on physical servers that sit idle 28 days a month. The intern's mission is to intercept this financial trap.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-black text-sm">
                03
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  Study Lab & AI Mentor (Zawadi Mutua)
                </h3>
                <p className="text-xs text-slate-400">Mastering AZ-900 fundamentals on demand.</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-13">
              Before presenting solutions, learners access the Study Lab and Glossary Deck to review core exam domains: CapEx vs. OpEx economic models, Cloud Service Models (IaaS, PaaS, SaaS), Shared Responsibility, and High Availability. Integrated directly into the lab is our <strong className="text-teal-400">AI Study Assistant</strong>, ready to answer complex architectural queries instantly.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-black text-sm">
                04
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-sky-400" />
                  Architecture & Proposal Workbench
                </h3>
                <p className="text-xs text-slate-400">Designing the cloud-native migration blueprint.</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-13">
              In the Proposal Workspace, interns map out scalable cloud architectures. They configure elastic auto-scaling groups, select regional redundancy zones, and establish budget cost alerts to ensure the cloud stack scales dynamically with live traffic while keeping operational expenditure predictable.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm">
                05
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  Boardroom Defense & Real-Time Verification
                </h3>
                <p className="text-xs text-slate-400">Defending your proposal against C-suite executives.</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed pl-13">
              The climax of the simulation tests real-world persuasion. Interns face sequential objections from executive leadership (Chairman Jomo, CTO Chinedu, and board directors). As they respond, our <strong className="text-purple-400">Zero-Latency Real-Time Verification Engine</strong> validates keywords and cloud concepts live in the browser, filling the confidence meter, unlocking mentor videos, and certifying Domain 1 completion.
            </p>
          </div>

        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Ready to test your cloud economics skills?</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Jump straight into the simulator, build your first proposal, and pass your AZ-900 certification with board-ready confidence.
          </p>
          <div>
            <button
              onClick={onStart}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Launch CapExToCloud Simulator →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};