// src/components/ScreenOnboarding.tsx
import React, { useState } from 'react';
import { ArrowRight, Building2, UserCheck, Zap, ShieldCheck, Database, Sparkles, BookOpen, Cpu, Award, AlertTriangle } from 'lucide-react';

interface ScreenOnboardingProps {
  onAcceptTrack: () => void;
}

export const ScreenOnboarding: React.FC<ScreenOnboardingProps> = ({ onAcceptTrack }) => {
  const [nameInput, setNameInput] = useState('');
  const [internName, setInternName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setInternName(nameInput.trim());
    setIsGenerated(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Intern ID Badge',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      desc: 'Set up your role and get assigned to an enterprise crisis challenge.'
    },
    {
      num: '02',
      title: 'Incident Briefing',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      desc: 'Meet your manager and review the live company system outage.'
    },
    {
      num: '03',
      title: 'Study Lab & AI Mentor Zawadi Mutua',
      icon: <BookOpen className="w-5 h-5 text-teal-400" />,
      desc: 'Review syllabus flashcards & consult your AI Mentor Zawadi Mutua.'
    },
    {
      num: '04',
      title: 'Architecture Workbench',
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      desc: 'Design your cloud migration plan balancing cost, uptime, and business requirements.'
    },
    {
      num: '05',
      title: 'Boardroom Defense Quiz',
      icon: <Award className="w-5 h-5 text-purple-400" />,
      desc: 'Defend your blueprint in a scenario-based executive panel quiz with 70% to pass.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-16 animate-fadeIn relative">
      
      {/* Top Navbar Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black">
            CC
          </div>
          <span className="text-lg font-black tracking-tight text-white">CapExToCloud</span>
        </div>

        {/* CLICKABLE NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('simulators-track')}
            className="text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            Simulators
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-slate-300 hover:text-emerald-400 transition cursor-pointer"
          >
            Syllabus
          </button>
        </div>

        <button
          onClick={onAcceptTrack}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          Start Simulator
        </button>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Official AZ-900 Companion • Interactive Scenario Engine
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Pass Azure Fundamentals by Solving Real Cloud Challenges as an <span className="text-emerald-400">Azure Cloud Intern</span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed">
            No more passive learning. Solve real-world company emergencies, study with an AI mentor, and pitch your solutions to the board.
          </p>

          <div className="pt-2">
            <button
              onClick={onAcceptTrack}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition shadow-xl shadow-emerald-500/20 flex items-center gap-3 cursor-pointer"
            >
              Start Your First Internship — It&apos;s Free! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Illustration / Graphic Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Intern ID Badge Portal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {!isGenerated ? (
            <form onSubmit={handleGenerateBadge} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Enter Your Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Type your name..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition text-sm font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Generate Intern ID Badge (+15 XP) <Zap className="w-4 h-4 fill-slate-950" />
              </button>
            </form>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-black text-slate-950 text-2xl shadow-lg shadow-emerald-500/20">
                  {internName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white leading-tight">{internName}</h2>
                  <p className="text-sm text-emerald-400 font-medium">Junior Cloud Intern</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                <span>Status: <strong className="text-emerald-400">Active</strong></span>
                <span> Hub: <strong className="text-white">Nairobi / Jo&apos;burg</strong></span>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={onAcceptTrack}
              className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Active Track: SoleSpace E-Commerce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div id="how-it-works" className="space-y-10 pt-12 border-t border-slate-800 scroll-mt-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">How It Works</h2>
          <p className="text-sm md:text-base text-slate-400 font-medium">
            A 5-step interactive journey to master cloud fundamentals
          </p>
        </div>

        {/* 5 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div 
              key={step.num}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 space-y-4 transition-all hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-xs text-emerald-400">
                    {step.num}
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRACK SELECTION SECTION */}
      <div id="simulators-track" className="space-y-6 pt-12 border-t border-slate-800 scroll-mt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">Select Your Deployment Track</h2>
          <p className="text-sm text-slate-400">Choose your industry scenario to begin your cloud architecture simulation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* TRACK 1 */}
          <div className="bg-slate-900/90 border-2 border-emerald-500 rounded-2xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <Building2 className="w-6 h-6 text-emerald-400" />
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">Active Track</span>
            </div>
            <h3 className="text-xl font-bold text-white">SoleSpace E-Commerce</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retail &amp; High-Scale Infrastructure Track addressing peak traffic crashes in Kenya &amp; South Africa.
            </p>
            <button
              onClick={onAcceptTrack}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              Launch SoleSpace Assignment <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* TRACK 2 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 opacity-75">
            <div className="flex items-center justify-between">
              <Database className="w-5 h-5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">Locked • Domain 2</span>
            </div>
            <h3 className="text-lg font-bold text-slate-300">AfriHealth Telemed</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Healthcare Data Residency &amp; Hybrid Cloud Migration. Unlocks after Domain 1 completion.
            </p>
            <button disabled className="w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-semibold text-xs cursor-not-allowed">
              Locked
            </button>
          </div>

          {/* TRACK 3 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 opacity-75">
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700">Locked • Domain 3</span>
            </div>
            <h3 className="text-lg font-bold text-slate-300">EduBridge Academy</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pan-African Student Portal Security &amp; Cost Management. Unlocks after Domain 2.
            </p>
            <button disabled className="w-full py-3 rounded-xl bg-slate-800 text-slate-500 font-semibold text-xs cursor-not-allowed">
              Locked
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ScreenOnboarding;