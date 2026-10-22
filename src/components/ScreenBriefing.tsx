// src/components/ScreenBriefing.tsx
import React, { useState } from 'react';
import { ArrowRight, BookOpen, RotateCw } from 'lucide-react';

interface ScreenBriefingProps {
  onProceed: () => void;
  xp: number;
}

export const ScreenBriefing: React.FC<ScreenBriefingProps> = ({ onProceed }) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const conceptCards = [
    {
      id: 'on-prem',
      title: 'Flip: On-Premises',
      concept: 'Physical server hardware owned and maintained locally in a company facility.',
      application: 'SoleSpace basement servers overheating during flash sneaker drops.'
    },
    {
      id: 'cloud',
      title: 'Flip: Cloud Computing',
      concept: 'On-demand delivery of IT resources over the internet with pay-as-you-go pricing.',
      application: 'Renting virtual compute instantly during 15,000 shopper traffic spikes.'
    },
    {
      id: 'capex-opex',
      title: 'Flip: CapEx vs. OpEx',
      concept: 'CapEx is upfront hardware spending; OpEx is ongoing operational consumption.',
      application: 'Avoiding $40,000 server purchases by paying only for active drop compute.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Stage Banner */}
      <div className="space-y-1">
        <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
          STAGE 1: THE BUSINESS WITHOUT A SERVER ROOM
        </div>
      </div>

      {/* Thandi Mokoena's Briefing Memo Card */}
      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/30">
              TM
            </div>
            <div>
              <h2 className="text-sm md:text-base font-bold text-white">
                Thandi Mokoena, <span className="text-slate-400 font-normal">IT Operations Manager</span>
              </h2>
              <p className="text-xs text-slate-400 font-semibold uppercase">
                SUBJECT: BASEMENT SERVER ROOM OUTAGE &amp; FLASH SNEAKER DROPS
              </p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/30">
            Badquers
          </span>
        </div>

        {/* Thandi's Exact Scenario Text */}
        <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-3 font-normal">
          <p>
            &ldquo;Morning Intern, welcome to SoleSpace. I wish we had time for coffee, but we have an emergency. Yesterday was our exclusive Nairobi &amp; Jo&apos;burg sneaker drop. Within 4 minutes, 15,000 concurrent shoppers flooded our custom storefront. Our <span className="text-emerald-400 font-semibold underline">on-premises servers</span> in the office basement overheated, our local power backup tripped, and customers hit 504 Gateway Timeouts. We lost thousands in sales.&rdquo;
          </p>
          <p>
            &ldquo;The founders want to <span className="text-emerald-400 font-semibold underline">budget $40,000</span> to buy 20 more physical servers. I told them that&apos;s financial suicide—those servers will sit idle and burn electricity for 28 days every month until the next drop.&rdquo;
          </p>
          <p className="text-slate-400 font-medium pt-2 text-xs md:text-sm">
            Review these 3 key concepts before you propose a solution.
          </p>
        </div>
      </div>

      {/* Interactive Concept Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          INTERACTIVE CONCEPT STRIP
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conceptCards.map((card) => {
            const isFlipped = flippedCard === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setFlippedCard(isFlipped ? null : card.id)}
                className="bg-slate-900/80 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 rounded-xl p-4 transition-all cursor-pointer min-h-[110px] flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> {card.title}
                  </span>
                  <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                </div>

                {isFlipped ? (
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed animate-fadeIn">
                    <strong className="text-emerald-400">SoleSpace:</strong> {card.application}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {card.concept}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Orange Proceed Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onProceed}
          className="px-8 py-3.5 rounded-xl font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50"
        >
          Proceed to Decision Analysis (+25 XP) <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ScreenBriefing;