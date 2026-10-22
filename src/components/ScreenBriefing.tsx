// src/components/ScreenBriefing.tsx
import React, { useState } from 'react';
import { Briefcase, AlertTriangle, ArrowRight, CheckCircle2, DollarSign, Server, Cloud } from 'lucide-react';

interface ScreenBriefingProps {
  onProceed: () => void;
  xp: number;
}

export const ScreenBriefing: React.FC<ScreenBriefingProps> = ({ onProceed }) => {
  const [selectedReply, setSelectedReply] = useState<number | null>(null);

  const replyOptions = [
    {
      id: 1,
      text: "Understood, Thandi. Buying 20 physical servers is a classic CapEx trap—we'd sink thousands into hardware that sits idle 28 days a month. We need elasticity and an OpEx cloud model like Azure.",
      tag: "Recommended Strategy"
    },
    {
      id: 2,
      text: "Crystal clear. On-premises hardware can't handle spiky flash sales without over-provisioning. Let's scrap the physical server purchase and design an auto-scaling cloud architecture.",
      tag: "Action-Oriented"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" /> Stage 1: Operational Emergency
        </div>
        <h1 className="text-xl md:text-2xl font-black text-white">
          The Business Without a Server Room
        </h1>
        <p className="text-sm text-slate-400">
          Review the IT Operations Manager briefing memo below and select your strategic response.
        </p>
      </div>

      {/* Thandi Mokoena's Briefing Memo */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400">
              TM
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Thandi Mokoena</h2>
              <p className="text-xs text-slate-400">IT Operations Manager • SoleSpace E-Commerce</p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-semibold border border-amber-500/30">
            Mandatory Briefing
          </span>
        </div>

        <blockquote className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1">
          &ldquo;Morning Intern, welcome to SoleSpace. I wish we had time for coffee, but we have an emergency. Yesterday was our exclusive Nairobi &amp; Jo&apos;burg sneaker drop. Within 4 minutes, 15,000 concurrent shoppers flooded our custom storefront. Our on-premises servers in the office basement overheated, our backup power tripped, and customers hit 504 Gateway Timeouts. We lost thousands in sales. The founders want to budget KES 40,000 to buy 20 more physical servers. I told them that&apos;s financial suicide—those servers will sit idle and burn electricity for 28 days every month until the next drop.&rdquo;
        </blockquote>
      </div>

      {/* Interactive Intern Reply Selection */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4" /> Select Your Professional Response to Thandi
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {replyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedReply(option.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                selectedReply === option.id
                  ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5">
                {selectedReply === option.id ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-slate-700" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-amber-400">{option.tag}</span>
                </div>
                <p className="text-xs md:text-sm">{option.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Concept Flip Strip Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <Server className="w-5 h-5 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase">On-Premises Trap</h4>
          <p className="text-xs text-slate-400">100% hardware responsibility, physical cooling overhead, and rigid scaling limits.</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <Cloud className="w-5 h-5 text-emerald-400" />
          <h4 className="text-xs font-bold text-white uppercase">Cloud Elasticity</h4>
          <p className="text-xs text-slate-400">Auto-scaling instances instantly when 15,000 shoppers arrive, minimizing waste.</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <DollarSign className="w-5 h-5 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase">CapEx vs OpEx</h4>
          <p className="text-xs text-slate-400">Swapping heavy upfront iron purchases for a flexible, consumption-based operational budget.</p>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="flex justify-end pt-2">
        <button
          disabled={selectedReply === null}
          onClick={onProceed}
          className={`px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
            selectedReply !== null
              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          Proceed to Decision Analysis (+25 XP) <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ScreenBriefing;