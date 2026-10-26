// src/components/ScreenBoardroomDefense.tsx
import React, { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface ScreenBoardroomDefenseProps {
  xp: number;
  onBack: () => void;
  onRestart: () => void;
  onProceedToTransfer: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "During Black Friday sales in Kenya, SoleSpace's web server crashes due to sudden traffic spikes. Which cloud elasticity feature addresses this automatically?",
    options: [
      "Vertical Scaling (Upgrading RAM manually)",
      "Auto-Scaling (Horizontal scaling based on demand rules)",
      "Geo-redundant storage replication",
      "Static IP reservation"
    ],
    correctIndex: 1,
    explanation: "Horizontal Auto-Scaling dynamically adds or removes Virtual Machine instances or container replicas as web traffic fluctuates without manual intervention."
  },
  {
    id: 2,
    question: "SoleSpace wants to ensure that a localized physical outage (e.g., power failure at a single data center in Johannesburg) does not bring down the e-commerce store. What architecture should you deploy?",
    options: [
      "Single Region with Single Availability Zone",
      "Availability Zones within an Azure Region",
      "On-premises server rack redundancy",
      "ExpressRoute direct peering only"
    ],
    correctIndex: 1,
    explanation: "Availability Zones are physically separate data centers within an Azure region, providing high availability against single data center failures."
  },
  {
    id: 3,
    question: "The CFO asks why moving from an on-premises physical data center to Azure changes their financial model. How do you explain CapEx vs. OpEx?",
    options: [
      "CapEx pays monthly subscription fees; OpEx requires heavy upfront hardware purchases.",
      "CapEx requires large upfront capital investment in physical assets, while OpEx is an operational expense based on pay-as-you-go consumption.",
      "There is no difference between CapEx and OpEx in cloud computing.",
      "OpEx requires purchasing server racks and network switches upfront."
    ],
    correctIndex: 1,
    explanation: "Capital Expenditure (CapEx) involves upfront costs on physical infrastructure, whereas Operational Expenditure (OpEx) charges for services on demand without upfront hardware investments."
  },
  {
    id: 4,
    question: "Which Azure service model grants SoleSpace full operating system access and hardware-level control for legacy databases?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Function as a Service (FaaS)"
    ],
    correctIndex: 2,
    explanation: "IaaS (Infrastructure as a Service) gives you maximum control over virtual hardware and operating systems, mimicking traditional servers."
  },
  {
    id: 5,
    question: "Which model describes Azure App Service, where developers upload code without managing underlying virtual machine OS patching or server maintenance?",
    options: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "On-Premises Bare Metal"
    ],
    correctIndex: 1,
    explanation: "PaaS allows developers to focus on writing application code while Azure handles OS management, patching, and hardware provisioning."
  },
  {
    id: 6,
    question: "Which cloud deployment model combines SoleSpace's local on-premises data center infrastructure with Azure cloud resources?",
    options: [
      "Public Cloud",
      "Private Cloud",
      "Hybrid Cloud",
      "Community Cloud"
    ],
    correctIndex: 2,
    explanation: "Hybrid Cloud connects on-premises or private cloud resources with public cloud infrastructure to share data and applications."
  },
  {
    id: 7,
    question: "If SoleSpace uses Microsoft 365 for business email and office productivity without managing any underlying software installation or database, which service model is being used?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Serverless Compute"
    ],
    correctIndex: 0,
    explanation: "SaaS provides a fully hosted, turnkey application managed entirely by the cloud provider, accessed via web interface or client app."
  },
  {
    id: 8,
    question: "To guarantee 99.99% uptime for SoleSpace's mission-critical payment system across multiple regions, what SLA architecture requirement is required?",
    options: [
      "Deploying across multiple Availability Zones in two distinct Azure Paired Regions",
      "Deploying on a single Virtual Machine without backups",
      "Storing all data locally on an encrypted USB drive",
      "Using standard HDD disk storage in a single data center"
    ],
    correctIndex: 0,
    explanation: "Multi-region deployments across paired regions with Availability Zones provide maximum fault tolerance and highest uptime SLA guarantees."
  },
  {
    id: 9,
    question: "The CTO wants to run code only in response to HTTP webhooks without paying for running servers when no requests are active. Which compute model fits best?",
    options: [
      "Azure Virtual Machine Scale Sets",
      "Serverless Compute (Azure Functions)",
      "Dedicated Bare Metal Host",
      "Azure ExpressRoute Gateway"
    ],
    correctIndex: 1,
    explanation: "Serverless (Azure Functions) executes event-triggered code and charges strictly per execution time and memory consumed, scaling to zero when idle."
  },
  {
    id: 10,
    question: "Why does cloud elasticity directly reduce operational costs compared to traditional physical data centers?",
    options: [
      "You over-provision servers for peak capacity 24/7.",
      "Resources automatically scale down during low-traffic periods so you only pay for what you consume.",
      "Hardware never experiences hardware failures in the cloud.",
      "Cloud providers offer free unlimited compute power at night."
    ],
    correctIndex: 1,
    explanation: "Elasticity ensures you only run and pay for resources necessary to meet real-time user demand, avoiding costly idle server over-provisioning."
  }
];

export const ScreenBoardroomDefense: React.FC<ScreenBoardroomDefenseProps> = ({
  xp,
  onBack,
  onProceedToTransfer,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    return Math.round((correct / QUESTIONS.length) * 100);
  };

  const score = calculateScore();
  const isPassed = score >= 70;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < QUESTIONS.length) {
      alert("Please answer all 10 boardroom questions before submitting your defense.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400"/>
          <span>Back to Proposal</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4"/> Boardroom Defense Quiz
          </span>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            XP Total: {xp}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-8 h-8"/>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Executive Boardroom Defense Panel
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Defend your cloud migration architecture to SoleSpace leadership. Score at least <strong className="text-emerald-400">70%</strong> to pass and unlock Domain 2.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {QUESTIONS.map((q, idx) => (
          <div 
            key={q.id}
            className={`bg-slate-900/80 border rounded-2xl p-6 space-y-4 transition ${
              isSubmitted 
                ? selectedAnswers[q.id] === q.correctIndex 
                  ? 'border-emerald-500/60 bg-emerald-500/5' 
                  : 'border-rose-500/60 bg-rose-500/5'
                : selectedAnswers[q.id] !== undefined 
                  ? 'border-emerald-500/40' 
                  : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-bold text-white leading-snug">
                <span className="text-emerald-400 font-mono mr-2">Q{idx + 1}.</span> {q.question}
              </h3>
              {isSubmitted && (
                selectedAnswers[q.id] === q.correctIndex ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0"/>
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0"/>
                )
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[q.id] === optIdx;
                const isCorrect = q.correctIndex === optIdx;

                let optionStyle = "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700";
                
                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                  } else {
                    optionStyle = "bg-slate-950/40 border-slate-900 text-slate-600";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-emerald-500/10 border-emerald-500 text-white font-semibold";
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(q.id, optIdx)}
                    disabled={isSubmitted}
                    className={`p-4 rounded-xl border text-xs text-left transition cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center flex-shrink-0 font-mono text-[10px]">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {isSubmitted && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"/>
                <div>
                  <strong className="text-white">Explanation: </strong> {q.explanation}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Submit or Result Action Bar */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
            >
              Submit Executive Defense Answers <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        ) : (
          <div className={`p-6 md:p-8 rounded-2xl border ${isPassed ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-rose-500/10 border-rose-500/40'} space-y-6 animate-fadeIn`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${isPassed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`}>
                  {isPassed ? 'Board Approval Granted' : 'Defense Resubmission Required'}
                </span>
                <h2 className="text-3xl font-black text-white">
                  Score: <span className={isPassed ? 'text-emerald-400' : 'text-rose-400'}>{score}%</span>
                </h2>
                <p className="text-sm text-slate-300">
                  {isPassed 
                    ? "Congratulations! The executive board has approved your SoleSpace Azure migration blueprint." 
                    : "You scored below the 70% passing threshold. Review the explanations above and attempt the defense again."}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4"/> Retry Quiz
                </button>

                {isPassed && (
                  <button
                    type="button"
                    onClick={onProceedToTransfer}
                    className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
                  >
                    <span>Proceed to Graduation (+250 XP)</span>
                    <ArrowRight className="w-4 h-4"/>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </form>

    </div>
  );
};

export default ScreenBoardroomDefense;