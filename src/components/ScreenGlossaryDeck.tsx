import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  Maximize2, 
  Activity, 
  ShieldAlert, 
  Clock, 
  Sliders, 
  LineChart, 
  Leaf, 
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText,
  RotateCcw
} from 'lucide-react';

interface ScreenGlossaryDeckProps {
  xp: number;
  onProceed: (earnedXp: number) => void;
  onBack: () => void;
}

interface ArchitecturalConcept {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeBg: string;
  definition: string;
  examTrap?: string;
  executiveSlideLine: string;
}

interface BoardroomPanic {
  id: string;
  speaker: string;
  role: string;
  quote: string;
  targetConceptId: string;
}

const CONCEPTS: ArchitecturalConcept[] = [
  {
    id: 'scalability',
    name: 'Scalability',
    category: 'Resource Capacity',
    icon: <Maximize2 className="w-5 h-5 text-sky-400" />,
    accentColor: 'border-sky-500/40 hover:border-sky-500',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    definition: 'The ability to allocate and de-allocate resources to meet changing performance requirements (scaling up/vertically with more CPU/RAM, or scaling out/horizontally by adding VM instances).',
    examTrap: 'AZ-900 Trap: Scalability is capacity potential (sizing up/out). Do not confuse with Elasticity, which is dynamic automatic scaling in real time.',
    executiveSlideLine: 'Architectural provision for horizontal VM scale-out and vertical RAM expansion to accommodate planned seasonal catalogue growth.'
  },
  {
    id: 'elasticity',
    name: 'Elasticity',
    category: 'Dynamic Autoscaling',
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    accentColor: 'border-emerald-500/40 hover:border-emerald-500',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    definition: 'The ability of cloud systems to dynamically adapt capacity in real time—automatically adding instances during sudden sneaker drops and removing them when traffic returns to normal.',
    examTrap: 'AZ-900 Trap: Elasticity is real-time automation. It reacts immediately to sudden spikes and contracts automatically to avoid idle billing.',
    executiveSlideLine: 'Automated autoscaling triggers to burst compute instances during 4-minute sneaker drops and collapse immediately to idle baseline.'
  },
  {
    id: 'reliability',
    name: 'Reliability',
    category: 'Fault Tolerance',
    icon: <ShieldAlert className="w-5 h-5 text-teal-400" />,
    accentColor: 'border-teal-500/40 hover:border-teal-500',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
    definition: 'The ability of a system to recover from failures and continue to function, backed by decentralized cloud infrastructure and automated health-check failover.',
    examTrap: 'AZ-900 Trap: Reliability measures resilience and self-healing when failure occurs, whereas Availability measures raw uptime percentage.',
    executiveSlideLine: 'Elimination of basement hardware single-points-of-failure using multi-datacenter Azure availability sets with automated node recovery.'
  },
  {
    id: 'availability',
    name: 'Availability',
    category: 'Operational SLA',
    icon: <Clock className="w-5 h-5 text-indigo-400" />,
    accentColor: 'border-indigo-500/40 hover:border-indigo-500',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    definition: 'The percentage of time a system is fully operational and accessible to shoppers (measured in High Availability SLAs, like 99.99%).',
    examTrap: 'AZ-900 Trap: Measured mathematically as uptime percentage against contractual SLAs (e.g., 99.9% vs 99.99%).',
    executiveSlideLine: 'Formal enterprise SLA target guarantees of 99.95%+ storefront uptime during operational revenue cycles.'
  },
  {
    id: 'manageability',
    name: 'Manageability',
    category: 'DevOps & Administration',
    icon: <Sliders className="w-5 h-5 text-amber-400" />,
    accentColor: 'border-amber-500/40 hover:border-amber-500',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    definition: 'The administrative controls provided by Azure to manage workloads—such as automated ARM/Bicep template deployments, proactive health monitoring, and resource tagging.',
    executiveSlideLine: 'Centralized infrastructure governance via Azure Monitor alerts, automated backup scheduling, and unified portal administration.'
  },
  {
    id: 'predictability',
    name: 'Predictability',
    category: 'Financial Governance',
    icon: <LineChart className="w-5 h-5 text-purple-400" />,
    accentColor: 'border-purple-500/40 hover:border-purple-500',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    definition: 'Confidence in both technical performance and financial cost through auto-scaling performance baselines and Azure Cost Management budget alerts.',
    executiveSlideLine: 'Transparent OpEx forecasting using Azure Cost Analysis thresholds to prevent unbudgeted cloud infrastructure overages.'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    category: 'Green Computing',
    icon: <Leaf className="w-5 h-5 text-green-400" />,
    accentColor: 'border-green-500/40 hover:border-green-500',
    badgeBg: 'bg-green-500/10 text-green-400 border-green-500/30',
    definition: 'Reducing ecological impact by running on centralized, energy-efficient hyperscale cloud data centers rather than wasteful on-premises office basement servers.',
    executiveSlideLine: 'Transitioning energy-inefficient basement cooling units to carbon-neutral hyperscale Microsoft facilities.'
  }
];

const BOARDROOM_PANICS: BoardroomPanic[] = [
  {
    id: 'panic-1',
    speaker: 'Lerato',
    role: 'Lead Inventory Tech',
    quote: '"15,000 shoppers smashed the drop button at 09:00:01 and the app crashed instantly. We needed 8 extra servers for 4 minutes, and then nothing!"',
    targetConceptId: 'elasticity'
  },
  {
    id: 'panic-2',
    speaker: 'Kagiso',
    role: 'Chief Financial Officer',
    quote: '"I refuse to sign off on KES 40,000 for physical servers that sit idle 28 days a month. How do we keep costs tied strictly to actual traffic without surprise bills?"',
    targetConceptId: 'predictability'
  },
  {
    id: 'panic-3',
    speaker: 'Thabo',
    role: 'Managing Director',
    quote: '"A single power inverter in the basement shorted out and took our whole business offline. Why did one physical breakdown kill the entire store?"',
    targetConceptId: 'reliability'
  },
  {
    id: 'panic-4',
    speaker: 'Sipho',
    role: 'Operations Lead',
    quote: '"The office basement air conditioner runs 24/7, pulling massive dirty power off the grid just to cool 3 dusty machines. It is horribly wasteful."',
    targetConceptId: 'sustainability'
  },
  {
    id: 'panic-5',
    speaker: 'Bontle',
    role: 'Customer Success Head',
    quote: '"Shoppers are threatening to leave us because they could not access their shopping baskets for 6 hours. What concrete uptime percentage can we guarantee them?"',
    targetConceptId: 'availability'
  },
  {
    id: 'panic-6',
    speaker: 'Nandi',
    role: 'Senior SysAdmin',
    quote: '"Our catalog is doubling in size next quarter. Can we comfortably increase our database server RAM and add secondary worker VMs without replacing physical hardware?"',
    targetConceptId: 'scalability'
  },
  {
    id: 'panic-7',
    speaker: 'Thandi',
    role: 'Lead Cloud Mentor',
    quote: '"Our engineers are spending weekends manually patching Linux kernels and checking server health logs. We need automated deployments and health telemetry built-in."',
    targetConceptId: 'manageability'
  }
];

export const ScreenGlossaryDeck: React.FC<ScreenGlossaryDeckProps> = ({ xp, onProceed, onBack }) => {
  const [activePanicIndex, setActivePanicIndex] = useState<number>(0);
  const [matchedConceptIds, setMatchedConceptIds] = useState<string[]>([]);
  const [earnedBonusXp, setEarnedBonusXp] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const currentPanic = BOARDROOM_PANICS[activePanicIndex];
  const isAllComplete = matchedConceptIds.length === BOARDROOM_PANICS.length;

  const handleSelectConcept = (conceptId: string) => {
    if (!currentPanic || isAllComplete) return;

    if (conceptId === currentPanic.targetConceptId) {
      if (!matchedConceptIds.includes(conceptId)) {
        setMatchedConceptIds((prev) => [...prev, conceptId]);
        setEarnedBonusXp((prev) => prev + 15);
      }
      setFeedback({
        message: `Correct! "${currentPanic.speaker}"'s concern is directly solved by ${CONCEPTS.find(c => c.id === conceptId)?.name}. Pinned to slide deck!`,
        isCorrect: true
      });

      const nextIndex = BOARDROOM_PANICS.findIndex(
        (p, idx) => idx > activePanicIndex && !matchedConceptIds.includes(p.targetConceptId)
      );

      if (nextIndex !== -1) {
        setTimeout(() => {
          setActivePanicIndex(nextIndex);
          setFeedback(null);
        }, 1200);
      } else {
        const wrapIndex = BOARDROOM_PANICS.findIndex((p) => !matchedConceptIds.includes(p.targetConceptId) && p.targetConceptId !== conceptId);
        if (wrapIndex !== -1) {
          setTimeout(() => {
            setActivePanicIndex(wrapIndex);
            setFeedback(null);
          }, 1200);
        }
      }
    } else {
      setFeedback({
        message: `Not quite. That concept does not address ${currentPanic.speaker}'s immediate dilemma. Review the definition and try again!`,
        isCorrect: false
      });
    }
  };

  const handleReset = () => {
    setMatchedConceptIds([]);
    setEarnedBonusXp(0);
    setActivePanicIndex(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Navigation Row: Back Button + XP & Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Study Lab</span>
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 rounded-full">
                  Stage 4: Architectural Vocabulary &amp; Executive Deck
                </span>
                <span className="text-xs text-slate-400 font-medium">Domain 1: Cloud Concepts (Module 2)</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                The Boardroom Panic Matcher
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 shadow-md">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{xp + earnedBonusXp} XP</span>
              {earnedBonusXp > 0 && (
                <span className="text-xs text-emerald-400 font-semibold">(+{earnedBonusXp})</span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Narrative Directive Banner */}
        <div className="bg-slate-900/80 border border-sky-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-sky-500" />
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Thandi&apos;s Strategy: Counter Each Panic With Official Architecture
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                SoleSpace&apos;s leadership is terrified of moving to the cloud. Read each stakeholder&apos;s real-world concern below, then click the correct AZ-900 architectural benefit to counter them. Each correct match adds <strong className="text-emerald-400">+15 XP</strong> and writes that capability into your live Executive Proposal Slide.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">

            {!isAllComplete && currentPanic ? (
              <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Incoming Concern #{activePanicIndex + 1} of {BOARDROOM_PANICS.length}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Stakeholder: <strong className="text-white">{currentPanic.speaker}</strong> ({currentPanic.role})
                  </span>
                </div>
                
                <p className="text-sm md:text-base font-semibold text-slate-100 italic bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {currentPanic.quote}
                </p>

                {feedback && (
                  <div className={`mt-3 p-3 rounded-lg text-xs font-medium flex items-start gap-2 ${
                    feedback.isCorrect ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/40 text-red-300 border border-red-500/30'
                  }`}>
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">All 7 Leadership Concerns Neutralized!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  You have successfully connected every SoleSpace operational challenge to its foundational AZ-900 cloud architecture benefit. Your executive proposal slide is fully armed.
                </p>
              </div>
            )}

            {/* Architectural Concepts */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Select the Matching Architectural Remedy:
              </p>

              {CONCEPTS.map((concept) => {
                const isMatched = matchedConceptIds.includes(concept.id);

                return (
                  <div
                    key={concept.id}
                    onClick={() => handleSelectConcept(concept.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-slate-900/40 border-emerald-500/50 opacity-90'
                        : `bg-slate-900/80 border-slate-800 ${concept.accentColor}`
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                          {concept.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white">{concept.name}</span>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${concept.badgeBg}`}>
                              {concept.category}
                            </span>
                            {isMatched && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Pinned
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {concept.definition}
                          </p>

                          {isMatched && concept.examTrap && (
                            <div className="pt-2 text-[11px] text-amber-300 flex items-start gap-1.5 font-medium">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{concept.examTrap}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold shrink-0 transition ${
                          isMatched
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {isMatched ? 'Matched' : 'Assign'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl sticky top-6 space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Executive Proposal Slide Preview
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {matchedConceptIds.length} / 7 Provisions
                </span>
              </div>

              {/* Slide Preview */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-sans shadow-inner min-h-[380px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="border-b border-slate-800/80 pb-2">
                    <p className="text-[10px] text-sky-400 font-mono uppercase tracking-wider">Proposal Slide #2</p>
                    <h4 className="text-sm font-black text-white">
                      SoleSpace Architecture Modernization: Cloud Value Map
                    </h4>
                  </div>

                  {matchedConceptIds.length === 0 ? (
                    <div className="py-16 text-center space-y-2 text-slate-500">
                      <FileText className="w-8 h-8 mx-auto stroke-1" />
                      <p className="text-xs">Slide currently blank.</p>
                      <p className="text-[11px] text-slate-600">
                        Assign architectural concepts to the boardroom panics to assemble your pitch clauses.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {CONCEPTS.filter((c) => matchedConceptIds.includes(c.id)).map((c) => (
                        <div key={c.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              {c.icon} {c.name}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono">+15 XP</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-normal">
                            &ldquo;{c.executiveSlideLine}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Executive Slide Readiness</span>
                    <span className="font-bold text-white">{Math.round((matchedConceptIds.length / 7) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(matchedConceptIds.length / 7) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Proceed Action */}
              <button
                onClick={() => onProceed(earnedBonusXp + 100)}
                disabled={!isAllComplete}
                className={`w-full font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg text-sm cursor-pointer ${
                  isAllComplete
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                Advance to Proposal Workspace (+100 XP) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};