import React, { useState, useRef } from 'react';
import { 
  Zap, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Layers, 
  Building2, 
  Globe2, 
  Server, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles,
  Lock,
  Globe
} from 'lucide-react';

export interface ScreenGraduationTransferProps {
  xp: number;
  domain?: string;
  videoSrc?: string;
  onBack: () => void;
  onRestart: () => void;
}

export const ScreenGraduationTransfer: React.FC<ScreenGraduationTransferProps> = ({ 
  xp, 
  domain, 
  videoSrc, 
  onBack, 
  onRestart 
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);

  const isEduBridge = domain === 'edubridge';
  const resolvedVideoSrc = videoSrc || (isEduBridge ? '/videos/zawadi-domain3-complete.mp4' : '/videos/zawadi-transfer.mp4');

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
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Boardroom Verdict</span>
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 
                  {isEduBridge ? 'Stage 7: Governance Transfer Clearance' : 'Stage 7: Transfer Clearance & Module 2 Briefing'}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isEduBridge ? 'Domain 3 Complete • Certification Phase' : 'Domain 1 Complete • Transition Phase'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                {isEduBridge ? 'Career Milestone: Pan-African Governance Charter Clearance' : 'Career Milestone: Enterprise Cloud Transfer Order'}
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
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Incoming Video Dispatch: Lead Cloud Mentor Zawadi Mutua
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-md">
              HQ Uplink • 1080p AI Video
            </span>
          </div>

          {/* Video Player Card */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-3 md:p-6">
            <div className="w-full max-w-2xl relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
              <video
                key={resolvedVideoSrc}
                ref={videoRef}
                src={resolvedVideoSrc}
                controls
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => setVideoEnded(true)}
                className="w-full h-auto max-h-[460px] object-cover mx-auto"
              >
                Your browser does not support HTML5 video.
              </video>
            </div>

            {/* Transcript */}
            <div className="w-full max-w-2xl mt-4 bg-slate-900/90 border border-slate-800 rounded-xl px-5 py-3 text-center">
              <p className="text-xs sm:text-sm font-semibold text-emerald-300 leading-relaxed italic">
                {isEduBridge
                  ? '“Congratulations, Cloud Architect! Dean Ochieng and the EduBridge Board have fully ratified your Pan-African Governance Charter. You have officially mastered AZ-900 Domain 3: Governance, Security, and Management!”'
                  : '“Congratulations, Intern! Your cloud proposal was approved. You’re officially cleared for transfer to Module Two: Core Azure Architecture. Well done!”'}
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

        {/* Transfer Dossier & Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Official Transfer Order */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Building2 className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {isEduBridge ? 'Official Governance Ratification Order' : 'Official Reassignment Order'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  {isEduBridge ? 'EduBridge Pan-African Directorate' : 'SoleSpace IT Transition Board'}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300 font-sans">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Charter Enacted
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">{isEduBridge ? 'Governed Entity:' : 'Prior Deployment:'}</span>
                <span className="font-medium text-white">
                  {isEduBridge ? 'EduBridge Academy (12 Nations)' : 'SoleSpace Sneaker Storefront'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Completed Capstone:</span>
                <span className="font-medium text-sky-400">
                  {isEduBridge ? 'Domain 3: Governance & Security' : 'Domain 1: Cloud Concepts'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">{isEduBridge ? 'Enforced Scope:' : 'Assigned Next Entity:'}</span>
                <span className="font-medium text-amber-400">
                  {isEduBridge ? 'Root Management Group Hierarchy' : 'Kipaji Logistics Enterprise Cloud'}
                </span>
              </div>

              <p className="pt-2 text-slate-400 italic leading-relaxed text-[11px]">
                {isEduBridge
                  ? '“Architect has proven complete mastery of Azure Management Groups, Azure Policy, CanNotDelete Resource Locks, and Microsoft Entra ID Zero Trust RBAC across all 12 sovereign regional campuses.”'
                  : '“Intern has proven mastery of CapEx to OpEx conversion, Shared Responsibility boundaries, and High Availability SLAs. Recommended for immediate transfer to core Azure Architecture and infrastructure provisioning.”'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white">
                  {isEduBridge ? 'Domain 3 Certified' : 'Domain 1 Credential Unlocked'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">+250 XP Transfer Bonus</span>
            </div>
          </div>

          {/* Roadmap Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {isEduBridge ? 'Track Summary • Competency Verified' : 'Next Milestone • Domain 2'}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Complete
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {isEduBridge
                      ? 'Azure Governance, Privacy & Compliance Specialist'
                      : 'Describe Azure Architecture and Services'}
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                {isEduBridge ? 'Exam Weight: ~25-30%' : 'Exam Weight: ~35-40%'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isEduBridge
                ? 'You have successfully safeguarded 12 African nations against runaway cloud expenses, credential leaks, and accidental database deletions using foundational AZ-900 controls:'
                : 'You have mastered foundational cloud concepts. In the upcoming release, your deployment at Kipaji Logistics Enterprise Cloud unlocks hands-on architectural blueprints across three core areas:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {isEduBridge ? (
                <>
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
                      <Globe className="w-4 h-4" /> Policy & Hierarchy
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Cascading regional restrictions and tags across all subscriptions via Management Groups.
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                      <Lock className="w-4 h-4" /> Resource Locks
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      CanNotDelete locks safeguarding mission-critical student databases from accidental erasure.
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" /> Entra ID & RBAC
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Least privilege access management replacing shared credentials with MFA-backed individual roles.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5 opacity-80">
                    <div className="flex items-center gap-1.5 text-sky-400 text-xs font-bold">
                      <Globe2 className="w-4 h-4" /> Global Regions
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Geographies, Azure Regions, Paired Regions, and Latency Routing.
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5 opacity-80">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                      <Server className="w-4 h-4" /> Compute & Net
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Virtual Machines, Containers, App Services, and Virtual Networks (VNets).
                    </p>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5 opacity-80">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                      <ShieldCheck className="w-4 h-4" /> Hierarchy
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Management Groups, Subscriptions, and Resource Groups governance.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Action Area */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-4 h-4" /> Replay CapExToCloud Track
              </button>

              <div className="w-full sm:flex-1 px-5 py-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 select-none">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Track Finished • Ready for AZ-900 Exam</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};