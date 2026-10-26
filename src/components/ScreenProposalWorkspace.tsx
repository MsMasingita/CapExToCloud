import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  FileCheck2, 
  Layers, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Server,
  MessageSquare,
  X,
  Send,
  Bot,
  Lock,
  Globe
} from 'lucide-react';

interface ScreenProposalWorkspaceProps {
  xp: number;
  proposalData?: any;
  onProceed: (earnedXp: number) => void;
  onBack: () => void;
}

interface ProposalSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  prompt: string;
  options: {
    id: string;
    label: string;
    description: string;
    impact: string;
    isOptimal: boolean;
    feedback: string;
  }[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
}

const DEFAULT_PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    id: 'financial',
    title: '1. Financial Strategy & Budget Shift',
    subtitle: 'Cost Structure Transformation',
    icon: <Coins className="w-5 h-5 text-amber-400" />,
    prompt: 'How should SoleSpace restructure its IT spending model for the e-commerce storefront?',
    options: [
      {
        id: 'fin-1',
        label: 'Retain CapEx with Leased On-Prem Rack Servers',
        description: 'Purchase or 3-year lease upgraded physical servers in the head office basement with warranty contracts.',
        impact: 'High upfront cost, continuous depreciation, fixed idle overhead during non-drop months.',
        isOptimal: false,
        feedback: 'Retaining CapEx keeps SoleSpace locked into upfront depreciation and hardware refresh cycles without solving sudden spike bottlenecks.'
      },
      {
        id: 'fin-2',
        label: 'Shift to Azure OpEx (Consumption-Based Pricing)',
        description: 'Eliminate upfront hardware capital expenditures in favor of operational monthly expenses billed strictly on compute usage.',
        impact: 'Zero upfront hardware investment, near-zero cost during slow months, full cost transparency via Azure Cost Management.',
        isOptimal: true,
        feedback: 'Correct! OpEx aligns SoleSpace expenses directly to revenue-generating sneaker drops with predictable consumption billing.'
      },
      {
        id: 'fin-3',
        label: 'Private Datacenter Co-location Outsourcing',
        description: 'Rent dedicated physical cage space in a commercial third-party facility while continuing to own physical blades.',
        impact: 'Reduces cooling hassle but maintains heavy hardware CapEx and multi-year lease lock-in.',
        isOptimal: false,
        feedback: 'Co-location is still predominantly CapEx and does not give SoleSpace cloud elasticity or on-demand scaling.'
      }
    ]
  },
  {
    id: 'architecture',
    title: '2. Application & Database Service Model',
    subtitle: 'Compute & Storage Architecture',
    icon: <Layers className="w-5 h-5 text-sky-400" />,
    prompt: 'Which cloud service model tier provides the optimal balance of agility, auto-patching, and control?',
    options: [
      {
        id: 'arch-1',
        label: 'Pure IaaS (Infrastructure as a Service)',
        description: 'Provision Azure Virtual Machines (VMs) and manually install the OS, SQL server, security patches, and runtime packages.',
        impact: 'Maximum OS customization, but sysadmins must still manually patch kernels, maintain backups, and configure clustering.',
        isOptimal: false,
        feedback: 'While IaaS works, it leaves our team burdened with OS security maintenance and manual patching—distracting from sneaker app development.'
      },
      {
        id: 'arch-2',
        label: 'Targeted PaaS (Platform as a Service)',
        description: 'Migrate the storefront to Azure App Service and database to Azure SQL Database with automated patching and automated backup.',
        impact: 'Engineers manage zero OS maintenance; Azure handles runtime scaling, backups, and operating system zero-day patching automatically.',
        isOptimal: true,
        feedback: 'Optimal Choice! PaaS allows SoleSpace to focus purely on code and catalog data while Azure automates underlying OS upkeep.'
      },
      {
        id: 'arch-3',
        label: 'Full Commercial SaaS Replacement',
        description: 'Discard all custom SoleSpace code and subscribe to an off-the-shelf monolithic hosted e-commerce platform.',
        impact: 'Zero development needed, but sacrifices proprietary sneaker raffle mechanics, brand customization, and user data telemetry.',
        isOptimal: false,
        feedback: 'SaaS eliminates our proprietary sneaker raffle code and unique customer drop system that gives SoleSpace its market advantage.'
      }
    ]
  },
  {
    id: 'resilience',
    title: '3. Reliability, Elasticity & High Availability SLA',
    subtitle: 'Drop Day Resiliency Architecture',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    prompt: 'What architectural safeguard ensures zero downtime during viral 4-minute sneaker drops?',
    options: [
      {
        id: 'res-1',
        label: 'Single-Region Fixed VM Capacity',
        description: 'Provision two high-spec static VMs running 24/7 with manual reboot triggers if memory spikes over 90%.',
        impact: 'Low architectural complexity, but risks crashing during 15k concurrent user spikes and pays for idle RAM at night.',
        isOptimal: false,
        feedback: 'Static single-region VMs lack Elasticity and will collapse the moment 15k users rush the checkout at 09:00.'
      },
      {
        id: 'res-2',
        label: 'Azure Autoscaling Sets + Availability Zones (99.99% SLA)',
        description: 'Deploy autoscaling rules that add instances dynamically on CPU > 70% threshold, distributed across independent Azure Availability Zones.',
        impact: 'Instant scale-out during drop bursts, automated self-healing, multi-datacenter physical fault tolerance, 99.99% SLA.',
        isOptimal: true,
        feedback: 'Excellent! Pairing real-time Elasticity with Availability Zones guarantees resilience against both hardware failures and sudden traffic surges.'
      },
      {
        id: 'res-3',
        label: 'Scheduled Nightly Server Restarts',
        description: 'Keep existing basement servers but configure scheduled nightly reboots to clear RAM and hope for steady morning traffic.',
        impact: 'Zero cloud cost, guaranteed repeat of catastrophic outages.',
        isOptimal: false,
        feedback: 'Restarting machines overnight does nothing to resolve flash-traffic bottlenecks or physical power outages during business hours.'
      }
    ]
  }
];

export const ScreenProposalWorkspace: React.FC<ScreenProposalWorkspaceProps> = ({ xp, proposalData, onProceed, onBack }) => {
  const isCustomDomain = Boolean(proposalData && proposalData.clauses);

  const activeSections: ProposalSection[] = useMemo(() => {
    if (!isCustomDomain) {
      return DEFAULT_PROPOSAL_SECTIONS;
    }

    const clauseIcons = [
      <Globe key="1" className="w-5 h-5 text-emerald-400" />,
      <ShieldCheck key="2" className="w-5 h-5 text-teal-400" />,
      <Lock key="3" className="w-5 h-5 text-amber-400" />
    ];

    return proposalData.clauses.map((c: any, idx: number) => ({
      id: c.id,
      title: c.title,
      subtitle: idx === 0 ? 'Data Sovereignty & Regions' : idx === 1 ? 'Zero Trust & Access Control' : 'Accidental Deletion Safeguards',
      icon: clauseIcons[idx % clauseIcons.length],
      prompt: c.prompt,
      options: c.options.map((opt: any, optIdx: number) => {
        const isOpt = optIdx === 0;
        return {
          id: `${c.id}-opt-${optIdx}`,
          label: opt.text.split('.')[0] + '.',
          description: opt.text,
          impact: opt.impact,
          isOptimal: isOpt,
          feedback: isOpt
            ? 'Optimal Clause! Fully aligns with Azure AZ-900 governance best practices and data protection standards.'
            : 'Needs Revision. Leaves EduBridge vulnerable to compliance penalties, data loss, or administrative risk.'
        };
      })
    }));
  }, [proposalData, isCustomDomain]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [earnedBonusXp, setEarnedBonusXp] = useState<number>(0);

  // Chatbot State with Zawadi Mutua
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'mentor',
      text: isCustomDomain
        ? "Habari! I am Zawadi Mutua, your Cloud Systems Mentor. EduBridge's board of directors needs airtight governance. If you need clarity on Management Group policies, RBAC vs Entra ID, or Resource Locks, ask me right here!"
        : "Habari! I am Zawadi Mutua, your Cloud Systems Mentor. Thandi and the board expect a solid technical foundation. If you need a refresher on CapEx vs OpEx, PaaS benefits, or Azure Availability Zones before locking in your proposal clauses, ask me right here!"
    }
  ]);

  const handleSelectOption = (sectionId: string, optionId: string, isOptimal: boolean) => {
    const isFirstTime = !selectedOptions[sectionId];
    setSelectedOptions((prev) => ({ ...prev, [sectionId]: optionId }));

    if (isFirstTime && isOptimal) {
      setEarnedBonusXp((prev) => prev + 50);
    }
  };

  const optimalCount = activeSections.filter((sec) => {
    const selectedId = selectedOptions[sec.id];
    const opt = sec.options.find((o) => o.id === selectedId);
    return opt?.isOptimal;
  }).length;

  const isProposalReady = optimalCount === activeSections.length && activeSections.length > 0;

  // Zawadi's Contextual Query Responder
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let reply = "Remember, the AZ-900 framework focuses on three pillars: OpEx agility, managed PaaS offloading, and multi-zone physical high availability.";
      const q = query.toLowerCase();

      if (isCustomDomain) {
        if (q.includes('policy') || q.includes('region') || q.includes('sovereign') || q.includes('country')) {
          reply = "Azure Policy assigned at the Root Management Group enforces rules programmatically across all 12 African campus subscriptions, blocking non-compliant regions before deployment.";
        } else if (q.includes('rbac') || q.includes('entra') || q.includes('password') || q.includes('identity')) {
          reply = "Eliminate shared root passwords! Microsoft Entra ID enforces individual accounts with MFA, while Azure RBAC applies Least Privilege so tutors only access their specific student resource groups.";
        } else if (q.includes('lock') || q.includes('delete') || q.includes('transcript') || q.includes('accidental')) {
          reply = "Use CanNotDelete Resource Locks on production student registries! Even subscription owners cannot delete locked resources until the lock is deliberately removed.";
        } else {
          reply = "For EduBridge's charter, ensure you select: Root Management Group Policies for region restrictions, Entra ID + RBAC for credential security, and CanNotDelete Locks for database protection.";
        }
      } else {
        if (q.includes('capex') || q.includes('opex') || q.includes('cost') || q.includes('money') || q.includes('financial')) {
          reply = "Here is the key distinction: CapEx forces SoleSpace to spend hefty capital upfront on depreciating hardware that sits idle 28 days a month. OpEx is pure consumption billing—you pay only for compute seconds during actual sneaker drops.";
        } else if (q.includes('paas') || q.includes('iaas') || q.includes('saas') || q.includes('service model')) {
          reply = "With IaaS, we still have to patch Linux/Windows VMs ourselves. With SaaS, we lose our custom sneaker raffle algorithm. PaaS (Azure App Service + Azure SQL) is the sweet spot: Azure automates the OS and backups, while we keep full ownership of our code.";
        } else if (q.includes('zone') || q.includes('elasticity') || q.includes('scale') || q.includes('sla') || q.includes('resilience')) {
          reply = "Autoscaling handles Elasticity (spiking compute for the 4-minute drop). Availability Zones provide physical isolation (separate power, cooling, and networking within the region) with an enterprise 99.99% uptime SLA.";
        } else {
          reply = "My recommendation for the board: pick OpEx for cost discipline, PaaS so our dev team stops playing sysadmin, and Autoscaling + Availability Zones for bulletproof drop uptime.";
        }
      }

      const mentorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'mentor',
        text: reply
      };

      setChatMessages((prev) => [...prev, mentorMsg]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="space-y-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Panic Matcher</span>
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  Stage 5: Migration Proposal Workspace
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {isCustomDomain ? 'Domain 3: Governance, Security & Management' : 'Domain 1: Cloud Concepts (Module 3)'}
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {isCustomDomain ? 'EduBridge Pan-African Governance Charter' : 'C-Suite Cloud Modernization Proposal'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-3.5 py-2 rounded-xl border border-emerald-500/30 text-xs font-bold transition cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Zawadi (Mentor AI)</span>
            </button>

            <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 shadow-md">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{xp + earnedBonusXp} XP</span>
              {earnedBonusXp > 0 && (
                <span className="text-xs text-emerald-400 font-semibold">(+{earnedBonusXp})</span>
              )}
            </div>
          </div>
        </div>

        {/* Strategic Directive */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {isCustomDomain ? 'Dean Ochieng & Zawadi: Draft the Pan-African Governance Charter' : 'Thandi & Zawadi\'s Strategy: Formulate The Executive Clauses'}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isCustomDomain
                  ? 'The EduBridge Board of Directors convenes shortly. Formulate the three mandatory governance clauses below. Each optimal provision awards +50 XP and locks in your compliance defense.'
                  : 'The boardroom meets shortly. Review each proposal dimension below and select the optimal cloud strategy to resolve SoleSpace\'s outages. Each optimal clause awards +50 XP and locks in the executive business case.'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Section Clauses vs. Live Executive Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Drafting Sections */}
          <div className="lg:col-span-7 space-y-6">
            {activeSections.map((section) => {
              const currentSelectedId = selectedOptions[section.id];
              const selectedOption = section.options.find((o) => o.id === currentSelectedId);

              return (
                <div key={section.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  
                  {/* Section Title Bar */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{section.title}</h3>
                        <p className="text-[11px] text-slate-400">{section.subtitle}</p>
                      </div>
                    </div>
                    {selectedOption && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider flex items-center gap-1 ${
                        selectedOption.isOptimal 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {selectedOption.isOptimal ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {selectedOption.isOptimal ? 'Optimal Clause' : 'Needs Revision'}
                      </span>
                    )}
                  </div>

                  {/* Section Prompt */}
                  <p className="text-xs font-semibold text-slate-200">{section.prompt}</p>

                  {/* Option Cards */}
                  <div className="space-y-2.5">
                    {section.options.map((option) => {
                      const isSelected = currentSelectedId === option.id;

                      return (
                        <div
                          key={option.id}
                          onClick={() => handleSelectOption(section.id, option.id, option.isOptimal)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? option.isOptimal
                                ? 'bg-emerald-950/20 border-emerald-500/60 shadow-md shadow-emerald-950/20'
                                : 'bg-red-950/20 border-red-500/50'
                              : 'bg-slate-950/50 hover:bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-white block">
                                {option.label}
                              </span>
                              <p className="text-[11px] text-slate-300 leading-relaxed">
                                {option.description}
                              </p>
                              <p className="text-[10px] text-slate-400 italic">
                                Impact: {option.impact}
                              </p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected
                                ? option.isOptimal 
                                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400' 
                                  : 'border-red-400 bg-red-500/20 text-red-400'
                                : 'border-slate-700 bg-slate-900'
                            }`}>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Box */}
                  {selectedOption && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed border flex items-start gap-2 ${
                      selectedOption.isOptimal
                        ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                        : 'bg-red-950/30 text-red-300 border-red-500/30'
                    }`}>
                      {selectedOption.isOptimal ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <span>{selectedOption.feedback}</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Right Column: Live Executive Dossier */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl sticky top-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Executive Dossier
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {optimalCount} / {activeSections.length} Clauses Approved
                </span>
              </div>

              {/* Dossier Body */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4 text-xs font-sans shadow-inner">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-[10px] text-amber-400 font-mono uppercase">
                    {isCustomDomain ? 'Executive Charter #AZ-900-GOV' : 'Executive Document #AZ-900-MIG'}
                  </span>
                  <h4 className="text-sm font-black text-white">
                    {isCustomDomain ? 'EduBridge Pan-African Governance Charter' : 'Project SoleSpace Cloud Transition Charter'}
                  </h4>
                </div>

                {/* Section Previews */}
                {activeSections.map((sec) => (
                  <div key={sec.id} className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">{sec.title.split('.')[1] || sec.title}:</span>
                    <p className="text-slate-200 italic">
                      {selectedOptions[sec.id]
                        ? sec.options.find(o => o.id === selectedOptions[sec.id])?.label
                        : 'Pending formulation...'}
                    </p>
                  </div>
                ))}

                {/* Financial Comparison Summary Box */}
                <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-red-400" /> {isCustomDomain ? 'Unmanaged Risk' : 'On-Prem Basement (CapEx)'}</span>
                    <span className="text-red-400">
                      {isCustomDomain && proposalData?.dossierSummary?.unmanagedRisk
                        ? proposalData.dossierSummary.unmanagedRisk
                        : 'R 450,000 Upfront / 3-Yr'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                    <span className="flex items-center gap-1.5"><TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> {isCustomDomain ? 'Governed Architecture' : 'Azure Consumption (OpEx)'}</span>
                    <span className="text-emerald-400">
                      {isCustomDomain && proposalData?.dossierSummary?.governedArchitecture
                        ? proposalData.dossierSummary.governedArchitecture
                        : 'R 12,500 / Month (Usage-tied)'}
                    </span>
                  </div>
                </div>

                {/* Readiness Progress Bar */}
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Boardroom Readiness</span>
                    <span className="font-bold text-white">
                      {activeSections.length > 0 ? Math.round((optimalCount / activeSections.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${activeSections.length > 0 ? (optimalCount / activeSections.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onProceed(earnedBonusXp + 150)}
                disabled={!isProposalReady}
                className={`w-full font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg text-sm cursor-pointer ${
                  isProposalReady
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                Submit Proposal to Boardroom (+150 XP) <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Floating Chatbot Window for Zawadi Mutua */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans">
          
          {/* Chat Header */}
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Zawadi Mutua
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-400">Cloud Systems Mentor (Nairobi Hub)</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Concept Hint Chips */}
          <div className="px-3 py-2 bg-slate-950/50 border-b border-slate-800/80 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {isCustomDomain ? (
              <>
                <button
                  onClick={() => handleSendMessage('How does Azure Policy restrict regions?')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  Azure Policy Regions?
                </button>
                <button
                  onClick={() => handleSendMessage('Why use RBAC instead of shared passwords?')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  Entra ID & RBAC?
                </button>
                <button
                  onClick={() => handleSendMessage('How do Resource Locks prevent deletion?')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  Resource Locks?
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSendMessage('Explain CapEx vs OpEx in simple terms')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  CapEx vs OpEx?
                </button>
                <button
                  onClick={() => handleSendMessage('Why PaaS instead of IaaS or SaaS?')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  Why PaaS?
                </button>
                <button
                  onClick={() => handleSendMessage('How do Availability Zones prevent downtime?')}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700 cursor-pointer"
                >
                  Availability Zones?
                </button>
              </>
            )}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Zawadi a question or request a hint..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-2 rounded-lg transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};