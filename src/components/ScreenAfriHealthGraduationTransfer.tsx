// src/components/ScreenAfriHealthGraduationTransfer.tsx
import React, { useState, useRef } from 'react';
import { 
  Zap, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Layers, 
  Building2, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface ScreenAfriHealthGraduationTransferProps {
  xp: number;
  onBack: () => void;
  onRestart: () => void;
  onLaunchDomain3: () => void;
}

export const ScreenAfriHealthGraduationTransfer: React.FC<ScreenAfriHealthGraduationTransferProps> = ({ 
  xp, 
  onBack, 
  onRestart,
  onLaunchDomain3 
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-teal-400 transition cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to AfriHealth Workspace</span>
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Stage: Domain 2 Clearance &amp; Module 3 Briefing
                </span>
                <span className="text-xs text-slate-400 font-medium">Domain 2 Complete • Transition Phase</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                Career Milestone: Pan-African Cloud Transfer Order
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 shadow-md">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{xp} Total XP</span>
          </div>
        </div>

        {/* Video Dispatch Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Incoming Video Dispatch: Lead Cloud Mentor Zawadi Mutua
              </h3>
            </div>
            <span className="text-xs font-mono text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-md">
              HQ Uplink • 1080p AI Video
            </span>
          </div>

          {/* Video Player Card */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-3 md:p-6">
            <div className="w-full max-w-2xl relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
              <video
                ref={videoRef}
                src="/videos/zawadi-domain2-transfer.mp4"
                controls
                autoPlay
                playsInline
                preload="metadata"
                onEnded={() => setVideoEnded(true)}
                className="w-full h-auto max-h-[460px] object-cover mx-auto"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Transcript */}
            <div className="w-full max-w-2xl mt-4 bg-slate-900/90 border border-slate-800 rounded-xl px-5 py-3 text-center">
              <p className="text-xs sm:text-sm font-semibold text-teal-300 leading-relaxed italic">
                &ldquo;Congratulations intern, your cloud proposal was approved. You&apos;re officially cleared for transfer to module three, describe azure management and governance, well done.&rdquo;
              </p>
            </div>

            {videoEnded && (
              <button
                onClick={handleReplay}
                className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay Transmission
              </button>
            )}
          </div>
        </div>

        {/* Transfer Dossier & Module 3 Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Official Transfer Order */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Official Reassignment Order
                </h4>
                <p className="text-[10px] text-slate-400">AfriHealth Telemed Board</p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300 font-sans">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-teal-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Domain 2 Approved
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Prior Deployment:</span>
                <span className="font-medium text-white">AfriHealth Telemed</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Completed Capstone:</span>
                <span className="font-medium text-teal-400">Domain 2: Azure Architecture &amp; Services</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Assigned Next Entity:</span>
                <span className="font-medium text-purple-400">EduBridge Academy</span>
              </div>

              <p className="pt-2 text-slate-400 italic leading-relaxed text-[11px]">
                &ldquo;Intern has mastered Azure regions, compute, storage accounts (LRS/GZRS), and virtual networking. Cleared for advanced management and governance deployment.&rdquo;
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white">Domain 2 Credential Unlocked</span>
              </div>
              <span className="text-xs font-mono font-bold text-teal-400">+150 XP Transfer Bonus</span>
            </div>
          </div>

          {/* Module 3 Roadmap (Unlocked Domain 3) */}
          <div className="lg:col-span-7 bg-slate-900 border border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Next Milestone • Domain 3
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Domain 3 Unlocked
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Describe Azure Management and Governance (EduBridge Academy)
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                Exam Weight: ~30-35%
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You have completed core architectural services. Your final deployment at <strong className="text-purple-400">EduBridge Academy</strong> covers enterprise governance:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> Cost Governance
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Cost Management, Budgets, and Tagging strategies.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <Layers className="w-4 h-4" /> Management Groups
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Subscriptions, Resource Groups, and Azure Policy enforcement.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                  <Award className="w-4 h-4" /> Compliance
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Role-Based Access Control (RBAC) and Microsoft Purview.
                </p>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" /> Return to Desk
              </button>

              <button
                onClick={onLaunchDomain3}
                className="w-full sm:flex-1 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Domain 3: EduBridge Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};