import React, { useState } from 'react';
import { 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Server, 
  Layers, 
  TrendingUp, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';

interface ScreenStudyLabProps {
  xp: number;
  studyUnits?: any[];
  onProceed: (earnedXp: number) => void;
  onBack?: () => void;
}

interface StudyTopic {
  id: number;
  title: string;
  shortLabel: string;
  icon: React.ReactNode;
  professionalNotes: string;
  realWorldScenario: {
    analogy: string;
    incidentBridge: string;
  };
  keyTerminology: { term: string; definition: string }[];
  incidentLink: string;
  checkpoint: {
    question: string;
    options: {
      id: 'A' | 'B';
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
}

const DEFAULT_STUDY_TOPICS: StudyTopic[] = [
  {
    id: 1,
    title: '1. What is Cloud Computing?',
    shortLabel: 'Cloud Basics',
    icon: <Server className="w-4 h-4 text-emerald-400" />,
    professionalNotes:
      'Cloud computing is the on-demand delivery of computing services—including compute power, storage, networking, and databases—over the internet ("the cloud") with consumption-based pricing, eliminating the operational overhead of physical datacenter management.',
    realWorldScenario: {
      analogy:
        'Using the municipal power grid instead of building a private diesel generator in your backyard. You do not purchase turbines or pay technicians to repair transformers; you plug into the wall and pay only for the kilowatt-hours consumed.',
      incidentBridge:
        'SoleSpace ran into trouble because they tried to act as their own power station in an office basement.'
    },
    keyTerminology: [
      { term: 'Compute', definition: 'The processing power (CPU and RAM) required to run programs and websites.' },
      { term: 'Datacenter', definition: 'A secure, climate-controlled facility housing physical servers, networking equipment, and backup power.' },
      { term: 'High Availability', definition: 'An architectural guarantee that systems remain operational and accessible with minimal downtime.' }
    ],
    incidentLink:
      'SoleSpace operated as its own utility provider in an unventilated basement. When 15,000 users flooded the storefront, physical hardware hit thermal capacity and shut down to prevent fire. Moving to the cloud shifts hardware uptime to hyperscale Azure datacenters with redundant cooling and automated failover.',
    checkpoint: {
      question: "Why does moving SoleSpace's store to Azure eliminate 504 Gateway Timeouts caused by basement thermal throttling?",
      options: [
        {
          id: 'A',
          text: 'Azure eliminates software bugs in custom application code automatically.',
          isCorrect: false,
          feedback: 'Incorrect. Cloud providers manage infrastructure; bugs in application code remain SoleSpace’s responsibility.'
        },
        {
          id: 'B',
          text: 'Azure provides fault-tolerant datacenter infrastructure with redundant power and cooling backed by SLAs.',
          isCorrect: true,
          feedback: 'Correct! Azure datacenters provide industrial power, redundant cooling, and high availability commitments that replace fragile basement hardware.'
        }
      ]
    }
  },
  {
    id: 2,
    title: '2. The Shared Responsibility Model',
    shortLabel: 'Shared Security',
    icon: <ShieldCheck className="w-4 h-4 text-teal-400" />,
    professionalNotes:
      'A core security framework dividing operational obligations between the cloud provider and the customer. The cloud provider always retains responsibility for physical infrastructure (facilities, hardware, power, cooling), while the customer retains responsibility for data classification, account access, and application code.',
    realWorldScenario: {
      analogy:
        'The apartment rental contract. The building landlord is responsible for fixing roof leaks, servicing the elevator, and staffing the front gate. However, if a tenant leaves their front door unlocked or invites a thief inside, the landlord is not responsible.',
      incidentBridge:
        'SoleSpace wasted precious time worrying about basement air conditioning instead of securing their storefront software and user accounts.'
    },
    keyTerminology: [
      { term: 'Physical Security', definition: 'Perimeter fencing, biometric locks, and security personnel protecting server racks.' },
      { term: 'Data Governance', definition: 'Corporate policies determining who can read, modify, and store customer information and payment details.' },
      { term: 'Host Infrastructure', definition: 'The underlying bare-metal machines and hypervisors managed directly by the cloud provider.' }
    ],
    incidentLink:
      'SoleSpace wasted internal engineering hours trying to physically cool and patch server racks instead of building a resilient retail application. Under Shared Responsibility, Microsoft assumes 100% of physical datacenter maintenance, freeing SoleSpace to focus purely on customer database security and application availability.',
    checkpoint: {
      question: "If SoleSpace completes an IaaS migration to Azure, who is responsible if a customer's password is leaked due to poor access control configuration?",
      options: [
        {
          id: 'A',
          text: 'Microsoft, because they host the virtual machines.',
          isCorrect: false,
          feedback: 'Incorrect. Under the Shared Responsibility Model, cloud customers always maintain sole accountability for user access and credentials.'
        },
        {
          id: 'B',
          text: 'SoleSpace, because the customer always retains responsibility for access management and user data.',
          isCorrect: true,
          feedback: 'Correct! Microsoft protects the datacenter and hardware, but identity configuration and data security remain the customer’s duty.'
        }
      ]
    }
  },
  {
    id: 3,
    title: '3. Cloud Service Models (IaaS, PaaS, SaaS)',
    shortLabel: 'Service Models',
    icon: <Layers className="w-4 h-4 text-blue-400" />,
    professionalNotes:
      'Three foundational tiers defining customer control versus vendor management. Infrastructure as a Service (IaaS) provides maximum control over virtual machines and networking; Platform as a Service (PaaS) abstracts the underlying OS to provide managed runtime environments; Software as a Service (SaaS) delivers fully managed end-user applications.',
    realWorldScenario: {
      analogy:
        'The transportation model. SaaS is taking a commercial airliner (everything is managed for you; you just take your seat). PaaS is renting a taxi or Uber (the driver manages vehicle mechanics, but you set the route). IaaS is renting a car from an agency (they supply the vehicle, but you drive, refuel, and navigate).',
      incidentBridge:
        'SoleSpace needs IaaS right now because they have custom code that needs to be "Lift-and-Shifted" to virtual servers immediately without rewriting from scratch.'
    },
    keyTerminology: [
      { term: 'IaaS', definition: 'Rented virtual hardware where you configure and manage the operating system, storage, and networking.' },
      { term: 'Lift-and-Shift', definition: 'Rehosting an existing on-premises application into cloud virtual machines with minimal or zero code alterations.' },
      { term: 'Virtual Machine (VM)', definition: 'A software-based emulation of a physical computer running its own operating system on datacenter hardware.' }
    ],
    incidentLink:
      'Rebuilding the custom sneaker storefront from scratch on a managed platform would take months SoleSpace does not have before the next drop. Moving to IaaS (Lift-and-Shift) lets the engineering team deploy their existing virtual server images straight into Azure Virtual Machines without rewriting backend code.',
    checkpoint: {
      question: "Why is an IaaS Lift-and-Shift migration recommended over PaaS or SaaS for SoleSpace's immediate crisis?",
      options: [
        {
          id: 'A',
          text: 'It requires rewriting the database schema from the ground up for maximum speed.',
          isCorrect: false,
          feedback: 'Incorrect. Rewriting schemas and architectures is costly and time-prohibitive during an emergency.'
        },
        {
          id: 'B',
          text: 'It enables fast rehosting of existing custom storefront code onto cloud VMs without costly architectural redesigns.',
          isCorrect: true,
          feedback: 'Correct! IaaS enables immediate Lift-and-Shift, letting SoleSpace migrate their current codebase to stable VMs in days.'
        }
      ]
    }
  },
  {
    id: 4,
    title: '4. Financial Models & Elasticity (CapEx vs. OpEx)',
    shortLabel: 'CapEx & Elasticity',
    icon: <TrendingUp className="w-4 h-4 text-amber-400" />,
    professionalNotes:
      'Financial strategies governing infrastructure procurement. Capital Expenditure (CapEx) involves substantial upfront investments in physical assets with fixed capacity and multi-year depreciation. Operational Expenditure (OpEx) leverages consumption-based billing where costs correlate directly to active usage, optimized through dynamic elasticity.',
    realWorldScenario: {
      analogy:
        'Running a seasonal delivery business. CapEx is purchasing 20 commercial delivery vans in cash on day one, even if you only deliver packages during the December holiday rush—the rest of the year, they sit parked, depreciating and gathering dust. OpEx is hiring couriers on demand only when an order is placed.',
      incidentBridge:
        "SoleSpace's board wants to spend KES 40,000 on physical servers that sit idle 28 days a month between limited sneaker drops."
    },
    keyTerminology: [
      { term: 'CapEx', definition: 'Upfront capital spending on fixed physical assets depreciated over multi-year cycles.' },
      { term: 'OpEx', definition: 'Day-to-day operating costs billed as current expenses based directly on actual consumption.' },
      { term: 'Elasticity', definition: 'The capability of cloud infrastructure to automatically allocate and deallocate compute capacity in real time to match immediate traffic demand.' }
    ],
    incidentLink:
      'Spending KES 40,000 on 10 to 20 physical servers locks up capital in assets that run idle for 28 days every month. Shifting to an OpEx consumption model with Elasticity means compute instances automatically spin up during the 4-minute drop window and shrink back to baseline immediately after.',
    checkpoint: {
      question: "How does combining OpEx with Cloud Elasticity resolve the founders' fear of wasted capital?",
      options: [
        {
          id: 'A',
          text: 'It commits the business to a 3-year fixed-cost hardware lease.',
          isCorrect: false,
          feedback: 'Incorrect. Fixed multi-year commitments mimic CapEx traps by charging for idle resources.'
        },
        {
          id: 'B',
          text: 'Costs fluctuate dynamically with user traffic, charging the company only for resources consumed during active drops.',
          isCorrect: true,
          feedback: 'Correct! Elastic OpEx ensures SoleSpace pays only for high compute capacity during the drop, collapsing costs back to baseline afterward.'
        }
      ]
    }
  }
];

export const ScreenStudyLab: React.FC<ScreenStudyLabProps> = ({ xp, studyUnits, onProceed, onBack }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);

  // Dynamically map incoming studyUnits (like EduBridge) into the component's internal format
  const activeTopics: StudyTopic[] = React.useMemo(() => {
    if (!studyUnits || studyUnits.length === 0) {
      return DEFAULT_STUDY_TOPICS;
    }

    const defaultIcons = [
      <Server key="1" className="w-4 h-4 text-emerald-400" />,
      <ShieldCheck key="2" className="w-4 h-4 text-teal-400" />,
      <Layers key="3" className="w-4 h-4 text-blue-400" />,
      <TrendingUp key="4" className="w-4 h-4 text-amber-400" />
    ];

    return studyUnits.map((u, idx) => ({
      id: idx + 1,
      title: `${u.unitNumber || `0${idx + 1}`}. ${u.title}`,
      shortLabel: u.title.split('&')[0].trim(),
      icon: defaultIcons[idx % defaultIcons.length],
      professionalNotes: u.notes || '',
      realWorldScenario: {
        analogy: u.analogy || '',
        incidentBridge: u.incidentBridge || ''
      },
      keyTerminology: (u.terms || []).map((t: any) => ({
        term: t.name || t.term || '',
        definition: t.definition || ''
      })),
      incidentLink: u.incidentBridge || '',
      checkpoint: {
        question: u.checkpoint?.question || '',
        options: (u.checkpoint?.options || []).map((opt: any) => ({
          id: opt.id as 'A' | 'B',
          text: opt.text,
          isCorrect: !!opt.isCorrect,
          feedback: opt.isCorrect
            ? 'Correct! Accurate application of Azure governance and security architecture.'
            : 'Incorrect. Review the governance guidelines and re-evaluate the risk.'
        }))
      }
    }));
  }, [studyUnits]);

  const currentTopic = activeTopics.find((t) => t.id === activeTab) || activeTopics[0];

  const handleSelectOption = (topicId: number, optionId: 'A' | 'B') => {
    setSelectedAnswers((prev) => ({ ...prev, [topicId]: optionId }));
    const chosenOption = currentTopic.checkpoint.options.find((o) => o.id === optionId);
    if (chosenOption?.isCorrect && !completedTopics.includes(topicId)) {
      setCompletedTopics((prev) => [...prev, topicId]);
    }
  };

  const allCompleted = completedTopics.length === activeTopics.length;
  const isEduBridge = studyUnits && studyUnits.length > 0;

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Header & Context Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-2">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Strategic Decision</span>
              </button>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  Stage 2: Technical Desk Briefing
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isEduBridge ? 'Domain 3: Governance, Security & Management' : 'Domain 1: Cloud Concepts'}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Intern Study Lab: Mastering AZ-900 Core Architecture
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 shadow-md self-start sm:self-auto">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{xp} XP</span>
          </div>
        </div>

        {/* Narrative Context Alert */}
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Intern Operational Assignment
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isEduBridge
                  ? 'Master the 4 core Azure Governance, Policy, and Security modules below. Complete each diagnostic checkpoint to prepare your Pan-African Governance Charter for the Boardroom Defense.'
                  : "You are tasked with preparing an executive proposal demonstrating how Cloud services will resolve SoleSpace's recurring server crashes. Before stepping into the boardroom defense, you must master the 4 core AZ-900 syllabus units below and validate your understanding at each diagnostic checkpoint."}
              </p>
            </div>
          </div>
        </div>

        {/* Topic Switcher Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {activeTopics.map((topic) => {
            const isActive = activeTab === topic.id;
            const isCompleted = completedTopics.includes(topic.id);

            return (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-md ring-1 ring-emerald-500/40'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  {topic.icon}
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">0{topic.id}</span>
                  )}
                </div>
                <p className="text-xs font-bold text-white truncate">{topic.shortLabel}</p>
              </button>
            );
          })}
        </div>

        {/* 3-Tier Card Structure for the Current Topic */}
        <div className="space-y-5">
          
          {/* Header of Active Topic */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {currentTopic.icon}
              {currentTopic.title}
            </h3>
            <span className="text-xs text-slate-400">
              Module Completion: <span className="text-emerald-400 font-bold">{completedTopics.length}</span>/{activeTopics.length}
            </span>
          </div>

          {/* Tier 1: Professional Notes */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                Tier 1: Professional Notes (Official Syllabus)
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              {currentTopic.professionalNotes}
            </p>
          </div>

          {/* Tier 2: Real-World Scenario */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                Tier 2: Real-World Scenario (The Bridge)
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p><strong className="text-slate-100">Analogy:</strong> {currentTopic.realWorldScenario.analogy}</p>
              <p className="text-emerald-300">
                <strong className="text-emerald-200">
                  {isEduBridge ? 'EduBridge Incident Bridge:' : 'SoleSpace Incident Bridge:'}
                </strong>{' '}
                {currentTopic.realWorldScenario.incidentBridge}
              </p>
            </div>
          </div>

          {/* Tier 3: Key Terminology */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded">
                Tier 3: Key Terminology (Glossary Pill Box)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentTopic.keyTerminology.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 space-y-1">
                  <p className="text-xs font-bold text-white">{item.term}</p>
                  <p className="text-[11px] text-slate-400 leading-normal">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Checkpoint Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Incident Link &amp; Diagnostic Checkpoint
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {currentTopic.incidentLink}
              </p>
              <p className="text-sm font-semibold text-white">
                {currentTopic.checkpoint.question}
              </p>
            </div>

            {/* MCQ Options */}
            <div className="space-y-3">
              {currentTopic.checkpoint.options.map((option) => {
                const isSelected = selectedAnswers[currentTopic.id] === option.id;
                const showFeedback = isSelected;

                let borderClasses = 'border-slate-800 bg-slate-950/50 hover:border-slate-700';
                if (isSelected) {
                  borderClasses = option.isCorrect
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-red-500 bg-red-950/20';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(currentTopic.id, option.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${borderClasses}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? option.isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-red-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {option.id}
                      </span>
                      <div className="w-full space-y-2">
                        <p className="text-xs sm:text-sm font-medium text-slate-200">
                          {option.text}
                        </p>

                        {showFeedback && (
                          <div className={`flex items-start gap-2 text-xs pt-2 border-t border-slate-800/80 ${
                            option.isCorrect ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'
                          }`}>
                            {option.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            )}
                            <span>{option.feedback}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Complete all {activeTopics.length} checkpoints to unlock the Boardroom Proposal Workspace.</span>
          </div>

          <button
            onClick={() => onProceed(150)}
            disabled={!allCompleted}
            className={`font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
              allCompleted
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            Advance to Boardroom Proposal (+150 XP) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};