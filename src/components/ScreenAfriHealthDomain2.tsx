// src/components/ScreenAfriHealthDomain2.tsx
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Database, ShieldCheck, Server, Globe, Cpu, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface ScreenAfriHealthDomain2Props {
  xp: number;
  onBack: () => void;
  onCompleteDomain2: () => void;
}

export const ScreenAfriHealthDomain2: React.FC<ScreenAfriHealthDomain2Props> = ({
  xp,
  onBack,
  onCompleteDomain2,
}) => {
  const [selectedStorage, setSelectedStorage] = useState<string>('blob-local');
  const [selectedRegion, setSelectedRegion] = useState<string>('south-africa-north');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  const handleArchitectureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (selectedStorage === 'blob-geo' && selectedRegion === 'south-africa-north') {
      setQuizPassed(true);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Tracks</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
            Domain 2: Azure Architecture &amp; Services
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Current XP: {xp + 25}
          </span>
        </div>
      </div>

      {/* Scenario Briefing Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Database className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/30">
              AfriHealth Telemed Crisis Briefing
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Patient Data Residency &amp; High-Availability Architecture</h1>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-4xl">
              AfriHealth handles over 200,0ent telemed sessions daily across Kenya, Nigeria, and South Africa. Regulatory authorities require patient records to remain compliant with strict regional data residency laws while maintaining 99.99% uptime during network dropouts.
            </p>
          </div>
        </div>

        {/* Architecture Workbench Form */}
        <form onSubmit={handleArchitectureSubmit} className="space-y-6 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            Step 1: Configure Azure Storage &amp; Regional Deployment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Storage Configuration */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Storage Redundancy Tier
              </label>
              <div className="space-y-3">
                <div 
                  onClick={() => setSelectedStorage('blob-local')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedStorage === 'blob-local' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Server className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Locally Redundant Storage (LRS)</h3>
                    <p className="text-xs text-slate-400 mt-1">Lowest cost, but replicates data 3 times within a single physical data center.</p>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedStorage('blob-geo')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedStorage === 'blob-geo' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Geo-Zone-Redundant Storage (GZRS)</h3>
                    <p className="text-xs text-slate-400 mt-1">Recommended for healthcare: replicates across availability zones and secondary paired region.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Configuration */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Primary Azure Region Deployment
              </label>
              <div className="space-y-3">
                <div 
                  onClick={() => setSelectedRegion('south-africa-north')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedRegion === 'south-africa-north' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Globe className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white">South Africa North (Johannesburg)</h3>
                    <p className="text-xs text-slate-400 mt-1">Compliant regional hub with dual Availability Zones for low-latency telemetry.</p>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedRegion('us-east')}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                    selectedRegion === 'us-east' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Globe className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white">US East (Virginia)</h3>
                    <p className="text-xs text-slate-400 mt-1">High capacity, but violates African data residency compliance mandates.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer uppercase"
            >
              <Sparkles className="w-4 h-4" />
              <span>Verify Architecture Blueprint</span>
            </button>
          </div>
        </form>

        {/* Verification Result Feedback */}
        {isSubmitted && (
          <div className={`p-6 rounded-xl border animate-fadeIn space-y-3 ${
            quizPassed ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-3">
              {quizPassed ? <CheckCircle2 className="w-6 h-6 text-emerald-400" /> : <AlertTriangle className="w-6 h-6 text-amber-400" />}
              <h3 className="text-base font-bold text-white">
                {quizPassed ? 'Architecture Approved by Compliance Officer!' : 'Compliance Warning Detected'}
              </h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed">
              {quizPassed 
                ? 'Excellent choice! Using GZRS paired with South Africa North ensures multi-region fault tolerance and strict regulatory compliance for sensitive patient health records.'
                : 'Review your selections: Choosing LRS or deploying outside African compliance zones risks severe regulatory penalties and downtime during regional outages.'}
            </p>

            {quizPassed && (
              <div className="pt-4 border-t border-emerald-500/30 flex justify-end">
                <button
                  onClick={onCompleteDomain2}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg flex items-center gap-2 cursor-pointer uppercase"
                >
                  <span>Unlock Domain 3 (EduBridge Academy)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ScreenAfriHealthDomain2;