// src/components/ScreenAfriHealthDomain2.tsx
// src/components/ScreenAfriHealthDomain2.tsx
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Database, Cpu, CheckCircle2, Network } from 'lucide-react';

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
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);

  // Stage 1 State: Storage & Region
  const [selectedStorage, setSelectedStorage] = useState<string>('blob-local');
  const [selectedRegion, setSelectedRegion] = useState<string>('south-africa-north');
  const [stage1Passed, setStage1Passed] = useState(false);

  // Stage 2 State: Compute
  const [selectedCompute, setSelectedCompute] = useState<string>('vm');
  const [stage2Passed, setStage2Passed] = useState(false);

  // Stage 3 State: Networking
  const [selectedNetwork, setSelectedNetwork] = useState<string>('vnet-vpn');
  const [stage3Passed, setStage3Passed] = useState(false);

  const handleStage1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStorage === 'blob-geo' && selectedRegion === 'south-africa-north') {
      setStage1Passed(true);
    } else {
      setStage1Passed(false);
    }
  };

  const handleStage2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCompute === 'app-service') {
      setStage2Passed(true);
    } else {
      setStage2Passed(false);
    }
  };

  const handleStage3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNetwork === 'expressroute') {
      setStage3Passed(true);
    } else {
      setStage3Passed(false);
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
            Current XP: {xp + (stage1Passed ? 25 : 0) + (stage2Passed ? 25 : 0) + (stage3Passed ? 50 : 0)}
          </span>
        </div>
      </div>

      {/* Progress Tabs */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border flex items-center gap-3 transition ${currentStage === 1 ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center font-bold text-teal-400 text-xs">01</div>
          <div>
            <h4 className="text-xs font-bold uppercase">Storage &amp; Region</h4>
            <p className="text-[10px] text-slate-400">Data Residency &amp; GZRS</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center gap-3 transition ${currentStage === 2 ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center font-bold text-teal-400 text-xs">02</div>
          <div>
            <h4 className="text-xs font-bold uppercase">Compute Services</h4>
            <p className="text-[10px] text-slate-400">VMs vs. App Service</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center gap-3 transition ${currentStage === 3 ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
          <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center font-bold text-teal-400 text-xs">03</div>
          <div>
            <h4 className="text-xs font-bold uppercase">Hybrid Networking</h4>
            <p className="text-[10px] text-slate-400">ExpressRoute &amp; VNets</p>
          </div>
        </div>
      </div>

      {/* STAGE 1: STORAGE & REGION */}
      {currentStage === 1 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Database className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/30">
                AfriHealth Crisis Briefing • Part 1
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">Patient Data Residency &amp; Storage Redundancy</h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Configure compliant storage redundancy and regional deployment to safeguard 200,000 daily telemedicine sessions.
              </p>
            </div>
          </div>

          <form onSubmit={handleStage1Submit} className="space-y-6 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Storage Redundancy Tier</label>
                <div className="space-y-3">
                  <div onClick={() => setSelectedStorage('blob-local')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedStorage === 'blob-local' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <h3 className="text-sm font-bold text-white">Locally Redundant Storage (LRS)</h3>
                    <p className="text-xs text-slate-400 mt-1">Replicates 3 times within a single data center.</p>
                  </div>
                  <div onClick={() => setSelectedStorage('blob-geo')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedStorage === 'blob-geo' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <h3 className="text-sm font-bold text-white">Geo-Zone-Redundant Storage (GZRS)</h3>
                    <p className="text-xs text-slate-400 mt-1">Replicates across availability zones &amp; secondary paired region.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Primary Azure Region</label>
                <div className="space-y-3">
                  <div onClick={() => setSelectedRegion('south-africa-north')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedRegion === 'south-africa-north' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <h3 className="text-sm font-bold text-white">South Africa North (Johannesburg)</h3>
                    <p className="text-xs text-slate-400 mt-1">Compliant regional hub with dual Availability Zones.</p>
                  </div>
                  <div onClick={() => setSelectedRegion('us-east')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedRegion === 'us-east' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <h3 className="text-sm font-bold text-white">US East (Virginia)</h3>
                    <p className="text-xs text-slate-400 mt-1">Violates African data residency compliance mandates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition cursor-pointer uppercase">
                Verify Storage Blueprint
              </button>
            </div>
          </form>

          {stage1Passed && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">Stage 1 Verified! GZRS &amp; South Africa North approved.</span>
              </div>
              <button onClick={() => setCurrentStage(2)} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer">
                Proceed to Compute (Stage 2) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: COMPUTE SERVICES */}
      {currentStage === 2 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Cpu className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/30">
                AfriHealth Crisis Briefing • Part 2
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">Choose Your Telemedicine Compute Service</h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Doctors need to deploy a rapid web application portal without managing underlying OS patches or virtual machine infrastructure.
              </p>
            </div>
          </div>

          <form onSubmit={handleStage2Submit} className="space-y-6 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div onClick={() => setSelectedCompute('vm')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedCompute === 'vm' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <h3 className="text-sm font-bold text-white">Azure Virtual Machines (IaaS)</h3>
                <p className="text-xs text-slate-400 mt-1">Full control over OS, but requires manual patching and high maintenance.</p>
              </div>

              <div onClick={() => setSelectedCompute('app-service')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedCompute === 'app-service' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <h3 className="text-sm font-bold text-white">Azure App Service (PaaS)</h3>
                <p className="text-xs text-slate-400 mt-1">Managed platform designed for web apps with auto-scaling and built-in load balancing.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setCurrentStage(1)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">Back</button>
              <button type="submit" className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition cursor-pointer uppercase">Verify Compute Selection</button>
            </div>
          </form>

          {stage2Passed && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold">Stage 2 Verified! Azure App Service (PaaS) selected for zero-maintenance scaling.</span>
              </div>
              <button onClick={() => setCurrentStage(3)} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer">
                Proceed to Networking (Stage 3) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 3: HYBRID NETWORKING */}
      {currentStage === 3 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Network className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/30">
                AfriHealth Crisis Briefing • Part 3
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">Secure Hospital-to-Cloud Connectivity</h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Nairobi General Hospital needs a dedicated, high-speed, reliable connection to Azure that bypasses the public internet entirely.
              </p>
            </div>
          </div>

          <form onSubmit={handleStage3Submit} className="space-y-6 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div onClick={() => setSelectedNetwork('vnet-vpn')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedNetwork === 'vnet-vpn' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <h3 className="text-sm font-bold text-white">Site-to-Site VPN over Public Internet</h3>
                <p className="text-xs text-slate-400 mt-1">Encrypted tunnel, but subject to public internet jitter and bandwidth limits.</p>
              </div>

              <div onClick={() => setSelectedNetwork('expressroute')} className={`p-4 rounded-xl border transition cursor-pointer ${selectedNetwork === 'expressroute' ? 'bg-teal-500/10 border-teal-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <h3 className="text-sm font-bold text-white">Azure ExpressRoute</h3>
                <p className="text-xs text-slate-400 mt-1">Dedicated private connection offering higher security, reliability, and faster speeds.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setCurrentStage(2)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs">Back</button>
              <button type="submit" className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition cursor-pointer uppercase">Verify Network Architecture</button>
            </div>
          </form>

          {stage3Passed && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Domain 2 Architecture Fully Complete!</h3>
              </div>
              <p className="text-xs">You have successfully mastered Azure Storage redundancy, PaaS compute scaling, and ExpressRoute hybrid networking for AfriHealth.</p>

              <div className="pt-4 border-t border-emerald-500/30 flex justify-end">
                <button
                  onClick={onCompleteDomain2}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg flex items-center gap-2 cursor-pointer uppercase"
                >
                  <span>Complete Domain 2 &amp; Return to Hub (+100 XP)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ScreenAfriHealthDomain2;